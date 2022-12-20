import NoContent from '../Components/noContent'
import { useContext } from 'react'
import { BalanceContext } from '../../context'
import { HistoryComponent } from './historyComponents';
import { getFromLocal } from '../../utils/functions';

export default function CompleteHistory() {
   const {history, getData} = useContext(BalanceContext);
   
   if(history == null) return <NoContent />

   return(
    <section className="complete-history-wrapper section ">
        <header className="section-header">
            <h1 className="section-title">Complete History</h1>
        </header>

         <HistoryComponent data={history} />
         
         <button className='primary-btn clear-data' onClick={() => {
            localStorage.removeItem('balance')
            localStorage.removeItem('history')
            localStorage.removeItem('tops')
            
            getData()
         }} id='clear-data'>Clear all data</button>
   

      </section>
   )
}