import React, {useState} from 'react';
import axios from 'axios'

import Header from './components/Header/Header.js';
import {Container} from 'reactstrap';
import Homepage from './components/Homepage/Homepage';
import WelcomeBadge from './components/WelcomeBadge/WelcomeBadge';

function App () {
  const [isLoggedIn, setLoggedIn] = useState (false);
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');

  const handleUsernameChange = val => {
    setUsername (val);
  };

  const handlePasswordChange = val => {
    setPassword (val);
  };
  
  const handleConfirmPasswordChange = val => {
    setConfirmPassword (val);
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('/api',{username,password})
         .then(resp=>console.log(resp))
         .catch(err=>console.log(err))
  }

  const emptyFields = () =>{
    setUsername('');
    setPassword('');
    setConfirmPassword('');
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

      />
      <Container>
        {isLoggedIn ? <WelcomeBadge /> : <Homepage handleSubmit={handleSubmit} />}
      </Container>
    </div>
  );
}

export default App;
