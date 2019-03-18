import React from 'react';

import './game-over.scss';

const GameOver = ({score, runNewGame}) => {
  return (
    <div className='message'>
      <p>Your score: {score}</p>
      <div
        onClick={() => runNewGame()}>
        <span className='again'>Play again</span>
      </div>
    </div>
  );
};

export default GameOver;