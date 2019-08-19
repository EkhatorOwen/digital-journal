import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const SignupModal = ({toggleOpen, isOpen}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggleOpen}>
        <ModalHeader toggle={toggleOpen}>
          Sign Up
        </ModalHeader>
        <Form>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleOpen}>
              Do Something
            </Button>
            {' '}
            <Button color="secondary" onClick={toggleOpen}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default SignupModal;
