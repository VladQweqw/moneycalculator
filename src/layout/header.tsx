import {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import { BalanceContext } from '../context'
import { motion } from 'framer-motion'
import { currencyValues, currencyConvertor } from '../utils/functions'
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
   
   let from = 0, to = 1;
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
                  const values = Object.keys(currencyValues);
                  const elem = (e.target as HTMLElement);
                  
                  if(from == values.length - 1) to = 0
                  if(from >= values.length) from = 0
                  
                  elem.innerText = `${
                     currencyConvertor(
                        parseFloat(elem.innerText.slice(0, -3)), values[from], values[to])
                  }${values[to]}`

                  from++; to++;
               }}>{
                  totalBalance
               }RON</motion.h1>
            </div>

            <button className="primary-btn add-payment" onClick={() => {
               navigate('add')
            }}>Add payment</button>
         </div>

      </section>
   )
}
