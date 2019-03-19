import React from 'react';

import './panel.scss';

const Panel = ({life, score}) => {
  return (
    <div className='panel'>
          Lives: ${life} Score: ${score}
    </div>
  );
};

export default Panel;