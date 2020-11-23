import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const Presentational = ({ children, title }) => (
  <Card className={classes.Card} title={title}>
    { children }
  </Card>
);

Presentational.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Presentational;
