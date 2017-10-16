// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'
import { getQuizesDb } from '../../infrastructure/database'

import type { OwnerKeyType, QuizesDataType } from '../../types'

type PropsType = { ownerKey: OwnerKeyType }
type StateType = { quizes: ?QuizesDataType | 'not_feached' }

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class QuizesObserver extends Component<PropsType, StateType> {
    state = { quizes: 'not_feached' }
    db = null

    componentWillMount() {
      this.db = getQuizesDb(this.props.ownerKey)

      this.db.subscribe((quizes) => {
        this.setState({ ...this.state, quizes })
      })
    }
    componentWillUnmount () {
      this.db && this.db.unsubscribe()
    }

    render() {
      const { quizes } = this.state

      if (quizes === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ quizes }} />
    }
  }
}
