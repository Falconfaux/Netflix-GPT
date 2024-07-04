import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constant';


const Header = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        const { uid, email, displayName , photoURL } = user;
        dispatch(addUser({ 
          uid: uid, 
          email: email, 
          displayName: displayName ,
          photoURL: photoURL,

        }
        ));
        navigate("/browse");

      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=> unsubscribe();
  }, []);


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {

      })
      .catch((error) => {
        navigate("/error");
      });
  };
  
  return (
    <div className='flex flex-col md:flex-row justify-between w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10'>
      <img
        className='w-44'
        src={LOGO}  alt="logo"
      />
      {user && (
        <div className='flex p-2'>
          <img
            className='w-12 h-12'
            alt='usericon'
            src={USER_AVATAR}
          />
          <button onClick={handleSignOut} className='font-bold text-white'>
            (Sign Out)
          </button>
          
        </div>
      )}
    </div>
  );
};

export default Header;