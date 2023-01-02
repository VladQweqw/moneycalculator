import { useContext } from 'react'
import { BalanceContext } from '../../context'
import { historyType } from '../../utils/types';
import { getDateFromMs } from '../../utils/functions';

export default function Tops() {
    

   return(
    <section className="tops-section section">
         <h1 className="section-title">Tops</h1>
        
         <div className="top-wrapper section-container">
            <TopExpense  />
            <TopSource />

         </div>
      </section>
   )
}

function TopExpense() {
    let maxSpent = 0, date = 0;
    const { history } = useContext(BalanceContext);

    if(history.length) {
        history.forEach((item: historyType) => {
            if(item.total > maxSpent && item.type === 'ADD'){
                maxSpent = item.total;
                date = item.date
            };
        })
    }

    if(history.length === 0) return(
        <div className="top-item top-expense">
            <h1>No data</h1>
        </div>
    )

    return(
        <div className="top-item top-expense">
            <div>
                <p className="secondary-text">You've most <br /> spend</p>
                <h1 className="primary-text">{maxSpent}RON</h1>
            </div>
            <br />
            <div>
                <p className="secondary-text">on</p>
                <h1 className="primary-text">{getDateFromMs(date).stringDate()}</h1>
            </div>

        </div>
    )

}

function TopSource() {
    let topSource = '', max = 0;
    const occurences: any = {};
    const { history } = useContext(BalanceContext);

    if(history.length) {
        history.forEach((item: historyType) => {
            occurences[item.source] = occurences[item.source] ? occurences[item.source] + 1 : 1;
        })
    }

    Object.entries(occurences).forEach((item: any) => {
        if(item[1] > max) {
            max = item[1];
            topSource = item[0];
        }
        
    })
    
    if(history.length === 0) return(
        <div className="top-item top-source">
            <h1>No data</h1>
        </div>
    )
    return(
        <div className="top-item top-source">
            <div>
                <p className="secondary-text">Favorite source</p>
                <h1 className="primary-text">{topSource}</h1>
            </div>
        </div>
    )

}