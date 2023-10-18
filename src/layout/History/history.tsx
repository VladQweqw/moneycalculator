import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BalanceContext } from '../../context';
import NoContent from '../Components/noContent';
import { HistoryComponent } from './historyComponents';

export default function History() {
   const { history } = useContext(BalanceContext);   
   
   if(!history) return <NoContent />
   return(
    <section className="history-section section">
         <h1 className="section-title">History</h1>

         <div className="history-wrapper section-container">
            

            <HistoryComponent data = {history} />
         </div>
      </section>
   )
   
}

