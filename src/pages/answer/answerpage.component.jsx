import React from 'react';
import AnswerForm from '../../components/answers/AnswerForm';

const AnswerPage = (props) => (
  <div className='question'>
    <AnswerForm aprops = {props} answer_id={props.content.match.params.slug} question_id = {7}/>
  </div>
);

export default AnswerPage;