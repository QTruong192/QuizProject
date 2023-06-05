import React, {useState} from "react";
import "./Question.css";
import { RiCloseLine } from "react-icons/ri";


const QuestionList = ({
  exitQuiz,
  checkAnswer,
  questions,
  currentQuestionIndex,
  selectedAnswer,
  handleAnswerSelection,
  selectedLabelIndex,
  checkButtonColor,
}) => {
 

  const question = questions[currentQuestionIndex];
  const answers = [question.correct_answer, ...question.incorrect_answers];
  
  return (
    <section className="wrap-list-content">
      <div className="btn-close" onClick={exitQuiz}><RiCloseLine/></div>
      <h2>
        Question {currentQuestionIndex + 1}/{questions.length}
      </h2>
      <h3>{question.question}</h3>
      <div className="quiz-list">
      {answers.map((answer, index) => (
        <label key={index} className={`wrap-quiz ${selectedLabelIndex === index ? 'active' : ''}`}>
        <p>{answer}</p>
        <div className="radio-input">
        <input
          type="radio"
          className="value-radio"
          value={answer}
          checked={selectedAnswer === answer}
          onChange={() => handleAnswerSelection(answer, index)}
        />
        <div class="plus1">
    <div class="plus2"></div>

        </div>
  </div>
      </label>
      ))}
      </div>
      <button className={`btn-next ${checkButtonColor}`} onClick={checkAnswer}>
  Next
</button>
    </section>
  );
};

export default QuestionList;
