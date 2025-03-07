import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Authpage from './components/UI/Authpage/Authpage';
import RootLayout from './components/Layout/RootLayout';
import { authLoader, HomeLoader } from './utils/routerLoaders';
import Home from './components/User/Home';
import HomeLayout from './components/Layout/HomeLayout';
import Seatings from './components/User/Seatings/Seatings';
import Meetings from './components/User/Meetings/Meetings';
import History from './components/User/History/History';



const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    children:[
      {
        path:'',
        loader:HomeLoader,
        element:<HomeLayout/>,
        children:[
          {
            path:'',
            element:<Home/>
          },
          {
            path:'seatings',
            element:<Seatings/>
          },
          {
            path:'meetings',
            element:<Meetings/>
          },
          {
            path:'history',
            errorElement:<h1>Error Occurred while showing history</h1>,
            element:<History/>
          }
        ]
      },
      {
        path:'login',
        loader:authLoader,
        element:<Authpage/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider  router={router}/>
  );
}

export default App;
