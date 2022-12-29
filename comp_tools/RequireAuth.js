import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './auth'

export const RequireAuth = ({children}) => {
    const auth = useAuth()
    const location = useLocation()
    if(auth.x == "null"){ //kullanıcı auth değilse her sürekli login page e gider nereye tıklarsan tıkla
        return <Navigate to='/LoginPage' state={{path: location.pathname}} />
    }


  return children
}
