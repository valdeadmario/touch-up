import React, { Component } from 'react';
import { defaultParams } from '../params';

import './item.scss';

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
        className={this.state.fired ? 'item-fired' : 'item'}
        onClick={
          () => {
            !this.state.fired
            && this.clearTimeout()
            && this.props.clickHandler(this.props.id)
          }
        }
        style={ makeTargetStyle({...this.props.coordinate}) }
        />
    )
  }
}

const makeTargetStyle = ({x, y}) => {
  return {
    top: y,
    left: x
  }
}