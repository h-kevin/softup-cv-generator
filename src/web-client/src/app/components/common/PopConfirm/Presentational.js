import React from 'react';
import { Popconfirm } from 'antd';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const Presentational = ({
  placement,
  disabled,
  children,
  title,
  okText,
  cancelText,
  onConfirm,
}) => {
  const commonProps = {
    placement,
    disabled,
    title,
    okText,
    cancelText,
    onConfirm,
  };

  return (
    <Popconfirm overlayClassName={classes.PopConfirm} {...commonProps}>
      {children}
    </Popconfirm>
  );
};

Presentational.propTypes = {
  placement: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  okText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Presentational.defaultProps = {
  placement: 'topLeft',
  disabled: false,
};

export default Presentational;
