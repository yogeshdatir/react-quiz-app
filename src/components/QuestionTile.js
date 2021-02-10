import React from "react";
import '../styles/style.css'

const QuestionTile = ({questionObj, changeQuestion, addAnswer, toggleResultView}) => {

  return (
    <div className="container">
      <div className="questionBody">
      <h1>Question Tile</h1>
      <h5>{questionObj.question}</h5>
        {questionObj.choices.map((choice, index) => <div key={index} >
          <input 
            id={index}
            type="radio" 
            name="choicesRadios"
            onClick={addAnswer} 
            value={choice}
          />
          <label htmlFor={index}>{choice}</label>
          </div>)}
      <button name="prevquestion" onClick={changeQuestion}>Prev</button>
      <button name="nextquestion" onClick={changeQuestion}>Next</button>
      <button name="submitTest" onClick={toggleResultView}>Submit Quiz</button>
      </div>
    </div>
  );
};

export default QuestionTile;
