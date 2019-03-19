import React from 'react';

import './panel.scss';

const Panel = ({life, score}) => {
  return (
    <div className='panel'>
      <i className='fas fa-heart'></i> {life} <i className='fas fa-star'></i> {score}
    </div>
  );
};

export default Panel;