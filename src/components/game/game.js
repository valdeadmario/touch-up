import React, { Component } from 'react';
import { defaultParams } from "../params";

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
  }

}