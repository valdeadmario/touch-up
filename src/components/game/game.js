import React, { Component } from 'react';
import { defaultParams } from "../params";
import Item from "../item/item";


let gameParams = {...defaultParams}

const initialGameState = () => ({
  targets: [],
  probability: defaultParams.probability,
  life: defaultParams.lifes + 1,
  score:0
});

export default class Game extends Component{
  state = {
    ...initialGameState(),
    start: false
  };

  targetGenerate = ({probability, periodMsec}) => {
    return setInterval(() => {
      if (Math.random() * 100 <= probability) {
        const x = Math.random() * (gameParams.fieldWidth - gameParams.targetWidth)
        const y = Math.random() * (gameParams.fieldHeight - gameParams.targetHeight)
        this.setState({
          targets: [
            ...this.state.targets,
            <Item
              id = {this.state.targetsCnt}
              key = {this.state.targetsCnt}
              coordinate = {{x, y}}
              clickHandler = {this.clickTarget}
              targetFired = {this.targetFired}
            />
          ],
          targetsCnt: ++this.state.targetsCnt
        })
      }
    }, periodMsec)
  }

  clickTarget = (id) => {
    this.setState(({ targets }) => {
      const idx = targets.findIndex((item) => item.id === id);

      const newArr = [
        ...targets.slice(0,idx),
        ...targets.slice(idx+1)
      ];
      return {
        targets: newArr
      }
    });
  };

  targetFired = () => {
    const life = this.state.life > 0
      ? this.state.life - 1
      : 0
    this.setState({life: life})
  }
}