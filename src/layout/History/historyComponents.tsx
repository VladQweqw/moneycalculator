import { SourceType, historyType } from "../../utils/types";
import {  useState } from "react";
import { motion } from 'framer-motion'
import { currencyConvertor, currencyValues, getDateFromMs, saveToLocal } from "../../utils/functions";
import { child, parent } from "../../utils/functions";
import { useContext } from "react";
import { BalanceContext } from "../../context";
import { useNavigate } from "react-router";


export const HistoryItem = (data: {
    type: 'ADD' | 'SUBSTRACT',
    reason: string,
    total: number,
    date: number,
    currency: string,
    source: string
}): JSX.Element => {
    const {type, reason, total, date, source, currency} = data;
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    const { sources, history, setHistory, setSources } = useContext(BalanceContext)
    
    let from = Object.keys(currencyValues).findIndex((item) => item === currency);
    let to = from + 1;

    function removePayment() {

        let changed = sources.map((item: SourceType) => {
            if(item.name === source) {
                let convertedValue =  parseFloat(currencyConvertor(total, currency, 'RON'))
                console.log(convertedValue, total);
                
                return {
                    name: item.name,
                    total: type === 'ADD' ? Math.abs(item.total - convertedValue) : Math.abs(item.total + convertedValue)
                }
            }else {
                return item
            }
        })
        
        const newPayments = history.filter((item: historyType) => {
            return item.date !== date
        })

        saveToLocal('history', JSON.stringify(newPayments))
        saveToLocal('sources', JSON.stringify(changed))
        setHistory(newPayments)
        setSources(changed)
    }

    return(
        <motion.div
        variants={child}
        className={`history-item-wrapper`}>
            <p className="item-date">
                {getDateFromMs(date).hours}:{getDateFromMs(date).minutes}
            </p>
            <div 
            onMouseDown={(e) => {                
                if(
                        (e.target as HTMLElement).classList.contains('history-item') || 
                        (e.target as HTMLElement).classList.contains('item-reason')
                    ) {
                    setIsOpen(!isOpen)  
                }
            }}
            className={`history-item ${type ==='ADD' ? 'item-add': 'item-substract'}`}>
                <h1 className="item-reason">{reason}</h1>
                <div className="currency-wrapper">
                    <h1 className="item-total" onClick={(e) => {
                        const values = Object.keys(currencyValues);
                        const elem = (e.target as HTMLElement);
                        
                        if(from == values.length - 1) to = 0
                        if(from >= values.length) from = 0
                        
                        elem.innerText = `${type === 'ADD' ? '+': '-'}${
                            currencyConvertor(
                                Math.abs(parseFloat(elem.innerText.slice(0, -3))), values[from], values[to])
                            }${values[to]}`
                            
                        from++; to++;                 
                    }}>
                    {type === 'ADD' ? '+': '-'}
                    {total}{currency}</h1>
                    <p className="source-name">{source || 'none'}</p>
                </div>
             
                <div className={`${isOpen ? 'history-item-context history-item-context-active': 'history-item-context'}`}>
                    <span className="remove-icon context-menu-item" onClick={() => 
                        removePayment()
                    }>
                        <i className="fas fa-x"></i>
                    </span>
                    <span className="edit-icon context-menu-item" onClick={() => {
                        navigate(`edit?id=${date}`)
                    }}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </span>
                </div>
            </div>

           
        </motion.div>
    )

}

export const HistoryComponent = (data: any) => {        
    
    const dates = data.data?.reduce(
        (acc: any, cur: historyType) => {            
            let dateFormat = getDateFromMs(cur.date).stringDate();
                        
            if(acc[dateFormat]?.date) {                
                acc[dateFormat].logs = [...acc[dateFormat].logs, cur] 
                if(cur.type === 'ADD') {
                    acc[dateFormat].total += cur.total * currencyValues[cur.currency]
                }else {
                    acc[dateFormat].total -= cur.total * currencyValues[cur.currency]
                }
            }else {
                acc[dateFormat] = {
                    date: cur.date,
                    total: cur.type === 'ADD' ? cur.total * currencyValues[cur.currency] : -cur.total * currencyValues[cur.currency],
                    logs: [cur]
                };
            }
                           
            return acc;
    },{})

    const datesArr = dates && Object.entries(dates);

    return(
        <div
        className="history ">
            {
                datesArr?.map((item: any, index: number) => {      
                                  
                    return(
                       <div className="history-section" key={index}>
                        <header className="history-header">
                            <h3 className="history-section-title">
                                {item[0]}
                            </h3>
                            <h3 className="history-section-total">
                                {item[1].total.toFixed(2)}RON
                            </h3>
                        </header>
                            <motion.div 
                                variants={parent}
                                animate={'animate'}
                                initial={'initial'}
                            className="history-items">
                                {item[1].logs.map((item: historyType, index: number) => {
                                    return <HistoryItem key={index}  {...item} />
                                })}
                            </motion.div>
                        </div>
                    );
                })
            }
        </div>
    )

}
