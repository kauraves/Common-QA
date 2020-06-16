import React from 'react';
import { getAllQuestions } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { getDateAndTime, sleep } from '../../functions';

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

  getQuestions = async () => {
    let data = await getAllQuestions();
    await sleep(200);

    await this.setState({ data: data });
  };

  render() {
    const questionItems = this.state.data.map((questionItem, index) => (
      <tr key={index}>
        <td>
          <p>Asked by: {questionItem.author_name} at </p>
          <p>{getDateAndTime(questionItem.created_at.seconds)}</p>
        </td>
        <td>
          <h4 className='question-title'>
            <Link
              key={questionItem.post_id}
              to={`/question/${questionItem.post_id}`}
              content={questionItem.post_id}>
              {questionItem.title}
            </Link>
          </h4>
          <p>{questionItem.body.substr(0, 249)}</p>
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
