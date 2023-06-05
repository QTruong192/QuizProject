import React, { useState, useEffect } from "react";
import Started from "./components/Started/Started";
import Loading from "./components/Loading/Loading";
import Result from "./components/Result/Result";
import QuestionList from "./components/QuestionList/QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passingCriteria = 5; // Số câu hỏi đúng để qua
  const quizPassed = numCorrectAnswers >= passingCriteria;
  const [selectedLabelIndex, setSelectedLabelIndex] = useState(null);
  const [checkButtonColor, setCheckButtonColor] = useState("default");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  //fetch Api
  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();
      setQuestions(data.results);
      setStartTime(Date.now());
    } catch (error) {
      console.log("API bị lỗi rồi xin kiểm tra lại xem:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (quizStarted) {
      fetchQuestions();
    }
  }, [quizStarted]);

  //xử lý bắt đầu
  const startQuiz = () => {
    setQuizStarted(true);
  };
  //xử lý nút thoát
  const exitQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setNumCorrectAnswers(0);
    setSelectedAnswer(null);
    setQuestions([]);
  };
  // xử lý khi bấm câu hỏi tiếp theo
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };
  //xử lý khi chọn câu hỏi
  const handleAnswerSelection = (answer, index) => {
    setSelectedAnswer(answer);
    setSelectedLabelIndex(index);
    setCheckButtonColor("active");
  };
  // kiểm tra câu hỏi
  const checkAnswer = () => {
    if (selectedAnswer === null) {
      return; // Không cho phép bấm nút nếu không chọn câu trả lời
    }
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setNumCorrectAnswers((prevNum) => prevNum + 1);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setEndTime(Date.now());
      setQuizCompleted(true);
    }
    goToNextQuestion();
    setSelectedLabelIndex(null);
    setCheckButtonColor("");
  };

  return (
    <>
      {!quizStarted ? (
        <Started startQuiz={startQuiz} />
      ) : isLoading ? (
        <Loading />
      ) : !quizCompleted ? (
        questions[currentQuestionIndex] && (
          <QuestionList
            exitQuiz={exitQuiz}
            checkAnswer={checkAnswer}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            handleAnswerSelection={handleAnswerSelection}
            selectedLabelIndex={selectedLabelIndex}
            checkButtonColor={checkButtonColor}
          />
        )
      ) : (
        <Result
          questions={questions}
          numCorrectAnswers={numCorrectAnswers}
          exitQuiz={exitQuiz}
          status={quizPassed}
          endTime={endTime}
          startTime={startTime}
        />
      )}
    </>
  );
}

export default App;
