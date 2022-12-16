import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BalanceContext } from '../context';
import NoContent from './noContent';
import { motion } from 'framer-motion'

import { currencyValues, formatDate } from '../utils/functions';
import { historyType } from '../utils/types';


const parent = {
    animate: {
        transition: {
            staggerChildren: .1
        }
    }
}
const child = {
    initial: {
        translateY: '100px',
        scale: 0 
    },
    animate: {
        translateY: '0px',
        scale: 1
    }
}

export default function History() {
   const {history, setHistory} = useContext(BalanceContext);

   if(history == false) return <NoContent />
   return(
    <section className="history section">
        <header className="section-header">
            <h1 className="section-title">History</h1>
            <Link to={'/history'}><h1 className="section-title section-optional" id='see-all'>See all</h1></Link>
        </header>

         <motion.div
         variants={parent}
         animate={'animate'}
         initial={'initial'}

         className="history-wrapper">
                {history && history.map((item: historyType, index: number) => {
                    return <HistoryItem
                        key={index}
                        {...item}
                    />
                })}
         </motion.div>

      </section>
   )
   
}


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