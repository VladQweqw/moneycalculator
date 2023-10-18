import {useRef, useState, useContext} from 'react'
import { motion} from 'framer-motion'
import { BalanceContext } from '../../context'
import { saveToLocal, getFromLocal } from '../../utils/functions'
import { historyType } from '../../utils/types'
import Modal from './modal'

export function Add() {
    const {setHistory} = useContext(BalanceContext);

    const amount = useRef<HTMLInputElement | null>(null);
    const reason = useRef<HTMLInputElement | null>(null);
    const [type, setType] = useState(0);

    function createPayment() {
        if(isNaN(parseInt(amount.current!.value))) return alert('Add a number');
   
        let obj: historyType = {
            type: !type ? 'ADD':'SUBSTRACT',
            reason: reason.current!.value || 'Spaga',
            total: parseFloat(Math.abs(parseFloat(amount.current!.value)).toFixed(2)),
            date: new Date().getTime(),
        }

        const prevData = JSON.parse(getFromLocal('history')) || [];
        prevData ? saveToLocal('history', JSON.stringify([obj, ...prevData])) : saveToLocal('history', JSON.stringify([obj]));

        setHistory([obj, ...prevData]);
    }
    
    return(
            <Modal>
                <motion.div
                    initial={{
                        scale:0,
                    }}
                    animate={{
                        scale:1
                    }}
                    className="add-container">
                        <h3 className="section-title">Add a payment</h3>
                        <br />
        
                        <form className="add-form">
                            <div className="input">
                                <input type="number" ref={amount} required name="amount" placeholder='Amount' className='input' id="amount" />
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
                            }} id='add-payment'>Add + </button>
                        </form>
                    
                </motion.div>
            </Modal>
        )
}

