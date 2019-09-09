import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap';

import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const Header = props => {
  const toggleOpen = type => {
    if (type === 'login') {
      props.updateLoginModal (!props.loginModalOpen);
      props.emptyFields ();
    } else if (type === 'signup') {
      props.updateSignUpModal (!props.signUpModalOpen);
      props.emptyFields ();
    }
  };

  const toggle = () => {
    props.updateOpen (!props.isOpen);
  };
  return (
    <div>
      <Navbar color="green" light expand="md">
        <NavbarBrand href="/">Digital Journal</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={props.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!props.isLoggedIn &&
              <>
                <NavItem>
                  <Button onClick={() => toggleOpen ('login')} color="green">
                    Login
                  </Button>
                </NavItem>
                <NavItem>
                  <Button onClick={() => toggleOpen ('signup')} color="green">
                    Sign Up
                  </Button>
                </NavItem>
              </>}

            {props.isLoggedIn &&
              <NavItem>
                <Button onClick={props.logOut} color="green">
                  Log Out
                </Button>
              </NavItem>}
          </Nav>
        </Collapse>
      </Navbar>

      <LoginModal
        {...props}
        isOpen={props.loginModalOpen}
        toggleOpen={toggleOpen}
      />
      <SignupModal
        {...props}
        isOpen={props.signUpModalOpen}
        toggleOpen={toggleOpen}
      />
    </div>
  );
};

export default Header;
