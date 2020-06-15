import React from 'react';
import {showQuestionDocument, showAnswers, getQuestionsAns} from '../../firebase/firebase.utils';
import { getDateAndTime } from '../../functions';
//import Table from 'react-bootstrap/Table';
import AnswerList from './../answers/AnswerList';

import { sleep } from '../../functions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    console.log("aid: " + this.props.aid);
    this.state = {
      data: '',
      answerData: [],
    };
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getQuestionsAnswers = async (id) => {
    let data = await getQuestionsAns(id);
    await this.sleep(200);
    console.log(data);
    await this.setState({ answerData: data });
  };

  getQuestion = async () => {
    // Change this to .then() instead of await
    let data = await showQuestionDocument(this.props.id);
    // check await?
    let newDate = await getDateAndTime(data.created_at.seconds);
    await this.setState({ data: { ...data, created_at: newDate } });

    //await this.getAnswers();
  };

  getAnswers = async () => {
    let data = await showAnswers(this.props.id);
    await this.setState({ answerData: data });
    await sleep(500);
    await console.log(this.state.answerData);
  };

  componentDidMount() {
    //this.getQuestion();
    this.getQuestionsAnswers(this.props.id);
    this.getQuestion();
  }

  render() {
    /*const answers = this.state.answerData.map((answer, index) => (
      <tr key={index}>
        
        <td>
          <p>{answer.body + " "} {}</p>
          <p>Answered by: {answer.author_name} at {this.getDateAndTime(answer.created_at.seconds)}</p>
          
        </td>
      </tr>
    ));
    */

    return (
      <div className="container-fluid">
        <div>
          <h1>{this.state.data.title}</h1>
          <p className="textBlock">{this.state.data.body}</p>
          <p className="textBlock">
            Question asked by {this.state.data.author_name} at{' '}
            {this.state.data.created_at}
          </p>
          
        </div>
        <AnswerList answers={ this.state.answerData } 
                    question_id = {this.props.id}
        />

        
      </div>
    );
  }
}

export default Question;

/*
<Table bordered hover>
          
          <tbody>{answers}</tbody>
        </Table>
*/
