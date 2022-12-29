import React from 'react'
import { BrowserRouter as Router,  Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import BirimiminAraclari from '../Pages/BirimiminAraclari'
import Log from '../Pages/Log'
import NotFound from '../Pages/NotFound'
import LoginPage from '../Pages/LoginPage'
import { AuthProvider } from '../comp_tools/auth'
import { RequireAuth } from '../comp_tools/RequireAuth'
import Details from '../Pages/Details'
import Profil from '../Pages/Profile'



const AppRouter = () => {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
              <Route path="/loginpage" element={<LoginPage/>}/>
              <Route exact path="/" element={<RequireAuth><HomePage/></RequireAuth>}/>
              <Route path="/birimiminaraclari" element={<RequireAuth><BirimiminAraclari/></RequireAuth>}/>
              <Route exact path="/log" element={<RequireAuth><Log/></RequireAuth>}/>
              <Route path="*" element={<RequireAuth><NotFound/></RequireAuth>}/>
              <Route path="/details/:id" element={<RequireAuth><Details/></RequireAuth>}/>
              <Route path="/profil" element={<RequireAuth><Profil/></RequireAuth>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default AppRouter
