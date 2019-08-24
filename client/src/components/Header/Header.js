import React, {useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';

import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

const Header = (props) => {
  const [isOpen, updateOpen] = useState(false);
  const [loginModalOpen, updateLoginModal] = useState(false);
  const [signUpModalOpen, updateSignUpModal] = useState(false);

 const toggleOpen = (type) =>{
    if(type==="login"){
      updateLoginModal(!loginModalOpen)
      props.emptyFields()
    } else if(type==="signup"){
      updateSignUpModal(!signUpModalOpen)
      props.emptyFields()
    }
  }

  const toggle = () => {
    updateOpen (!isOpen);
  };
  return (
    <div>
      <Navbar color="green" light expand="md">
        <NavbarBrand href="/">Digital Journal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button onClick={()=>toggleOpen('login')} color="green">Login</Button>
            </NavItem>
            <NavItem>
              
              <Button onClick={()=>toggleOpen('signup')} color="green">Sign Up</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      
      <LoginModal {...props}  isOpen={loginModalOpen} toggleOpen={toggleOpen}/>
      <SignupModal {...props} isOpen={signUpModalOpen} toggleOpen={toggleOpen} />
    </div>
  );
};

export default Header;
