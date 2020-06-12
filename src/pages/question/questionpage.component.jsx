import React from 'react';
import Question from '../../components/question/question.component';

const QuestionPage = (props) => (
  <div className='question'>
    <Question id={props.content.match.params.slug} />
  </div>
);

export default QuestionPage;
