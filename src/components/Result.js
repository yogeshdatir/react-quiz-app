import React from 'react'
import '../styles/style.css'

export const Result = ({score, toggleResultView}) => {
  return (
    <div className="container">
      <div className="resultBody">
        <div>
          <p>Your score is {score}</p>
          <button name="StartTestAgain" onClick={toggleResultView}>Start new quiz...</button>
        </div>
      </div>
    </div>
  )
}
