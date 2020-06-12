import React from 'react';
import Question from '../../components/question/question.component';
import Answer from '../../components/answers/answers.component';

const QuestionPage = (props) => (
  <div className='question'>
    <Question id={props.content.match.params.slug} />
  </div>
);

export default QuestionPage;
