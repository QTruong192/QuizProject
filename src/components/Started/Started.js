import React from 'react';
import { GiLaurelCrown } from "react-icons/gi";
import './Started.css'

const Started = ({ startQuiz }) => {
  return (
    <section className='wrap-started-content'>
      <span><GiLaurelCrown/></span>
      <button className='btn-start' onClick={startQuiz}>Start Quiz!</button>
    </section>
  );
};

export default Started;
