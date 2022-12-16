import {useContext} from 'react'
import { useNavigate } from 'react-router'
import { BalanceContext } from '../context'
import { motion } from 'framer-motion'
import { currencyValues } from '../utils/functions'
import { phrases } from '../utils/functions'

export default function Header() {
   const navigate = useNavigate()
   const {totalBalance} = useContext(BalanceContext);   
   
   function getPhrase(balance: number) {
      if(balance <= 100) {
         return phrases[0]
      }else if(balance > 100 && balance <= 250) {
         return phrases[1]
      }else if(balance > 250 && balance <= 500) {
         return phrases[2]
      }else if(balance > 500 && balance <= 1000) {
         return phrases[3]
      }else if(balance > 1000) {
         return phrases[4]
      }
   }
   
   let i = 0;
   return(
      <section className="header section">
         <h1 className="section-title">{
               getPhrase(totalBalance) 
         }, Vali</h1>

         <div className="total-wrapper">
            <div className="total">
               <h3 className="total-title">Total balance:</h3>
               <motion.h1 
               initial={{
                  opacity:0,
                  translateX: '-100%'
               }}
               animate={{
                  opacity: 1,
                  translateX: '0%'

               }}
               className="total-money accent" onClick={(e) => {
                  if(i >= 3) i = 0;
                  let currency: any = Object.entries(currencyValues)[i];

                  (e.target as HTMLElement).innerText = 
                  `${Math.floor(totalBalance / currency[1])}${currency[0]}`
                  i++;
               }}>{Math.floor(totalBalance)}RON</motion.h1>
            </div>

            <button className="primary-btn add-payment" onClick={() => {
               navigate('add')
            }}>Add payment</button>
         </div>

      </section>
   )
}
