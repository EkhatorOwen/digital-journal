import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useError} from './utils/useError';

import Header from './components/Header/Header.js';
import {Container} from 'reactstrap';
import Homepage from './components/Homepage/Homepage';
import WelcomeBadge from './components/WelcomeBadge/WelcomeBadge';

function App () {
  const [isLoggedIn, setLoggedIn] = useState (false);
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [cookie, setCookie, removeCookie] = useCookies (['auth']);
  const [isOpen, updateOpen] = useState (false);
  const [loginModalOpen, updateLoginModal] = useState (false);
  const [signUpModalOpen, updateSignUpModal] = useState (false);
  const [error, setError] = useError('',5000);
  const [notes, setNotes] = useState([])

  useEffect (() => {
    if(cookie.auth && isLoggedIn===false){
      setLoggedIn(true)
    }
   getUser()
  isLoggedIn && getBooks ()
  },[cookie.auth]);

  const getBooks = () =>{
    axios.get('/api/getbooks',{headers: {
      Authorization: `Bearer ${cookie.auth}`,
    }})
    .then(resp=>{
      
      setNotes(resp.data.message || [])
    })
  }

  const getUser = () =>{
    //check if there is a cookie, then send the cookie to the backend 
    axios
      .get ('/api/getuser', {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        },
      })
      .then (resp => {
         // const { data } = resp.data;
        // console.log('called')
        if (resp.data.type === 'error') {
          return setLoggedIn (false);
        } else if (resp.data.type === 'success') {
         // setUserId(username)
          getBooks();
          return setLoggedIn (true);
        }
      })
      .catch (err => {
        console.log (err);
      });
  }

  const handleUsernameChange = val => {
    setUsername (val);
  };

  const handlePasswordChange = val => {
    setPassword (val);
  };

  const handleConfirmPasswordChange = val => {
    setConfirmPassword (val);
  };

  const logOut = () => {
    axios
    .get ('/api/logout', {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        },
      })
      .then (resp => {
        removeCookie('auth')
        setUserId('')
        setLoggedIn (false);
        emptyFields()
      })
      .catch (err => console.log (err));
  };

  const handleLogin = e => {
    e.preventDefault ();
    if(password===""||username===""){
      return setError("Username or Password cannot be blank")
    }
    axios
      .post (
        '/api/login',
        {username, password}
      )
      .then (resp => {
        if (resp.data.type === 'success') {
          setUserId(resp.data.resp._id)
          setLoggedIn (true);
          getBooks()
          updateLoginModal(false)
          return setCookie ('auth', resp.data.token);
        }
         else if (resp.data.type==='error'){
            return setError(resp.data.message)
         }
      })
      .catch (err => console.log (err));
  };

  const handleSignup = e => {
    e.preventDefault ();
    if (password !== confirmPassword) {
      setError ('passwords do not match');
      return;
    }
    axios
      .post ('/api/signup', {username, password})
      .then (resp => {
        setUserId(resp.data.resp._id)
        setLoggedIn (true);
        updateSignUpModal(false)
        return  setCookie ('auth', resp.data.token);
      })
      .catch (err => console.log (err));
  };

  const emptyFields = () => {
    setUsername ('');
    setPassword ('');
    setConfirmPassword ('');
    setError ('');
  };

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
        setErrormsg={setError}
        errorMsg={error}
        handleSignup={handleSignup}
        isOpen={isOpen}
        updateOpen={updateOpen}
        loginModalOpen={loginModalOpen}
        updateLoginModal={updateLoginModal}
        signUpModalOpen={signUpModalOpen}
        updateSignUpModal={updateSignUpModal}
        isLoggedIn={isLoggedIn}
        logOut={logOut}
      />
      <Container>
        {isLoggedIn ? <Homepage userId={userId} notes={notes} getBooks={getBooks} /> : <WelcomeBadge />}
      </Container>
    </div>
  );
}

export default App;
