import './App.css'
import Home from "./views/home/Home.jsx"
import Detail from './views/detail/Detail'
import Create from './views/create/Create.jsx'
import { Route, Routes, useLocation} from 'react-router-dom'
import Landing from './views/landing page/Landing'
import Login from './views/login/Login'
import Head from './components/header/header'
import Footer from './components/footer/Footer'

function App() {
  let location = useLocation();

  return (
    <>
      <div>
        <Head />
        <Routes>
          <Route exact path = "/" Component = {Landing} />
          <Route path = "/home" Component = {Home} />
          <Route path = "/home/:id" Component = {Detail} />
          <Route path = "/login" Component = {Login} />
          <Route path = "/create" Component = {Create} />
        </Routes>
        {location.pathname!=='/home'?<Footer/>:null}
      </div>
    </>
  )
}

export default App
