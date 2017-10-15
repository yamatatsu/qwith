// @flow
import React, { Component } from 'react'
import type { ComponentType } from 'react'

import { observeQuizes } from '../../infrastructure/database'

import type { OwnerKeyType, QuizesDataType } from '../../types'

type PropsType = { ownerKey: OwnerKeyType }
type StateType = { quizes: ?QuizesDataType | 'not_feached' }

export default (WrappedComponent: ComponentType<*>): ComponentType<*> => {
  return class QuizesObserver extends Component<PropsType, StateType> {
    state = {
      quizes: 'not_feached',
    }
    remove = null

    componentDidMount() {
      const { ownerKey } = this.props
      this.remove = observeQuizes(ownerKey, (quizes) => {
        this.setState({ ...this.state, quizes })
      })
    }
    componentWillUnmount () {
      this.remove && this.remove()
    }


    render() {
      const { quizes } = this.state

      if (quizes === 'not_feached') return <div>データ取得中</div> // TODO: くるくる

      return <WrappedComponent {...this.props} {...{ quizes }} />
    }
  }
}
