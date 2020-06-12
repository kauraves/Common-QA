import React from 'react';
import { getAllQuestions } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';

class QuestionSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getQuestions = async () => {
    let data = await getAllQuestions();
    await this.sleep(200);
    await this.setState({ data: data });
  };

  goToQuestion(questionID) {
    console.log('This moves you to the questionID: ' + questionID);
  }

  upvoteQuestion(questionID) {
    console.log('This upvotes questionID: ' + questionID);
  }

  downvoteQuestion(questionID) {
    console.log('This downvotes questionID: ' + questionID);
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

  // getDate(date) {
  //   let ParsedDate = new Date(date);
  //   ParsedDate =
  //     ParsedDate.getDate() +
  //     '.' +
  //     (ParsedDate.getMonth() + 1) +
  //     '.' +
  //     ParsedDate.getFullYear();
  //   return ParsedDate;
  // }

  render() {
    //console.log('State in render for data:', this.state.data);

    return (
      <div>
        {this.state.data.map((item) => (
          <div className='post' key={item.post_id}>
            <h4
              className='question-title'
              onClick={() => this.goToQuestion(item.post_id)}>
              <Link to={`/posts/${item.post_id}`} content={item.post_id}>
                {item.title}
              </Link>
            </h4>
            <p>{item.body.substr(0, 250)}</p>
            <p>
              Asked by: {item.author_name} at{' '}
              {this.getDateAndTime(item.created_at.seconds)}
            </p>
            <hr />
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
