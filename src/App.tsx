import SingUpPage from './pages/SingUp'
import { Route ,Router ,Routes } from 'react-router-dom'
import Layout from './Layout.js'
import './App.css'
import Login from './pages/Login.js'
import Dashbord from './components/Dashbord.js'
import Groups from './components/Groups.js'
import HomePage from './pages/HomePage.js'
function App() {

  return (
    <>
     {/* <Header/>
     <SingUpPage/> */}
     <Routes>
      <Route path='/' element={<HomePage/>}/>
       <Route path='/dashboard' element={<Layout/>}>
         <Route path='/dashboard/dashpage' element={<Dashbord/>}/>
         <Route path='/dashboard/addgroups' element={<Groups/>}/>
       </Route>
       <Route path='/login' element={<Login/>}/>  
       <Route path='/signup' element={<SingUpPage/>}/>
     </Routes>
   </>
  )
}

export default App
