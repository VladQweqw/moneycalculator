import {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import { BalanceContext } from '../context'
import { motion, AnimatePresence } from 'framer-motion'
import { currencyValues, currencyConvertor } from '../utils/functions'
import { SourceType } from '../utils/types'

const container = {
   hidden: {
   },
   visible: {
     transition: {
       staggerChildren: .15
     }
   },
  
 };

 const item = {
   hidden: {
     translateY: "200%",
     transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 }
   },
   visible: {
     translateY: 0,
     transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 }
   }
 };
 let from = 0, to = 1;

export default function Header() {
   const navigate = useNavigate()
   const { sources } = useContext(BalanceContext);   
   const [balanceText, setBalanceText] = useState<any>([])
   const [state, setState] = useState('hidden')
   const [balance, setBalance] = useState<number>(0);
   const [currency, setCurrency] = useState<any>(['R','O','N'])
   
   
   useEffect(() => {
      setBalance(
         sources.reduce((acc: number, curr:SourceType) => acc + curr.total, 0)
         )
      }, [sources])
      
      
   useEffect(() => {
      setBalanceText([...balance.toFixed(2).split(''), ...currency])
      setState('visible')
   }, [balance])
      
            
   return(
      <section className="header section">
         <svg id='header-svg' viewBox="0 0 250 89" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M24.5 68.123C10.5 58.5681 2.33333 64.1418 0 68.123V0H391V73.8736C388.333 74.7583 380.9 74.8468 372.5 68.123C362 59.7182 356 68.123 342 73.8736C328 79.6243 325 73.8736 305.5 62.3724C286 50.8711 290 68.123 281.5 73.8736C273 79.6243 270.5 76.9701 246 59.7182C221.5 42.4663 216.5 76.5278 193 86.2596C169.5 95.9915 172 77.8549 152 62.3724C136 49.9864 124.667 61.0453 121 68.123C116.667 74.9058 104.4 85.5519 90 73.8736C72 59.2759 59 63.2571 55.5 68.123C52 72.9889 42 80.0666 24.5 68.123Z" fill="url(#paint0_linear_45_13)"/>
         <defs>
         <linearGradient id="paint0_linear_45_13" x1="-54" y1="-8.40473" x2="473.506" y2="91.4368" gradientUnits="userSpaceOnUse">
         <stop stopColor="#5735E1"/>
         <stop offset="1" stopColor="#3CBBE3" stopOpacity="0.65"/>
         </linearGradient>
         </defs>
         </svg> 


         <div className="total">
               <h3 className="total-title">Total balance:</h3>

               {state === 'visible' && <motion.h1 
               variants={container}
               initial='hidden'
               animate={state}
               exit='exit'
               className="total-money " onClick={(e) => {
                  const values = Object.keys(currencyValues);
                  setState('hidden')

                  if(from == values.length - 1) to = 0
                  if(from >= values.length) from = 0

                  let balanceConverted = currencyConvertor(
                     parseFloat(balance.toString()), values[from], values[to])
                  setBalance(parseFloat(balanceConverted))
                  setCurrency(values[to].split(''))

                  from++; to++
               }}>
                  {balanceText.map((letter: string, index: number) => {
                  return <span key={index} className='letter-wrapper'>
                     <motion.span 
                     variants={item}
                     className="balance-number" key={index}>{letter}</motion.span>
                     </span>

               })}</motion.h1>     }                    

            </div>

         <div>
            <button className="primary-btn add-payment" onClick={() => {
               navigate('add?type=payment')
            }}>Add payment</button>
         </div>
      </section>
   )
}
