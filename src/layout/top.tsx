import React,{} from 'react'
import { useContext } from 'react'
import { BalanceContext } from '../context'
import NoContent from './noContent';

export default function Top() {
    const {tops} = useContext(BalanceContext);

   if(tops == false) return <NoContent />

   return(
    <section className="top section">
        <header className="section-header">
            <h1 className="section-title">Tops</h1>
        </header>

         {tops && tops.map((data: any) => {
            return <TopItem />
         })}


      </section>
   )
}

function TopItem() {


    return(
        <div className="top-wrapper">
            <div className="top-item-wrapper">
                <header className="section-header">
                    <h1 className="section-title">Most spend on:</h1>
                </header>

                <div className="top-item">
                    <h1 className='item-main'>Betano</h1>
                    <p className="item-main-total">143RON</p>
                </div>
            </div>
            
         </div>
    )
}