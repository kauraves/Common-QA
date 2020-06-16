import React from 'react';
import {
  showQuestionDocument,
  showAnswers,
} from '../../firebase/firebase.utils';
import { getDateAndTime } from '../../functions';
import AnswerList from '../answers/answer-list.component';
import { sleep } from '../../functions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      answerData: [],
    };
  }

  getAllAnswers = async (id) => {
    let data = await showAnswers(id);
    await sleep(200);

    await this.setState({ answerData: data });
  };

  getQuestion = async (id) => {
    let data = await showQuestionDocument(this.props.id);
    let newDate = await getDateAndTime(data.created_at.seconds);
    await this.setState({ data: { ...data, created_at: newDate } });
    await sleep(500);
  };

  componentDidMount() {
    this.getQuestion();
    this.getAllAnswers(this.props.id);
  }

  render() {
    return (
      <div className='container-fluid'>
        <div>
          <h1>{this.state.data.title}</h1>
          <p className='textBlock'>{this.state.data.body}</p>
          <p className='textBlock'>
            Question asked by {this.state.data.author_name} at{' '}
            {this.state.data.created_at}
          </p>
          <br></br>
        </div>
        <AnswerList
          answers={this.state.answerData}
          question_id={this.props.id}
          isAdmin={this.props.isAdmin}
        />
      </div>
    );
  }
}

export default Question;
