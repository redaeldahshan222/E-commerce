import React from 'react'
import { Navigate } from 'react-router-dom'

export default function LoginProtection({children}) {
    if(localStorage.getItem("token")!=null){
        return <Navigate to="/home"/>
    }
return <>
{children}
</>
}

