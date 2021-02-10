import React, { useEffect, useState } from "react"
import axios from "axios"
import QuestionTile from './components/QuestionTile'
import './App.css';
import { Result } from "./components/Result";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answersByUser, setAnswersByUser] = useState([])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    (async () => {
      await axios
        .get("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
        .then((loadedQuestions) => {
          const ques = loadedQuestions.data.results.map((loadedQuestion) => {
            // adding answer at random index in choices array
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
    console.log("ci", currentQuestionIndex)
    switch (action) {
      case "prevquestion":
        if (currentQuestionIndex > 0)
          setCurrentQuestionIndex(currentQuestionIndex - 1)
        break;
      case "nextquestion":
        if (currentQuestionIndex >= questions.length - 1)
          toggleResultView()
        else if (currentQuestionIndex < questions.length - 1)
          setCurrentQuestionIndex(currentQuestionIndex + 1)
        break;
      default:
        break;
    }
  }

  // this function adds user-selected answer into the state array
  const addAnswer = (e) => {
    let answer = e.target.value
    let newAnswersByUser = [...answersByUser]
    newAnswersByUser[currentQuestionIndex] = answer
    setAnswersByUser([...newAnswersByUser])
    if (questions[currentQuestionIndex].correct_answer === answer) {
      console.log("correct")
    } else {
      console.log("incorrect")
    }
  }

  // this function calculates score and toggle result component render state
  const toggleResultView = () => {
    questions.forEach((question, index) => {
      if(question.correct_answer === answersByUser[index])
        setScore(score+1)
    });
    showResult === false ? setShowResult(true) : setShowResult(false)
  }

  console.log(score)

  return (
    <div className="App">
      {showResult ?
        (<Result score={score} toggleResultView={toggleResultView}></Result>)
      : (questions.length !== 0 ?
        <QuestionTile questionObj={questions[currentQuestionIndex]} changeQuestion={changeQuestion} addAnswer={addAnswer} toggleResultView={toggleResultView}/>
        : null)
      }
    </div>
  );
}

export default App;
