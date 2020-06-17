import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router';
//import {observer,inject} from 'mobx-react';
import {
  showAnswerDocument,
  showQuestionDocument,
  editAnswerDocument,
  createAnswerDocument,
} from '../../firebase/firebase.utils';
import { getDateAndTime, sleep } from '../../functions';
import { v4 as uuidv4 } from 'uuid';
import { v1 as uuidv1 } from 'uuid';

class EditAnswer extends React.Component {
  constructor(props) {
    super(props);
    
    

    this.state = {
      uid: "",
      questionData: '',
      data: '',
      editBody: '',
      headerText: this.props.answermode == "Edit" ? "Edit answer": "Add answer",
    };
  }

  createGUID = () => {
    const letters = "ABCDEFGHIJKLMNOPabcdefghijklmnop0123456789"
    let token = ""
    for(let i=0;i<12;i++) {
      let temp = Math.floor(Math.random()*letters.length)
      token = token + letters[temp];
    }
    return token;
  }

  getQuestion = async (id) => {
    let data = await showQuestionDocument(id);
    let newDate = await getDateAndTime(data.created_at.seconds);
    await this.setState({ questionData: { ...data, created_at: newDate } });
    await sleep(500);
  };

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
    this.getQuestion(this.props.question_id);
    if (this.props.answermode == "Edit") {
      this.getAnswer();
    } else {
      let uid = this.createGUID();
      this.setState({uid: uid});
    }
  }

  onChange = (event) => {
    const { value } = event.target;
    this.setState({ editBody: value });
    //let uid = uuidv4();
    //  console.log("UID: " + uid);
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.answermode == "Edit") {
    editAnswerDocument(
      this.props.question_id,
      this.props.answer_id,
      this.state.editBody
    );
    } else {

      let answer = {
        uid: this.state.uid,
        author_id: this.props.author_id,
        author_name: this.props.author_name,
        body: this.state.editBody
      }
      let uid = uuidv4();
      console.log("UID: " + uid);
      createAnswerDocument(this.props.question_id, answer);
    }
    

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
          <h1>{this.state.questionData.title}</h1>
          <p className='textBlock'>{this.state.questionData.body}</p>
          <h2>{this.state.headerText}</h2>
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
/*export default inject(store => ({
	state:store.state
}))(observer(withRouter(EditAnswer)))
*/
