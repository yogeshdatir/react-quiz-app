import React, { useEffect, useState } from "react"
import axios from "axios"
import QuestionTile from './components/QuestionTile'
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    (async () => {
      await axios
        .get("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
        .then((loadedQuestions) => {
          const ques = loadedQuestions.data.results.map((loadedQuestion) => {
            const choices = [...loadedQuestion.incorrect_answers];
            choices.splice(Math.floor(Math.random() * 4), 0, loadedQuestion.correct_answer);
            const formattedQuestion = {
              question: loadedQuestion.question,
              choices: choices,
              correct_answer: loadedQuestion.correct_answer
            };
            return formattedQuestion;
          });
          setQuestions([...ques]);
        })
        .catch((error) => console.log(error));
    })();
  }, []);

  const changeQuestion = (e) => {
    let action = e.target.name
    switch (action) {
      case "prevquestion":
        if (currentQuestionIndex > 0)
          setCurrentQuestionIndex(currentQuestionIndex - 1)
        break;
      case "nextquestion":
        if (currentQuestionIndex < questions.length)
          setCurrentQuestionIndex(currentQuestionIndex + 1)
        break;
      default:
        break;
    }
  }

  const checkAnswer = (e) => {
    let answer = e.target.name
    if (questions[currentQuestionIndex].correct_answer === answer) {
      console.log("correct")
    } else {
      console.log("incorrect")
    }
  }

  return (
    <div className="App">
      {questions.length !== 0 ? <QuestionTile questionObj={questions[currentQuestionIndex]} changeQuestion={changeQuestion} checkAnswer={checkAnswer}/>
        : null}
    </div>
  );
}

export default App;
