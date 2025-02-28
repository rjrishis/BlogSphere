import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Protected({children , authentication = true }) {
    const navigate = useNavigate();
    const [loader , setLoader] = useState();
    const authStatus = useSelector(state =>state.authReducer.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[navigate , authStatus , authentication])

  return loader ? <h1>Loading....</h1> : <>{children}</>
}

