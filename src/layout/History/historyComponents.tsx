import { historyType } from "../../utils/types";
import { FC } from "react";
import { motion } from 'framer-motion'
import { currencyConvertor, currencyValues, getDateFromMs } from "../../utils/functions";
import { child, parent } from "../../utils/functions";

export const HistoryItem: FC<historyType> = ({type, reason, total, date, currency}): JSX.Element => {
   let from = 0, to = 1;
    
    return(
        <motion.div
        variants={child}
        className={`history-item-wrapper`}>
            <p className="item-date">
                {getDateFromMs(date).hours}:{getDateFromMs(date).minutes}
            </p>
            <div 
            className={`history-item ${type ==='ADD' ? 'item-add': 'item-substract'}`}>
                <h1 className="item-reason">{reason}</h1>
                <h1 className="item-total" onClick={(e) => {
                    const elem = (e.target as HTMLElement);
                    const values = Object.keys(currencyValues);

                    if(from == values.length - 1) to = 0
                    if(from >= values.length) from = 0                    
    
                     elem.innerText = `+${
                        currencyConvertor(
                           parseFloat(elem.innerText.slice(1, -3)), values[from], values[to])
                     }${values[to]}`

                     from++; to++;                    
                }}>
                {type === 'ADD' ? '+': '-'}
                {total}{currency}</h1>
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
                acc[dateFormat].total += cur.total
            }else {
                acc[dateFormat] = {
                    date: cur.date,
                    total: 0,
                    logs: []
                };
            }
                           
            return acc;
    },{})

    const datesArr = dates && Object.entries(dates);
    

    return(
        <div
        className="history">
            {
                datesArr?.map((item: any, index: number) => {      
                                  
                    return(
                       <div className="history-section" key={index}>
                        <header className="history-header">
                            <h3 className="history-section-title">
                                {item[0]}
                            </h3>
                            <h3 className="history-section-total">
                                {item[1].total}RON
                            </h3>
                        </header>
                            <motion.div 
                                variants={parent}
                                animate={'animate'}
                                initial={'initial'}
                            className="history-items">
                                {item[1].logs.map((item: historyType, index: number) => {
                                    return <HistoryItem key={index} {...item} />
                                })}
                            </motion.div>
                        </div>
                    );
                })
            }
        </div>
    )

}
