import { useRef, useState, useEffect } from 'react';
import Modal from './modal';
import { motion } from 'framer-motion'
import { SourceType, historyType } from '../../utils/types';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { BalanceContext } from '../../context';
import { currencyConvertor, currencyValues } from '../../utils/functions';
import { saveToLocal, getFromLocal } from '../../utils/functions';

export default function Edit() {    
    const amount = useRef<HTMLInputElement | null>(null);
    const reason = useRef<HTMLInputElement | null>(null);
    const currencyRef = useRef<HTMLSelectElement | null>(null)
    const source = useRef<HTMLSelectElement | null>(null)
    const [type, setType] = useState(0);
    
    const [searchParams,] = useSearchParams();
    const id = searchParams.get('id');
    
    const [currentItem, setCurrentItem] = useState<historyType | null>(null)
    const { history, setHistory, sources, setSources } = useContext(BalanceContext)
    

    useEffect(() => {
        const item = history.find((item: historyType) => item.date === parseInt(id!));
        setType(item?.type === 'ADD' ? 0 : 1)
        setCurrentItem(item);

    }, [])
    
    function changeSources(data: historyType) {
        const { total, type, source, currency} = data;

        let newSources = sources.map((data: SourceType) => {
            if(data.name === source) {
                let value = Math.abs(data.total - 2 * parseFloat(currencyConvertor(total, currency, 'RON')));
                
                if(type === 'ADD') {
                    value = Math.abs(data.total + 2 * parseFloat(currencyConvertor(total, currency, 'RON')))
                }
                
                return {
                    name: data.name,
                    total: value
                }
            }
            return data
        })
        
        saveToLocal('sources', JSON.stringify(newSources))
        setSources(newSources)
    }

    function editPayment() {

        let obj: historyType = {
            type: !type ? 'ADD':'SUBSTRACT',
            reason: reason.current!.value || 'Spaga',
            total: parseFloat(Math.abs(parseFloat(amount.current!.value)).toFixed(2)),
            date: new Date().getTime(),
            currency: currencyRef.current!.value,
            source: source.current!.value,  
        }

        let formatedHistory = history.filter((item: historyType) => {
            if(item.date !== currentItem?.date) return item;
        })

        changeSources(obj)

        setHistory([obj, ...formatedHistory])
        saveToLocal('history', JSON.stringify([obj, ...formatedHistory]));
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
            className="add-container edit-container">
                <h3 className="section-title">Edit a payment</h3>

                <form action="" className="add-form">
                    <div className="input">
                        <input defaultValue={currentItem?.total} type="number" ref={amount} required name="amount" placeholder='Amount' className='input' id="amount" />
                        <select ref={currencyRef} defaultValue={currentItem?.currency}name="currency" id="currency" className='select'>
                            {currentItem?.currency && Object.keys(currencyValues).map((currency: string, index: number) => {
                                return <option value={currency} key={index} className='currency-item'>{currency}</option>
                            })}
                          
                        </select>
                    </div>

                    <div className="input">
                        <input type="text" defaultValue={currentItem?.reason} ref={reason} name="reason" placeholder='Reason (Optional)' className='input' id="reason" />
                    </div>
                    {sources.length && 
                        <select ref={source} name="sources" id="sources" className='select'>
                        {sources.map((data: SourceType, index: number) => {
                            if(data.name === currentItem?.source) {
                                return  <option key={index} selected value={data.name}  className='currency-item'>{data.name}, {data.total}RON</option>
                            }else {
                                return  <option key={index} value={data.name}  className='currency-item'>{data.name}, {data.total}RON</option>
                            }
                            
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
                        editPayment();
                    }} id='add-payment'>Add</button>
                </form>
            
            </motion.div>
    </Modal>
   )
}