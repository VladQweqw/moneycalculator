import { useRef } from 'react'
import { motion } from 'framer-motion'
import { saveToLocal, getFromLocal } from '../../utils/functions'
import { SourceType } from '../../utils/types'
import { useContext } from 'react'
import { BalanceContext } from '../../context'

export default function AddSource() {
    const total = useRef<HTMLInputElement | null>(null)
    const name = useRef<HTMLInputElement | null>(null)
    const { setSources,sources } = useContext(BalanceContext);

    function addSource() {

        if(name.current!.value === '') return alert('add a name')
        if(sources.find((item: SourceType) => {
            return item.name.toLocaleLowerCase() === name.current!.value.toLowerCase()
        })) {
            return alert('already exists')
        };

        

        const obj: SourceType = {
            name: name.current!.value,
            total: parseFloat(total.current!.value),
        }
        
        const prevData = JSON.parse(getFromLocal('sources')) || [];
        
        if(prevData) {
            saveToLocal('sources', JSON.stringify([obj, ...prevData]))
            setSources([obj, ...prevData])
        }else {
            saveToLocal('sources', JSON.stringify([obj]))
            setSources([obj])

        }
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
        <h3 className="section-title">Add a source</h3>

        <form action="" className="source-form add-form">

            <div className="input">
                <input type="text" required  ref={name} name="name" placeholder='Name' className='input' id="source-name" />
            </div>

            <div className="input">
                <input type="number" ref={total} required name="total" placeholder='Ammount' className='input source-total' id="source-total" />
            </div>

            <button type='submit' className="submit add-payment" onClick={(e) => {
                e.preventDefault();
                addSource();
            }} id='add-payment'>Add</button>
        </form>
       
    </motion.div>
   )
}