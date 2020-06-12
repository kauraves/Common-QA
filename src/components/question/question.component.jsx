import React from 'react';
import { showQuestionDocument } from '../../firebase/firebase.utils';
import { getDateAndTime } from '../../functions';
import Answer from '../answers/answers.component';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };
  }

  getQuestion = async () => {
    let data = await showQuestionDocument(this.props.id);

    let newDate = await getDateAndTime(data.created_at.seconds);
    await this.setState({ data: { ...data, created_at: newDate } });

    await console.log(this.state);
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
          <Answer />
        </div>
      </div>
    );
  }
}

export default Question;
