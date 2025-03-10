import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { apiCall } from '../../utils/httpMethods';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/userSlice';
import { getToken, removeToken, setToken } from '../../helper/utilityfn';
import Loading from '../UI/common/Loading';

function RootLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    if(getToken()){
      apiCall('GET','verify')
    .then((response)=>{
      if(response.success){
        const token = response.token;
        const user = response.user;
        dispatch(userActions.setUser(user));
        setToken(token);
        setLoading(false);
      }
      else{
        removeToken();
        setLoading(false);
      }
    })
    .catch((error)=>{
      console.log(error);
      removeToken();
      setLoading(false);
    })
    }
    else{
      setLoading(false);
    }
  },[dispatch])


  if(loading){
    return <Loading/>
  }
 
  if(!loading){
    return <Outlet/>
  }

  return (
    <Outlet/>
  )
}

export default RootLayout