import React, {useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button,
} from 'reactstrap';

import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

const Header = () => {
  const [isOpen, updateOpen] = useState(false);
  const [loginModalOpen, updateLoginModal] = useState(false);
  const [signUpModalOpen, updateSignUpModal] = useState(false);

 const toggleOpen = (type) =>{
    if(type==="login"){
      updateLoginModal(!loginModalOpen)
    } else if(type==="signup"){
      updateSignUpModal(!signUpModalOpen)
    }
  }

  const toggle = () => {
    updateOpen (!isOpen);
  };
  return (
    <div>
      <Navbar color="inverse" light expand="md">
        <NavbarBrand href="/">Digital Journal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button onClick={()=>toggleOpen('login')} color="green">Login</Button>
            </NavItem>
            <NavItem>
              
              <Button onClick={()=>toggleOpen('login')} color="green">Sign Up</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Jumbotron>
        <Container>
          <Row>
            <Col>
              <h1>Welcome</h1>

            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <LoginModal isOpen={loginModalOpen} toggleOpen={toggleOpen}/>
      <SignupModal isOpen={signUpModalOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default Header;
