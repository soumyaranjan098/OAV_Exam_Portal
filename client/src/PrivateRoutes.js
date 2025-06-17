import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/////////////////   used to provide role based access ///////////////
function PrivateRoutes() {

  const data = sessionStorage.getItem('userData')

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(()=>{
    if(data){
      setCurrentUser(JSON.parse(data))
    }
  },[data])


  // console.log(currentUser);

  if (currentUser === null) {
    return;
  } else if (currentUser && currentUser.isAdmin !== undefined && currentUser.isAdmin) {
    // console.log('cll');
    return <Outlet />;
  } else {
    // console.log('f');
    return <Navigate to="/" />;
  }
}

export default PrivateRoutes;
