import React, { Component } from 'react';
import defaultParams from '../params';

export default class Item extends Component{
  state = {
    fired: false
  };

  tooLate = setTimeout(
    () => {
      this.setState({fired: true})
      this.props.targetFired()
    },
    defaultParams.periodForClickMsec
  )

  clearTimeout = () => {
    clearTimeout(this.tooLate)
    return true;
  }

  render() {
    return (
      <div
        className='item'
        onClick={
          () => {
            !this.state.fired
            && this.clearTimeout()
            && this.props.clickHandler(this.props.id)
          }
        }
        />
    )
  }
}