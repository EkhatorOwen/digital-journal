import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useCookies } from 'react-cookie';
import { useError } from './utils/useError';

import Header from './components/Header/Header.js';
import {Container} from 'reactstrap';
import Homepage from './components/Homepage/Homepage';
import WelcomeBadge from './components/WelcomeBadge/WelcomeBadge';

function App () {
  const [isLoggedIn, setLoggedIn] = useState (false);
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [errorMsg, setErrormsg] = useState('')
  const [cookie, setCookie, removeCookie] = useCookies(['auth'])
  const [isOpen, updateOpen] = useState(false);
  const [loginModalOpen, updateLoginModal] = useState(false);
  const [signUpModalOpen, updateSignUpModal] = useState(false);

  useEffect(() => {
    //check if there is a cookie, then send the cookie to the backend to 
    axios
    .get('/api/getuser', {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        },
      })
         .then(resp=>{ 
           if(resp.data.type=="error"){
           return setLoggedIn(false)
           } else if(resp.data.type=="success"){
              return  setLoggedIn(true)
           }
           return setLoggedIn(false)
         })
         .catch(err=>{console.log(err)})

  }, [])

  const handleUsernameChange = val => {
    setUsername (val);
  };

  const handlePasswordChange = val => {
    setPassword (val);
  };
  
  const handleConfirmPasswordChange = val => {
    setConfirmPassword (val);
  };

  const logOut = () =>{
    axios.post('/api/logout',{
      headers: {
        Authorization: `Bearer ${cookie.auth}`,
      },
    })
         .then(resp=>{
           removeCookie('auth')
         })
        }

  const handleLogin = (e) =>{
    e.preventDefault();
    axios.post('/api/login'{
      headers: {
        Authorization: `Bearer ${cookie.auth}`,
      },
    }    ,{username,password})
         .then(resp=>{
           if(resp.data.type==='success'){                          
               setLoggedIn(true)
              return setCookie('auth',resp.data.token)
           } 
          //  else if (resp.data.type==='error'){
             
          //  }
          console.log(resp.data)
         })
         .catch(err=>console.log(err))
  }

  const handleSignup = (e) => {
    e.preventDefault();
    if(password!==confirmPassword) {
      setErrormsg('passwords do not match')
      return;
    }
    axios.post('/api/signup',{username,password})
          .then(resp=>{
            setCookie('auth',resp.data.token)
          })
          .catch(err=>console.log(err))
  }

  const emptyFields = () =>{
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrormsg('');
  }


  return (
    <div>
      <Header
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        emptyFields={emptyFields}
        handleLogin={handleLogin}
        setErrormsg={setErrormsg}
        errorMsg={errorMsg}
        handleSignup={handleSignup}
        isOpen={isOpen}
        updateOpen={updateOpen}
        loginModalOpen={loginModalOpen}
        updateLoginModal={updateLoginModal}
        signUpModalOpen={signUpModalOpen}
        updateSignUpModal={updateSignUpModal}

      />
      <Container>
        {isLoggedIn ? <Homepage /> : <WelcomeBadge /> }
      </Container>
    </div>
  );
}

export default App;
