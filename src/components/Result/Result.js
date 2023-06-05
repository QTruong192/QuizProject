import React from "react";
import './Result.css'
import { GiRibbonMedal } from "react-icons/gi";
import { TbRefresh } from "react-icons/tb";

const Result = ({ questions, exitQuiz, numCorrectAnswers, status ,endTime ,startTime}) => {
  const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);

  return (
    <section className="wrap-result-content">
      <div className="wrap-item">
      <h1>{status ? <GiRibbonMedal/> : <TbRefresh/>}</h1>
      <h2>{status ? "Congratulatios!!" : "Completed!"}</h2>
      <p>
      {status ? "You are amazing!!" : "Better luck next time!"}
        
      </p>
      <p>{numCorrectAnswers}/{questions.length} correct answers in {elapsedTimeInSeconds} seconds.</p>
      <button className="btn-again" onClick={exitQuiz}>Play Again</button>
      </div>
    </section>
  );
};

export default Result;
