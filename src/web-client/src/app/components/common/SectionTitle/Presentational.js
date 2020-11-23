/*eslint-disable*/

import React from 'react';
import * as Icon from '@ant-design/icons';

import classes from './Styles.module.scss';

const Presentational = ({
  iconName,
  title,
}) => {
  const SelectedIcon = Icon[iconName];

  return (
    <div className={classes.TitleContainer}>
      <SelectedIcon className={classes.Icon} />
      {title}
    </div>
  );
}

export default Presentational;
