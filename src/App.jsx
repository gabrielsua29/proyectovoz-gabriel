import React from 'react'
//import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './Components/Home';
import TutorialReact from './Components/TutorialReact'


const router = createBrowserRouter([
  {
    path: '/',
    children: [
    
      {
        index: true,
        element: <Home />
      },
      {
        path: '/tutorialreact',
        element: <TutorialReact />
      }
    ]
  }
])

function App() {
  return (   
    <RouterProvider router={router} />
  );
}

export default App;