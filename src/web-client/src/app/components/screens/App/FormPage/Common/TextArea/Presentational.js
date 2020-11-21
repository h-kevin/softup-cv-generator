import React from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const Presentational = ({ 
  name,
  label,
  required,
  placeholder,
  autoSize,
  error,
  setFieldTouched,
  setFieldValue,
  value,
  style,
  help,
}) => (
  <Form.Item
    label={label}
    required={required}
    validateStatus={error ? 'error' : ''}
    help={help}
    style={style}
  >
    <Input.TextArea
      onChange={(e) => {
        setFieldTouched(name);
        setFieldValue(name, e.target.value);
      }}
      name={name}
      placeholder={placeholder} 
      value={value}
      autoSize={autoSize}
      style={{
        resize: 'none',
      }}
    />
    {
      error
        ? <div className={classes.Error}>{error}</div> 
        : null
    }
  </Form.Item>
);

Presentational.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  autoSize: PropTypes.bool,
  error: PropTypes.string,
  setFieldTouched: PropTypes.func.isRequired,
  style: PropTypes.shape({}),
  help: PropTypes.string,
};

Presentational.defaultProps = {
  value: '',
  label: undefined,
  required: false,
  placeholder: '',
  autoSize: false,
  error: undefined,
  style: undefined,
  help: undefined,
};

export default Presentational;
