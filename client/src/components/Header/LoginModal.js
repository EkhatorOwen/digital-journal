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
  Input
} from 'reactstrap';

const LoginModal = ({isOpen, toggleOpen,...props}) => {
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
                type="text"
                name="username"
                id="username"
                value={props.username}
                onChange={e=>props.handleUsernameChange(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password:</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={props.password}
                onChange={e=>props.handlePasswordChange(e.target.value)}
                required
              />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => toggleOpen ('login')}>
              Cancel
            </Button>
            {' '}
            <Button onClick={props.handleLogin} color="primary">
            Log In
          </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginModal;
