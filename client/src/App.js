import React, {useState} from 'react';
import Header from './components/Header/Header.js';
import { Container } from 'reactstrap';
import  Homepage from './components/Homepage/Homepage';
import WelcomeBadge from './components/WelcomeBadge/WelcomeBadge';

function App () {
  const [isLoggedIn, setLogedIn] = useState(false)
  return (
    <div>
      <Header />
      <Container>
       { isLoggedIn ? <WelcomeBadge/> : <Homepage/>}
      </Container>
    </div>
  );
}

export default App;
