import React, { Component } from 'react';

import { defaultParams } from "../params";

import Item from "../item/item";
import GameOver from "../game-over";

import './game.scss';
import Panel from "../panel";


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

  runNewGame = () => {
    this.setState({ ...initialGameState(), gameover: false, start: true, targetsCnt: 0})
    this.makeGameFlow(this.gameOptions())
  }

  gameOptions = () => ({
    probability: this.state.probability,
    periodMsec: gameParams.periodMsec,
  })

  makeGameFlow = (options) => {
    if (this.state.life === 0) {
      gameParams = {...defaultParams};
      this.setState({...initialGameState(), gameover: true, lastscore: this.state.score})
      return false
    }
    let gameIterator = this.targetGenerate(options)
    setTimeout(
      () => {
        clearInterval(gameIterator)
        options.periodMsec -= gameParams.difficultStepMsec
        options.probability += gameParams.difficultStepProbability
        this.makeGameFlow(options, this)
      },
      gameParams.difficultIntervalMsec
    )
  }

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
  };

  clickTarget = (id) => {
    this.setState(({ targets }) => {
      const idx = targets.findIndex((item) => item.props.id === id);

      const newArr = [
        ...targets.slice(0,idx),
        ...targets.slice(idx+1)
      ];
      return {
        score: ++this.state.score,
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

  render() {
    let message;
    if (this.state.gameover === true) {
      message = <GameOver
                  score={this.state.lastscore}
                  runNewGame={this.runNewGame}/>

    }else if ( this.state.start === false){
      message = (
        <div
          className='message'
          onClick={() => this.runNewGame()}
        >
          <span style={{cursor: 'pointer'}}>New Game:)</span>
        </div>)
    }

    return (
        <div className='game-wrapper'>
          <Panel life={this.state.life}
                 score={this.state.score}/>
          <div className="game-field" >
            {message}
            { this.state.targets }
          </div>
        </div>
    )
  }
}