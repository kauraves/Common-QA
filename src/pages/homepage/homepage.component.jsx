//TODO:
//Show name of the poster and time of the post
//Chosen / Most upvoted answer.
//The number of answers

import React from 'react';
import Table from 'react-bootstrap/Table';
import QuestionSummary from '../../components/question-summary/question-summary.component';
import Votes from '../../components/votes/votes.component';
import './homepage.styles.css';

const HomePage = () => (
  <div className='homepage'>
    <QuestionSummary />
  </div>
);

export default HomePage;
