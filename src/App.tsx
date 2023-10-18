import { useState, useEffect } from 'react'
import {Route, Routes} from 'react-router'

import Home from './layout/home'
import NoContent from './layout/Components/noContent'
import { Add } from './layout/Components/add'
import { BalanceContext } from './context'
import { BrowserRouter } from 'react-router-dom'
import { historyType } from './utils/types'
import { getFromLocal } from './utils/functions'

export default function App() {
   const [history, setHistory] = useState<historyType | []>([])

   useEffect(() => {
      getData()
   }, [])
   
   function getData() {
      setHistory(JSON.parse(getFromLocal('history')) || []);
   }

   return(
    <BalanceContext.Provider value={{
      history,
      setHistory,
      getData,
    }}>
      <BrowserRouter>
         <Routes>
               <Route path='/' element={<Home />}>
                  <Route path='add' element={<Add />}></Route>
               </Route>
               
               <Route path='/tops'></Route>         
            <Route path='*' element={<NoContent />}></Route>
         </Routes>
      </BrowserRouter>
    </BalanceContext.Provider>
   )
}