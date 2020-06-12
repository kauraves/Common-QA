import React from 'react';
import {
  showQuestionDocument,
  showAnswers,
} from '../../firebase/firebase.utils';
import { getDateAndTime } from '../../functions';

import { sleep } from '../../functions';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
      answerData: [],
    };
  }

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
    this.getQuestion();
  }

  render() {
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
      </div>
    );
  }
}

export default Question;
