import React from 'react';
import { getAllQuestions } from '../../firebase/firebase.utils';

class QuestionSummary extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      data: [],
    };
  }

  async componentWillMount() {
    let data = await getAllQuestions();
    this.setState({ data: data });
    await console.log(this.state.data);
  }

  componentDidMount() {
    //  console.log(this.state);
    //let day = 1591218000;
  }

  goToQuestion(questionID) {
    console.log('This moves you to the questionID: ' + questionID);
  }

  upvoteQuestion(questionID) {
    console.log('This upvotes questionID: ' + questionID);
  }

  downvoteQuestion(questionID) {
    console.log('This downvotes questionID: ' + questionID);
  }

  render() {
    let day = new Date(1591218000 * 1000);
    console.log(day);

    return (
      <div>
        {this.state.data.map((item) => (
          <div>
            <h4
              className='question-title'
              onClick={() => this.goToQuestion(item.title)}>
              {item.title}
            </h4>
            <p>{item.body}</p>
            <p>Asked by: {item.author_name} </p>
          </div>
        ))}
      </div>
    );
  }
}

export default QuestionSummary;

// <div>
// <h4
//   className='questionTitle'
//   id={this.props.questionID}
//   onClick={() => this.props.goToQuestion(this.props.questionID)}>
//   {this.props.question}
// </h4>
// <p className='textBlock'>{this.props.textBlock}</p>
// </div>
