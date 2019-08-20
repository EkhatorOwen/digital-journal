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
  Container,
  Col,
  Row
} from 'reactstrap';

const SignupModal = ({toggleOpen, isOpen}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => toggleOpen ('signup')}>
        <ModalHeader toggle={() => toggleOpen ('signup')}>
          Sign Up
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
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password:</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="comfirm password">Confirm Password:</Label>
              <Input
                type="password"
                name="comfirm password"
                id="confirmPassword"
                placeholder="Enter Password"
                required
              />
            </FormGroup>
          </ModalBody>
          <Container><Row><Col sm="12" md={{ size: 6, offset: 3 }}><p>this is an error message</p></Col></Row></Container>
          <ModalFooter>
            <Button color="danger" onClick={() => toggleOpen ('signup')}>
              Cancel
            </Button>
            {' '}
            <Button color="primary">
              Sign Up
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default SignupModal;
