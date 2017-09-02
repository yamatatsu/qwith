import React from 'react'
import _map from 'lodash/map'

export default ({ eventKey, event, startQuiz }) => (
  <div>
    <h1>{event.eventTitle}</h1>
    {_map(event.quizes, (quiz, quizKey) => (
      <div key={quizKey}>
        <button onClick={() => startQuiz(quizKey)}>{quiz.quizTitle}を始める</button>
      </div>
    ))}
  </div>
)
