import React, {useRef, useEffect, useState} from 'react';
import {
  Container,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from 'reactstrap';
import CardComponent from './CardComponent';
import './Homepage.css';

const Homepage = () => {
  const inputEl = useRef ();
  const [title, setTitle] = useState ('');
  const [body, setBody] = useState ('');
  const [titleCount, updatetitleCount] = useState (0);
  const [bodyCount, updatebodyCount] = useState (0);

  const handleTitleChange = e => {
    if(20-e.target.value.length>=0){
      setTitle (e.target.value);
      updateCount (e.target.value);
    }
  };
  
  const handleBodyChange = e =>{
    if(30-e.target.value.length>=0){
      setBody (e.target.value);
      updateBodyCount (e.target.value);
    }
  }

  const updateCount = val => {
    updatetitleCount (val.length);
  };

  const updateBodyCount = val =>{
    updatebodyCount(val.length)
  }

  const focusOnTitle = e => {
    e.preventDefault ();
    const ele = document.getElementById ('title');
    ele.focus ();
    inputEl.current.focus ();
  };

  return (
    <div>
      <Container>
        <div>
          <h3>Create a Note</h3>
        </div>
        <div>
          <Form>
            <FormGroup>
              <Label for="title">Title:</Label>
              <Col sm={10}>
                <Input
                  ref={inputEl}
                  type="text"
                  name="title"
                  id="title"
                  required
                  onChange={e => handleTitleChange (e)}
                  value={title}
                />
                <p className="float-right">{titleCount}/20</p>
              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="body">Body:</Label>
              <Col sm={10}>
                <Input value={body} type="textarea" name="text" id="body" onChange={e=>handleBodyChange(e)} />
                <p className="float-right">{bodyCount}/30</p>
              </Col>
            </FormGroup>
            <p className="instruction">
              Use the form above to create a post and make sure you fill the required title and body fields and then press submit.
            </p>
            <Button onClick={focusOnTitle}>Submit</Button>
          </Form>
        </div>
        <div className="card-container">
          <Row>
            {[1, 2, 3, 4].map ((ele, index) => (
              <Col className="card-component" key={index} xs="6" sm="4">
                <CardComponent key={index} focusOnTitle={focusOnTitle} />
              </Col>
            ))}

          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
