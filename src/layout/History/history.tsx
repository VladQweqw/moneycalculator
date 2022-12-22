import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BalanceContext } from '../../context';
import NoContent from '../Components/noContent';
import { HistoryComponent } from './historyComponents';

export default function History() {
   const { history } = useContext(BalanceContext);   
   
   if(history == false) return <NoContent />
   return(
    <section className="history-section section">
        <header className="section-header">
            <h1 className="section-title">History</h1>
            <Link to={'/history'}><h1 className="section-title section-optional" id='see-all'>See all</h1></Link>
        </header>

         <HistoryComponent data = {history} />
      </section>
   )
   
}

