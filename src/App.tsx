import { useState, useEffect } from 'react'
import {Route, Routes} from 'react-router'

import Home from './layout/home'
import Add from './layout/add'
import CompleteHistory from './layout/completeHistory'
import { BalanceContext } from './context'
import { BrowserRouter } from 'react-router-dom'
import NoContent from './layout/noContent'
import { historyType } from './utils/types'
import { getFromLocal } from './utils/functions'

export default function App() {
   const [totalBalance, setTotalBalance] = useState<number>(0)
   const [history, setHistory] = useState<historyType | []>([])
   const [tops, setTops] = useState<historyType | []>([])

   useEffect(() => {
      getData()
   }, [])
   
   function getData() {
      setHistory(JSON.parse(getFromLocal('history')) || []);
      setTotalBalance(JSON.parse(getFromLocal('balance')) || 0);
      setTops(JSON.parse(getFromLocal('tops')) || []);
   }

   return(
    <BalanceContext.Provider value={{
      totalBalance,
      setTotalBalance,
      history,
      setHistory,
      tops,
      setTops,
      getData
    }}>
      <BrowserRouter>
         <Routes>
               <Route path='/' element={<Home />}>
                  <Route path='add' element={<Add />}></Route>

               </Route>
               
               <Route path='/history' element={<CompleteHistory />}></Route>
               <Route path='/tops'></Route>         
            <Route path='*' element={<NoContent />}></Route>
         </Routes>
      </BrowserRouter>
    </BalanceContext.Provider>
   )
}