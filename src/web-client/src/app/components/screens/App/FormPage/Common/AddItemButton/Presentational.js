import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const Presentational = ({ arrayHelpers, title }) => (
  <Button
    className={classes.AddButton}
    onClick={() => arrayHelpers.push({})}
  >
    <PlusOutlined /> 
    {title}
  </Button>
);

Presentational.propTypes = {
  arrayHelpers: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default Presentational;
