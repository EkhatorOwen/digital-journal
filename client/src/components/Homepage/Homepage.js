import React, {useRef,  useState} from 'react';
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
import {useCookies} from 'react-cookie';

import axios from 'axios';

import CardComponent from './CardComponent';

import './Homepage.css';

const Homepage = ({userId, notes, getBooks}) => {
  const inputEl = useRef ();
  const [title, setTitle] = useState ('');
  const [body, setBody] = useState ('');
  const [noteId, setNoteId] = useState('');
  const [titleCount, updatetitleCount] = useState (0);
  const [bodyCount, updatebodyCount] = useState (0);
  const [cookie] = useCookies (['auth']);
  const [mode, setMode] = useState('')

  const editCard = (ele) =>{
    setMode('edit')
    handleTitleChange({name:'element',ele})
    handleBodyChange({name: 'element', ele})
  }



  const handleTitleChange = (...args) => {
    let result = args[0];
   
    if(result.name==='element'){
      if (20 - result.ele.title.length >= 0) {
        setTitle (result.ele.title);
        updateCount (result.ele.title);
      }
      return
    }
    if (20 - result.target.value.length >= 0) {
      setTitle (result.target.value);
      updateCount (result.target.value);
    }
  };

  const handleBodyChange = (...args) => {
    let result = args[0];
    if(result.name==='element'){
      if (100 - result.ele.body.length >= 0) {
        setBody (result.ele.body);
        updateBodyCount (result.ele.body);
      }
      return
    }
    if (100 - result.target.value.length >= 0) {
      setBody (result.target.value);
      updateBodyCount (result.target.value);
    }
  };

  const updateCount = val => {
    updatetitleCount (val.length);
  };

  const updateBodyCount = val => {
    updatebodyCount (val.length);
  };

  const focusOnTitle = e => {
    e.preventDefault ();
    const ele = document.getElementById ('title');
    ele.focus ();
  };

  const handleSubmit = () => {
    axios
      .post ('/api/createnote', { 
        title,
        body,
        userId
      }, {
        headers: {
          Authorization: `Bearer ${cookie.auth}`,
        },
      })
      .then (resp => {
        getBooks()
        setTitle('')
        setBody('')
      })
      .catch (err => console.log (err));
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
                <Input
                  value={body}
                  type="textarea"
                  name="text"
                  id="body"
                  onChange={e => handleBodyChange (e)}
                />
                <p className="float-right">{bodyCount}/100</p>
              </Col>
            </FormGroup>
            <p className="instruction">
              Use the form above to create a post and make sure you fill the required title and body fields and then press submit.
            </p>
            <Button onClick={handleSubmit}>Submit</Button>
          </Form>
        </div>
        <div className="card-container">
          <Row>
            {notes.map ((ele, index) => (
              <Col className="card-component" key={index} index={index} xs="6" sm="4">
                <CardComponent key={index} editCard={editCard} ele={ele} cardTitle={ele.title} cardBody={ele.body} handleTitleChange={handleTitleChange} focusOnTitle={focusOnTitle} />
              </Col>
            ))}

          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
