import React from 'react';
import Button from 'react-bootstrap/Button';

class Votes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button
          variant='success'
          onClick={() => this.props.upvoteQuestion(this.props.questionID)}>
          {this.props.question}upvote
        </Button>
        <p>{this.props.votes}</p>
        <Button
          variant='danger'
          onClick={() => this.props.downvoteQuestion(this.props.questionID)}>
          downvote
        </Button>
      </div>
    );
  }
}

export default Votes;
