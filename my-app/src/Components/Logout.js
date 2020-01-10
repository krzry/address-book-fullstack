import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'




export default function Logout() {

  const [redirect, setredirect] = useState(false)

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={{
        pathname: '/',
      }} />
    }
  }

  const logoutFn=()=>{
    localStorage.removeItem("accessToken")
    setredirect(true)
  }

  useEffect(() => {
    logoutFn();
  }, []);

  return(
    <div>
      {renderRedirect()}
      
    </div>
  )

}