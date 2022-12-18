import Header from './header'
import HistoryComponent from './History/history'
import Top from './top'
import { Outlet } from 'react-router'
import { useContext } from 'react'
import { BalanceContext } from '../context'
export default function Home() {
    const { history } = useContext(BalanceContext)
   return(
    <>
        <Outlet />
        <Header />
        <HistoryComponent {...history} />
        <Top />

    </>
   )
}