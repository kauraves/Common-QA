//TODO:
//Show name of the poster and time of the post
//Chosen / Most upvoted answer.
//The number of answers

import React from 'react';
import Table from 'react-bootstrap/Table';
import QuestionSummary from '../../components/question-summary/question-summary.component';
import Votes from '../../components/votes/votes.component';
import './homepage.styles.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        // Temporary test data
        {
          name: 'Dorothy',
          questionTitle: 'nec, diam. Duis mi enim,',
          questionText:
            'id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis',
          questionID: 101,
          votes: 27,
        },
        {
          name: 'Quamar',
          questionTitle: 'ac sem ut dolor dapibus',
          questionText:
            'auctor non, feugiat nec, diam. Duis mi enim, condimentum eget, volutpat ornare, facilisis',
          questionID: 102,
          votes: 22,
        },
        {
          name: 'Wade',
          questionTitle: 'mattis semper, dui lectus rutrum',
          questionText:
            'nisl sem, consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed id',
          questionID: 103,
          votes: 8,
        },
        {
          name: 'Heather',
          questionTitle: 'in consectetuer ipsum nunc id',
          questionText:
            'Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla.',
          questionID: 104,
          votes: 29,
        },
        {
          name: 'Ayanna',
          questionTitle: 'eget tincidunt dui augue eu',
          questionText:
            'dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus',
          questionID: 105,
          votes: 30,
        },
      ],
    };
  }

  gotToQuestion(questionID) {
    console.log('This moves you to the questionID: ' + questionID);
  }

  upvoteQuestion(questionID) {
    console.log('This upvotes questionID: ' + questionID);
  }

  downvoteQuestion(questionID) {
    console.log('This downvotes questionID: ' + questionID);
  }

  render() {
    let questionItems = this.state.list.map((questionItem) => (
      <tr>
        <td>
          <Votes
            votes={questionItem.votes}
            questionID={questionItem.questionID}
            upvoteQuestion={this.upvoteQuestion}
            downvoteQuestion={this.downvoteQuestion}
          />
        </td>
        <td>
          <QuestionSummary
            question={questionItem.questionTitle}
            questionID={questionItem.questionID}
            textBlock={questionItem.questionText}
            goToQuestion={this.gotToQuestion}
          />
        </td>
      </tr>
    ));

    return (
      <div className='homepage'>
        <h1>All questions</h1>
        <Table striped bordered hover>
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

export default HomePage;
