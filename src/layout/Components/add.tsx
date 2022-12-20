import {useRef, useState, useContext} from 'react'
import { motion} from 'framer-motion'
import { useNavigate } from 'react-router'
import { BalanceContext } from '../../context'
import { saveToLocal, getFromLocal } from '../../utils/functions'
import { historyType, SourceType } from '../../utils/types'
import { useSearchParams } from 'react-router-dom'
import AddSource from './add-source'

export default function Add() {
   const navigate = useNavigate()
   const [searchParams, SetSearchParams] = useSearchParams();
   const {sources} = useContext(BalanceContext)
   const type = searchParams.get('type');
      
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
    {type === 'payment' && sources.length ? <AddPayment/> : <AddSource /> }
       

    </motion.div>
   )
}

function AddPayment() {
    const {setHistory, sources, setSources} = useContext(BalanceContext);

    const amount = useRef<HTMLInputElement | null>(null);
    const reason = useRef<HTMLInputElement | null>(null);
    const currencyRef = useRef<HTMLSelectElement | null>(null)
    const source = useRef<HTMLSelectElement | null>(null)
    const [type, setType] = useState(0);

    function changeSources(data: historyType) {
        const { total, type, source} = data;

        let newSources = sources.map((data: SourceType) => {
            if(data.name === source) {
                return {
                    name: data.name,
                    total: data.total = type === 'ADD' ? data.total + total : data.total - total
                }
            }
            return data
        })
        
        saveToLocal('sources', JSON.stringify(newSources))
        setSources(newSources)
    }

    function createPayment() {
        if(isNaN(parseInt(amount.current!.value))) return alert('add a number');
        
        let obj: historyType = {
            type: !type ? 'ADD':'SUBSTRACT',
            reason: reason.current!.value || 'Spaga',
            total: Math.abs(parseFloat(amount.current!.value)),
            date: new Date().getTime(),
            currency: currencyRef.current!.value,
            source: source.current!.value,  
        }
        

        const prevData = JSON.parse(getFromLocal('history')) || [];
        prevData ? saveToLocal('history', JSON.stringify([ obj, ...prevData])) : saveToLocal('history', JSON.stringify([obj]));
        changeSources(obj)

        setHistory([obj, ...prevData]);
    }


    return(
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
                    <select ref={currencyRef} name="currency" id="currency" className='select'>
                        <option value="RON"  className='currency-item'>RON</option>
                        <option value="EUR"  className='currency-item'>EUR</option>
                        <option value="USD"  className='currency-item'>USD</option>
                    </select>
                </div>

                <div className="input">
                    <input type="text"  ref={reason} name="reason" placeholder='Reason (Optional)' className='input' id="reason" />
                </div>
                {sources.length && 
                    <select ref={source} name="sources" id="sources" className='select'>
                    {sources.map((data: SourceType, index: number) => {
                        return  <option key={index} value={data.name}  className='currency-item'>{data.name}, {data.total}RON</option>
                    })}
                </select>
                }

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
    )

}