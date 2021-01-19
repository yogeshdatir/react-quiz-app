import React from "react";

const QuestionTile = ({questionObj, changeQuestion, checkAnswer}) => {

  return (
    <div>
      <h1>Question Tile</h1>
      <h5>{questionObj.question}</h5>
      <ol>
        {questionObj.choices.map((choice, index) => <li key={index}><button name={choice} onClick={checkAnswer}>{choice}</button></li>)}
      </ol>
      <button name="prevquestion" onClick={changeQuestion}>Prev</button>
      <button name="nextquestion" onClick={changeQuestion}>Next</button>
    </div>
  );
};

export default QuestionTile;
