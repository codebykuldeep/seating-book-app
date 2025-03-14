import React from 'react';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Authpage from './components/UI/Authpage/Authpage';
import RootLayout from './components/Layout/RootLayout';
import { authLoader, HomeLoader } from './utils/routerLoaders';
import HomeLayout from './components/Layout/HomeLayout';
import Seatings from './components/User/Seatings/Seatings';
import Meetings from './components/User/Meetings/Meetings';
import History from './components/User/History/History';
import MyMeetings from './components/User/MyMeetings/MyMeetings';
import { createTheme, ThemeProvider } from '@mui/material';
import ErrorPage from './components/UI/common/ErrorPage';


const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});



const router = createBrowserRouter([
  {
    path:'/',
    element:<RootLayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'',
        loader:HomeLoader,
        element:<HomeLayout/>,
        children:[
          {
            path:'',
            element:<Navigate to={'/seatings'}/>
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
            path:'my-meets',
            element:<MyMeetings/>
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
    <ThemeProvider theme={theme}>
       <RouterProvider  router={router}/>
    </ThemeProvider>
   
  );
}

export default App;
