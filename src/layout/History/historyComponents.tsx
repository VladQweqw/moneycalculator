import { historyType } from "../../utils/types";
import { FC } from "react";
import { currencyValues } from "../../utils/functions";
import { motion } from 'framer-motion'
import { formatDate } from "../../utils/functions";

import { child, parent } from "../../utils/functions";

export const HistoryItem: FC<historyType> = ({type, reason, total, date, currency}): JSX.Element => {
    let i = 0;
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
                     if(i >= 3) i = 0;
                     let currency: any = Object.entries(currencyValues)[i];
                    
                    

                     (e.target as HTMLElement).innerText = 
                     `+${Math.floor(total / currency[1])}${currency[0]}`
                     i++;
                    
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