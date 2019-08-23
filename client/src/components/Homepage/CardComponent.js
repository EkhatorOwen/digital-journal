import React from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
} from 'reactstrap';

const CardComponent = ({cardTitle, cardBody, focusOnTitle}) => {
  return (
    <div>
      <Card>
        
        <CardBody>
          <CardTitle>{cardTitle || "not provided yet"}</CardTitle>
          <CardText>
           {cardBody || "to be provided"}
          </CardText>
          <Button onClick={focusOnTitle}>Edit</Button> <Button>Delete</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardComponent;
