// @flow
import React from 'react'
import { Form } from 'react-form'
import IconButton from 'material-ui/IconButton'
import DoneIcon from 'material-ui-icons/Done'
import UndoIcon from 'material-ui-icons/Undo'
import TextField from '../../components/atoms/text_field'
import type { QuizDataType } from '../../types'

type PropsType = { quiz: ?QuizDataType, saveQuiz: (quiz: QuizDataType) => void }

export default ({ quiz, saveQuiz }: PropsType) => {
  return (
    <Form defaultValues={quiz} onSubmit={saveQuiz}>
      {({ values, setValue, submitForm, resetForm, removeValue, addValue }) => (
        <div>
          <IconButton aria-label="Done" color="primary" onClick={submitForm}>
            <DoneIcon />
          </IconButton>
          <IconButton aria-label="Clear" onClick={resetForm}>
            <UndoIcon />
          </IconButton>
          <br/>
          <TextField field="quizTitle" label="クイズタイトル" />

          <div>
            {!values.quizContents ? (
              <em>クイズを追加してください</em>
            ) : values.quizContents.map((quizContents, i) => (
              <div key={i}>
                <TextField field={`quizContents.${i}.qText`} label="問題" />
                {['a', 'b', 'c', 'd'].map(choice => (
                  <TextField field={`quizContents.${i}.${choice}`} label={choice} key={choice} />
                ))}
                <TextField field={`quizContents.${i}.answerChoice`} label="答え" />

                <button type='button' onClick={() => removeValue('quizContents', i)} >
                  クイズを削除
                </button>

              </div>
            ))}
          </div>

          <div>
            <button type='button' onClick={() => addValue('quizContents', {})} >
              クイズを追加
            </button>
          </div>

        </div>
      )}
    </Form>
  )
}
