import { useState, useEffect } from 'react'
import {Route, Routes} from 'react-router'

import Home from './layout/home'
import { Add } from './layout/Components/add'
import CompleteHistory from './layout/History/completeHistory'
import { BalanceContext } from './context'
import { BrowserRouter } from 'react-router-dom'
import NoContent from './layout/Components/noContent'
import { SourceType, historyType } from './utils/types'
import { getFromLocal } from './utils/functions'
import Edit from './layout/Components/edit'

export default function App() {
   const [history, setHistory] = useState<historyType | []>([])
   const [tops, setTops] = useState<historyType | []>([])
   const [sources, setSources] = useState<SourceType[] | []>([])

   useEffect(() => {
      getData()
   }, [])
   
   function getData() {
      setHistory(JSON.parse(getFromLocal('history')) || []);
      setTops(JSON.parse(getFromLocal('tops')) || []);
      setSources(JSON.parse(getFromLocal('sources')) || [])
   }

   return(
    <BalanceContext.Provider value={{
      history,
      setHistory,
      tops,
      setTops,
      getData,
      setSources,
      sources,
    }}>
      <BrowserRouter>
         <Routes>
               <Route path='/' element={<Home />}>
                  <Route path='add' element={<Add />}></Route>
                  <Route path='edit' element={<Edit />}></Route>
               </Route>
               
               <Route path='/history' element={<CompleteHistory />}></Route>
               <Route path='/tops'></Route>         
            <Route path='*' element={<NoContent />}></Route>
         </Routes>
      </BrowserRouter>
    </BalanceContext.Provider>
   )
}