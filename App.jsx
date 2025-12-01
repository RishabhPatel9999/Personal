import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import About from "./pages/about"
import AddUser from "./pages/addUser"
import ViewUser from "./pages/viewUsers"
import Login from "./pages/login"
import Dashboard from './pages/dashboard'
import DynamicRoute from './pages/dynamicRouteDemo'
import HookDemo1 from './pages/hooksDemo1'
import HookDemo2 from './pages/hooksDemo2'
import EditUser from './pages/editUser'
import DemoApp from './pages/demoApp'
import ProtectedRoutes from './context/protectedRoutes'


function App() {
  const [count, setCount] = useState(0)
  return (
    <>    
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/dash" element={ 
        <ProtectedRoutes userRole="admin">
              <Dashboard /> 
        </ProtectedRoutes> }>
            <Route path='home' element={ <Home /> } />
            <Route path='about' element={ <About /> } />
            <Route path='add' element={ <AddUser /> } />
            <Route path='view' element={ <ViewUser /> } />
            <Route path='hook1' element={ <HookDemo1 /> } />
            <Route path='hook2' element={ <HookDemo2 /> } />
            <Route path='edit/:uid' element={ <EditUser /> } />
            <Route path='hook3' element={ <DemoApp /> } />
      </Route>
      <Route path="/dynamic/:nm" element={<DynamicRoute />} />

    </Routes>


      

    </>
  )
}

export default App
