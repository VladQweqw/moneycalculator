
import NoContent from './noContent'
import { useContext } from 'react'
import { BalanceContext } from '../context'
import { HistoryItem } from './history'
import { historyType } from '../utils/types'

export default function CompleteHistory() {
   const {history, getData} = useContext(BalanceContext);
   
   if(history == null) return <NoContent />

   return(
    <section className="complete-history-wrapper section ">
        <header className="section-header">
            <h1 className="section-title">Complete History</h1>
        </header>

         <div className="history-wrapper complete-history">
                {history && history.map((item: historyType, index: number) => {
                    return <HistoryItem
                        {...item}
                        key={index}
                    />
                })}
         </div>
         
         <button className='primary-btn clear-data' onClick={() => {
            localStorage.removeItem('balance')
            localStorage.removeItem('history')
            localStorage.removeItem('tops')
            
            getData()

         }} id='clear-data'>clear all data</button>

      </section>
   )
}