import React, { Component } from 'react'
import Router from './Router'

type PropsType = {}
type StateType = { count: number }
class AppContainer extends Component<PropsType, StateType> {
  state = {
    count: 0,
  }

  countUp() {
    this.setState({ count: ++this.state.count })
  }

  render() {
    return <Router count={this.state.count} countUp={() => this.countUp()} />
  }
}

export default AppContainer
