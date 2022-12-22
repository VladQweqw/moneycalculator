import { SourceType } from '../utils/types'
import { useNavigate } from 'react-router'
import { useContext } from 'react';
import { BalanceContext } from '../context';
import { saveToLocal } from '../utils/functions';
import { motion } from 'framer-motion'
import { child, parent } from '../utils/functions';

export default function Sources() {
    const navigate = useNavigate();
    const { sources, setSources } = useContext(BalanceContext)    

    function removeSource(name: string) {
        const newSources = sources.filter((item: SourceType) => item.name !== name);
        
        setSources(newSources)
        saveToLocal('sources', JSON.stringify(newSources))

    }

   return(
    <section className="sources-wrapper section ">
    <header className="section-header">
        <h1 className="section-title">Sources</h1>
    </header>
    

    <motion.div
     variants={parent}
     animate={'animate'}
     initial={'initial'}
    className="sources">
        
        {sources.length ? sources.map((data: SourceType, index: number) => {
            return <Source {...data} removeSource={removeSource}  key={index} />
        }): <NoSource />}

        <button className="add-source primary-btn" onClick={() => {
            navigate('add?type=source')
        }} id='add-source'>Add</button>
    </motion.div>

  </section>
   )
}

function NoSource() {
    
    return <div className="source no-source">
        <h3 className="source-name">Nothing here</h3>
    </div>

}

function Source(data: {
    removeSource: any,
    name: string,
    total: number, 
}) {
    const { name, total, removeSource} = data;
    

    return <motion.div variants={child} className="source">
        <span>
            <p className="source-name">{name}</p>
            <h1 className="source-total">{total.toFixed(2)}RON</h1>
        </span>

        <span className="remove-source" onClick={() => {
            removeSource(name)
        }}>
            <i className="fa-solid fa-x"></i>        
        </span>
    </motion.div>

}