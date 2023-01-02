import Header from './header'
import HistoryComponent from './History/history'

import Tops from './Tops/tops'
import { Outlet } from 'react-router'
import { useContext } from 'react'
import { BalanceContext } from '../context'
import Sources from './sources'
export default function Home() {
   const { history } = useContext(BalanceContext)

   return(
       <>
        <Outlet />
        <Header />
        <HistoryComponent {...history} />
        <Sources />
        <Tops />
        </>
   )
}