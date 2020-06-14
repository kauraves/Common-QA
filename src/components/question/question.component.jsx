import React from 'react';
import {showQuestionDocument, showAnswers, getQuestionsAns} from '../../firebase/firebase.utils';
import { getDateAndTime } from '../../functions';
import Table from 'react-bootstrap/Table';

import { sleep } from '../../functions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      answerData: [],
    };
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getQuestionsAnswersLocal = async (id) => {
    let data = await getQuestionsAns(id);
    await this.sleep(500);
    console.log(data);
    await this.setState({ answerData: data });
  };

  getQuestion = async () => {
    // Change this to .then() instead of await
    let data = await showQuestionDocument(this.props.id);
    // check await?
    let newDate = await getDateAndTime(data.created_at.seconds);
    await this.setState({ data: { ...data, created_at: newDate } });

    await this.getAnswers();
  };

  getAnswers = async () => {
    let data = await showAnswers(this.props.id);
    await this.setState({ answerData: data });
    await sleep(500);
    await console.log(this.state.answerData);
  };

  componentDidMount() {
    //this.getQuestion();
    this.getQuestionsAnswersLocal(this.props.id);
    this.getQuestion();
  }

  getDateAndTime(seconds) {
    let ParsedDate = new Date(seconds * 1000);
    ParsedDate =
      ParsedDate.getDate() +
      '.' +
      (ParsedDate.getMonth() + 1) +
      '.' +
      ParsedDate.getFullYear() +
      ' : ' +
      ParsedDate.getHours() +
      ':' +
      ParsedDate.getMinutes() +
      ':' +
      ParsedDate.getSeconds();
    return ParsedDate;
  }

  render() {
    const answers = this.state.answerData.map((answer, index) => (
      <tr key={index}>
        
        <td>
          <p>{answer.body + " "} {}</p>
          <p>Answered by: {answer.author_name} at {this.getDateAndTime(answer.created_at.seconds)}</p>
          
        </td>
      </tr>
    ));

    return (
      <div>
        <div>
          <h1>{this.state.data.title}</h1>
          <p>{this.state.data.body}</p>
          <p>
            Question asked by {this.state.data.author_name} at{' '}
            {this.state.data.created_at}
          </p>
          <hr />
        </div>
        <Table bordered hover>
          <thead>
            <tr>
              
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>{answers}</tbody>
        </Table>
      </div>
    );
  }
}

export default Question;

