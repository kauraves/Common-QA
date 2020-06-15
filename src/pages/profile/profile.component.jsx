import React from 'react';
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './profile.styles.css';
import logo from '../../assets/logo192.png';

class ProfilePage extends React.Component {

  render() {

    let name = "";
    let email = "";
    let isAdmin = false;
    let currentUser = this.props.currentUser;

    if (currentUser != null) {
      name = currentUser.displayName;
      email = currentUser.email;
      isAdmin = currentUser.isAdmin;
    }

    return (
      <Container className='profile'>
        <h1>Profile</h1>
        <br></br>
        <p>Your role: {isAdmin === true ? 'admin' : 'user'}</p>
        <Row>
        <Col md="2" >
          <Image src={logo} />
          <Button variant='light'>Change image</Button>
        </Col>
        <Col>
          <Form>
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col md="3" >
                <Form.Control readOnly placeholder={name} />
              </Col>
              <Button variant='light'>
                Edit
              </Button>
            </Form.Group>

            <Form.Group as={Row} className="align-items-center">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col md="3">
                <Form.Control readOnly type="email" placeholder={email} />
              </Col>
              <Button variant='light'>
                Edit
              </Button>
            </Form.Group>
          </Form>
        </Col>
        </Row>

        
        
      </Container>
    ); 
  }
}

export default ProfilePage;
