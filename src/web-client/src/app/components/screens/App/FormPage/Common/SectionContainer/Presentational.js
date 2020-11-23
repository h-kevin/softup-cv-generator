import React from 'react';
import { Card } from 'antd';
import PropTypes from 'prop-types';

const Presentational = ({ children, title }) => (
  <Card title={title}>
    { children }
  </Card>
);

Presentational.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Presentational;
