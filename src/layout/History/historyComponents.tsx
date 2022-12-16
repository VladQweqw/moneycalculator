import { historyType } from "../../utils/types";
import { FC } from "react";
import { motion } from 'framer-motion'
import { formatDate } from "../../utils/functions";
import { currencyConvertor, currencyValues } from "../../utils/functions";
import { child, parent } from "../../utils/functions";

export const HistoryItem: FC<historyType> = ({type, reason, total, date, currency}): JSX.Element => {
   let from = 0, to = 1;
    
    return(
        <motion.div
        variants={child}
        className={`history-item-wrapper`}>
            <p className="item-date">
                {formatDate(date)}
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
                           parseFloat(elem.innerText.slice(0, -3)), values[from], values[to])
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
    
    return(
        <motion.div
        variants={parent}
        animate={'animate'}
        initial={'initial'}

        className="history-wrapper">
               {data.history && data.history.map((item: historyType, index: number) => {
                   return <HistoryItem
                       key={index}
                       {...item}
                   />
               })}
        </motion.div>
    )

}