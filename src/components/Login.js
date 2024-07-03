import { useRef } from 'react'
import Header from './Header'
import { useState } from 'react';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
const Login = () => {


  const navigate = useNavigate();
  const [isSignIn, SetisSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const Email = useRef(null);
  const Password = useRef(null);
  const Name = useRef(null);

  const handleSignIn = () => {
    //Validate form data
    const message = checkValidData(Email.current.value, Password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignIn) {
      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: Name.current.value, 
            photoURL : "https://img.icons8.com/?size=100&id=GfAxQ910Kq4a&format=png&color=000000",

            })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");

            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          console.log(user);
          navigate("/browse")

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }

    else {
      signInWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });

    }
  }

  const toggleSignInForm = () => {
    SetisSignIn(!isSignIn);
  };
  return (

    <div>
      <Header />

      <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/335ddde7-3955-499c-b4cc-ca2eb7e1ae71/a7d20bc1-831c-4f9d-8153-11bdf7a08d23/IN-en-20240624-POP_SIGNUP_TWO_WEEKS-perspective_WEB_13cda806-d858-493e-b4aa-f2792ff965dc_large.jpg"
          alt='logo'
        />
      </div>

      <form onSubmit={(e) => e.preventDefault()}
        className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg opacity-80'>
        <h1 className='font-bold text-3xl py-4'>
          {isSignIn ? "Sign In" : " Sign Up"}
        </h1>

        {!isSignIn && <input
          ref={Name}
          type="text"
          placeholder="Full Name"
          className="p-4 my-4 w-full bg-gray-700"
        />}

        <input
          ref={Email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={Password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <p className='text-red-500 font-bold '>{errorMessage}</p>
        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleSignIn}>

          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
          {isSignIn ? "New To Netflix ? Sign Up Now " : "Already a User ? Sign in Now "}</p>
      </form>


    </div>


  );
};

export default Login