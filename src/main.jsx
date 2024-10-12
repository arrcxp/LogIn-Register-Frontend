import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Information from './pages/Information'
import DataContext from './components/DataContext.jsx'

import { createHashRouter, RouterProvider } from 'react-router-dom'

const router = createHashRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/SignUp',
    element: <SignUp />
  },
  {
    path: '/Information',
    element: <Information />
  }
])

function App(){
  const [userID, setUserID] = useState();
  const onSetID = (newID) => {
    setUserID(newID);
  }

  return(
    <DataContext.Provider value={{ userID, onSetID }}>
      <RouterProvider router={router}></RouterProvider>
    </DataContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
