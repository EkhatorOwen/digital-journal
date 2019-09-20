import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';

const CardComponent = ({cardTitle, cardBody,  editCard, ele, deleteNote}) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>{cardTitle || "not provided yet"}</CardTitle>
          <CardText>
           {cardBody || "to be provided"}
          </CardText>
          <Button onClick={()=>editCard(ele)}>Edit</Button> <Button onClick={()=>deleteNote(ele)}>Delete</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComponent;
