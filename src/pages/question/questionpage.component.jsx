import React from 'react';
import Question from '../../components/question/question.component';

const QuestionPage = (props) => (
  <div className='question'>
    <Question
      id={props.content.match.params.slug}
      isAdmin={props.isAdmin}
      aid={props.content.match.params.aid}
    />
  </div>
);

export default QuestionPage;
