import React from 'react';
import { TweenOneGroup } from 'rc-tween-one';
import PropTypes from 'prop-types';

const Presentational = ({ array }) => (
  <div>
    <TweenOneGroup
      enter={{
        scale: 0.8,
        opacity: 0,
        type: 'from',
        duration: 100,
        onComplete: (e) => {
          e.target.style = '';
        },
      }}
      leave={{ 
        opacity: 0, 
        width: 0, 
        scale: 0, 
        duration: 200,
      }}
      appear={false}
    >
      {array}
    </TweenOneGroup>
  </div>
);

Presentational.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.node,
  ).isRequired,
};

export default Presentational;
