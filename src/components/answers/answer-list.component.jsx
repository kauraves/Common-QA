import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import { getDateAndTime } from '../../functions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class AnswerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // hasAnswers: false,
      answers: [],
    };
  }

  upvoteQuestion(questionID) {
    console.log('This upvotes questionID: ' + questionID);
  }

  downvoteQuestion(questionID) {
    console.log('This downvotes questionID: ' + questionID);
  }

  markedAsBestAnswer(answer) {
    let text = String.fromCodePoint(0x1f354);
    text = '✔️';
    if (answer.marked_as_best === true) {
      return <span> {text}</span>;
    } else {
      return <span></span>;
    }
  }

  render() {
    let answerItems = this.props.answers.map((answer, index) => (
      <tr key={index}>
        <td>
          <button>
            <i className='fas fa-thumbs-up'></i>
          </button>
          <span>{answer.votes}</span>
          <p>{this.markedAsBestAnswer(answer)}</p>

          <button>
            <i className='fas fa-thumbs-down'></i>
          </button>
        </td>
        <td>
          <p className='textBlock'>{answer.body + ' '}</p>
          <p className='textBlock'>
            Answered by: {answer.author_name} at{' '}
            {getDateAndTime(answer.created_at.seconds)}{' '}
          </p>
          {this.props.isAdmin ? (
            <Link
              to={{
                pathname: `${this.props.location.pathname}/${answer.answer_id}/edit`,
                state: {
                  answer_id: answer.answer_id,
                  question_id: answer.question_id,
                },
              }}>
              <button>Edit</button>
            </Link>
          ) : (
            'hi'
          )}
        </td>
      </tr>
    ));

    if (this.props.answers == null || this.props.answers.length === 0) {
      return <h5 className='p-2'>No Answers yet</h5>;
    } else {
      return (
        <div className='homepage'>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>
                  {' '}
                  <h4>Answers </h4>{' '}
                </th>
              </tr>
            </thead>
            <tbody>{answerItems}</tbody>
          </Table>
        </div>
      );
    }
  }
}

export default withRouter(AnswerList);
