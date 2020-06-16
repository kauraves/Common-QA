import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router';

import {
  showAnswerDocument,
  editAnswerDocument,
} from '../../firebase/firebase.utils';
import { getDateAndTime, sleep } from '../../functions';

class EditAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editBody: '',
    };
  }

  getAnswer = async () => {
    // Change this to .then() instead of await
    let data = await showAnswerDocument(
      this.props.question_id,
      this.props.answer_id
    );

    console.log('DEMO: stats of the answer you are currently editing:', data);
    // check await?
    let newDate = await getDateAndTime(data.created_at.seconds);
    await this.setState({ data: { ...data, created_at: newDate } });
    await this.setState({ editBody: this.state.data.body });
    sleep(500);
  };

  componentDidMount() {
    this.getAnswer();
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState({ editBody: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    editAnswerDocument(
      this.props.question_id,
      this.props.answer_id,
      this.state.editBody
    );
    console.log('Data changed');
    this.props.history.goBack();
  };

  getData = () => {
    let body = '';
    if (this.state.data) {
      body = this.state.data.body;
    } else {
      body = this.state.editBody;
    }
    return body;
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.submit}>
          <h2>Edit answer</h2>
          <Form.Control
            as='textarea'
            type='text'
            className='form-control'
            id='exampleFormControlTextarea1'
            rows='12'
            onChange={this.onChange}
            name='body'
            value={this.state.editBody}></Form.Control>
        </Form>
        <Button variant='light' onClick={this.onSubmit}>
          Submit changes
        </Button>
      </Container>
    );
  }
}

export default withRouter(EditAnswer);
