import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, RouterProvider, createBrowserRouter } from 'react-router-dom'
import store from './states/index.js'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import LoginInput from './components/LoginInput.jsx'
import LandingComponent from './components/Landing.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }, 
  {
    path: "/login",
    element: <LoginInput />
  },
  {
    path: '/landing',
    element: <LandingComponent />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>,
)
