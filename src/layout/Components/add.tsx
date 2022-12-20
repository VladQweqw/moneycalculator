import {useRef, useState, useContext} from 'react'
import { motion} from 'framer-motion'
import { useNavigate } from 'react-router'
import { BalanceContext } from '../../context'
import { saveToLocal, getFromLocal, calculateTotalBalance } from '../../utils/functions'
import { historyType, historyCollection } from '../../utils/types'

export default function Add() {
   const navigate = useNavigate()
   const [type, setType] = useState(0);
   
   const amount = useRef<HTMLInputElement | null>(null);
   const reason = useRef<HTMLInputElement | null>(null);
   const currencyRef = useRef<HTMLSelectElement | null>(null)
   const source = useRef<HTMLSelectElement | null>(null)
    
   const {setHistory, setTotalBalance} = useContext(BalanceContext);

    function createPayment() {
        if(isNaN(parseInt( amount.current!.value))) return alert('add a number');
        
        
        let obj: historyType = {
            type: !type ? 'ADD':'SUBSTRACT',
            reason: reason.current!.value || 'Spaga',
            total: Math.abs(parseInt(amount.current!.value)),
            date: new Date().getTime(),
            currency: currencyRef.current!.value,
            // source: source.current!.value,  
        }
        

        let prevData = JSON.parse(getFromLocal('history')) || [];
        prevData ? saveToLocal('history', JSON.stringify([ obj, ...prevData])) : saveToLocal('history', JSON.stringify([obj]));
        
        setHistory([obj, ...prevData]);

        setTotalBalance(calculateTotalBalance(obj))
    }

   return(
    <motion.div 
    initial={{
        opacity:0
    }}
    animate={{
        opacity:1
    }}
    className="add-wrapper"   onClick={(e) => {
        if((e.target as HTMLElement).classList.contains('add-wrapper')) {
            navigate(-1)
        }        
    }}>

        <motion.div
        initial={{
            scale:0,
        }}
        animate={{
            scale:1
        }}
        className="add-container">
            <h3 className="section-title">Add a payment</h3>

            <form action="" className="add-form">
                <div className="input">
                    <input type="number" ref={amount} required name="amount" placeholder='Amount' className='input' id="amount" />
                    <select ref={currencyRef} name="currency" id="currency">
                        <option value="RON"  className='currency-item'>RON</option>
                        <option value="EUR"  className='currency-item'>EUR</option>
                        <option value="USD"  className='currency-item'>USD</option>
                    </select>
                </div>

                <div className="input">
                    <input type="text"  ref={reason} name="reason" placeholder='Reason (Optional)' className='input' id="reason" />
                   
                </div>

                <div className="input input-differ">
                    <button className={`${type === 0 ? "add differ differ-active": "add differ"}`} onClick={(e) => {
                        e.preventDefault()
                        setType(0)
                    }}>Add +</button>
                    <button className={`${type === 1 ? "substract differ differ-active": "substract differ"}`} onClick={(e) => {
                        e.preventDefault()
                        setType(1)
                    }}>Substract -</button>
                </div>
                
                <button className="submit add-payment" onClick={(e) => {
                    e.preventDefault();
                    createPayment();
                }} id='add-payment'>Add</button>
            </form>
           
        </motion.div>

    </motion.div>
   )
}