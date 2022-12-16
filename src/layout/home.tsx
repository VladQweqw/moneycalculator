import Header from './header'
import History from './History/history'
import Top from './top'
import { Outlet } from 'react-router'

export default function Home() {

   return(
    <>
        <Outlet />
        <Header />
        <History />
        <Top />

    </>
   )
}