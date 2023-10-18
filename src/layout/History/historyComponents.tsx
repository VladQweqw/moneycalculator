import { historyType } from "../../utils/types";
import {  useState } from "react";
import { motion } from 'framer-motion'
import { currencyConvertor, currencyValues, getDateFromMs } from "../../utils/functions";
import { child, parent } from "../../utils/functions";


export const HistoryItem = (data: historyType): JSX.Element => {
    const {type, reason, total, date} = data;
    const [isOpen, setIsOpen] = useState(false)
    

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
                    <h1 className="item-total">
                    {total}RON</h1>
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
                    acc[dateFormat].total += cur.total
                }else {
                    acc[dateFormat].total -= cur.total
                }
            }else {
                acc[dateFormat] = {
                    date: cur.date,
                    total: cur.type === 'ADD' ? cur.total : -cur.total,
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
