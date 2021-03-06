// @flow
import React from 'react'
import { Form } from 'react-form'
import IconButton from 'material-ui/IconButton'
import DoneIcon from 'material-ui-icons/Done'
import UndoIcon from 'material-ui-icons/Undo'
import TextField from '../../components/atoms/text_field'
import RadioField from '../../components/atoms/radio_field'
import type { QuizDataType } from '../../types'

type PropsType = { quiz?: ?QuizDataType, saveQuiz: (quiz: QuizDataType) => void }

export default ({ quiz, saveQuiz }: PropsType) => {
  return (
    <Form
      defaultValues={quiz || { quizTitle: '' }}
      onSubmit={saveQuiz}
      validate={({ quizTitle, quizContents }) => ({
        quizTitle: !quizTitle ? 'クイズタイトルを入力してください。' : undefined,
        quizContents: !quizContents ? 'クイズを追加してください。' : undefined,
      })}
    >
      {({ values, setValue, submitForm, resetForm, removeValue, addValue, getError }) => (
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
            {getError('quizContents') && <em>{getError('quizContents')}</em>}
            {values.quizContents && values.quizContents.map((quizContents, i) => (
              <div key={i}>
                <TextField field={`quizContents.${i}.qText`} label="問題" />
                {['a', 'b', 'c', 'd'].map(choice => (
                  <TextField field={`quizContents.${i}.${choice}`} label={choice} key={choice} />
                ))}
                <RadioField field={`quizContents.${i}.correctChoice`} label="答え" choices={['a', 'b', 'c', 'd']} />

                <button type='button' onClick={() => removeValue('quizContents', i)} >
                  クイズを削除
                </button>

              </div>
            ))}
          </div>

          <div>
            <button
              type='button'
              onClick={() => addValue('quizContents', { qText: '', a: '', b: '', c: '', d: '', correctChoice: '' })}
            >
              クイズを追加
            </button>
          </div>

        </div>
      )}
    </Form>
  )
}
