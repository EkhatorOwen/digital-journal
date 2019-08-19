import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

const LoginModal = ({isOpen, toggleOpen}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => toggleOpen ('login')}>
        <ModalHeader toggle={() => toggleOpen ('login')}>
          Log In
        </ModalHeader>
        <Form>
          <ModalBody>

            <FormGroup>
              <Label for="username">Username:</Label>
              <Input
                type="name"
                name="username"
                id="username"
                placeholder="Enter Username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password:</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
              />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => toggleOpen ('login')}>
              Cancel
            </Button>
            {' '}
            <Button color="primary">
            Log In
          </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
