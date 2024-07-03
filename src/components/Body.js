import React, { useEffect } from 'react'
import Login from './Login'
import Browser from './Browser'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { addUser, removeUser } from '../utils/userSlice'
import { auth } from '../utils/firebase'
import { useDispatch } from 'react-redux'

const Body = () => {
  
  const dispatch = useDispatch();


  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },

    {
      path: "/browse",
      element: <Browser />,

    },

  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName , photoURL } = user;
        dispatch(addUser({ 
          uid: uid, 
          email: email, 
          displayName: displayName ,
          photoURL: photoURL,

        }
        ));


      } else {
        // User is signed out
        dispatch(removeUser());

      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />

    </div>
  )
}

export default Body