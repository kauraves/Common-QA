import React from 'react';
import { Form, Button, Header } from 'semantic-ui-react';

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
    console.log('Hello:', props);
  }

  getAnswer = async () => {
    console.log('ID:', this.props.answer_id, 'QID:', this.props.question_id);

    // Change this to .then() instead of await
    let data = await showAnswerDocument(
      this.props.question_id,
      this.props.answer_id
    );

    console.log(data);
    // check await?
    let newDate = await getDateAndTime(data.created_at.seconds);
    await this.setState({ data: { ...data, created_at: newDate } });
    await console.log('Hi there:', this.state);
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
      <div>
        {' '}
        <Form onSubmit={this.submit}>
          <Header as='h2'>Answer</Header>
          <Form.Field>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='12'
              onChange={this.onChange}
              name='body'
              value={this.state.editBody}></textarea>
          </Form.Field>
        </Form>
        <Button onClick={this.onSubmit}>Submit changes</Button>
      </div>
    );
  }
}

export default EditAnswer;
