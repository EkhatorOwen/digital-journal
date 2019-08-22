import React from 'react';
import { Row, Jumbotron, Container, Col } from 'reactstrap'

const WelcomeBadge = () => {
  return (
    <div>
      <Row>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <h1>Welcome</h1>

              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </Row>
    </div>
  );
};

export default WelcomeBadge;
