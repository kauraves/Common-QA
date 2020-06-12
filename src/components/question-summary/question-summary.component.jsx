import React from 'react';
import { getAllQuestions } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

class QuestionSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getQuestions();
    console.log(this.state.data);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getQuestions = async () => {
    let data = await getAllQuestions();
    await this.sleep(200);
    console.log(data);
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
    const questionItems = this.state.data.map((questionItem, index) => (
      <tr key={index}>
        <td>
          <p>Asked by: {questionItem.author_name} at </p>
          <p>{this.getDateAndTime(questionItem.created_at.seconds)}</p>
        </td>
        <td>
          <h4
            className='question-title'
            onClick={() => this.goToQuestion(questionItem.post_id)}>
            <Link
              key={questionItem.post_id}
              to={`/question/${questionItem.post_id}`}
              content={questionItem.post_id}>
              {questionItem.title}
            </Link>
          </h4>
          <p>{questionItem.body.substr(1, 250)}</p>
        </td>
      </tr>
    ));

    return (
      <div>
        <Table bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Questions</th>
            </tr>
          </thead>
          <tbody>{questionItems}</tbody>
        </Table>
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
