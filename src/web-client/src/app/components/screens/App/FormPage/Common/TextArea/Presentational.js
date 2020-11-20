/* eslint-disable */
import React from 'react';
import { Form, Input } from 'antd';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const Presentational = ({ 
  onChange,
  name,
  label,
  required,
  placeholder,
  autoSize,
  error,
  touched,
  setFieldTouched,
  value,
  style,
  help,
}) => (
  <Form.Item
    label={label}
    required={required}
    validateTrigger="onKeyUp"
    validateStatus={error && touched ? 'error' : 'success'}
    help={help}
    style={style}
  >
    <Input.TextArea
      onBlur={(...args) => {
        setFieldTouched(name);
        onChange(...args);
      }}
      name={name}
      placeholder={placeholder} 
      defaultValue={value}
      autoSize={autoSize}
      style={{
        resize: 'none',
      }}
    />
    {error && touched
      ? (
        <ErrorMessage 
          name={name} 
          render={() => (
            <div className={classes.Error}>{error}</div> 
          )} 
        />
      ) : null}
  </Form.Item>
);

Presentational.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  autoSize: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.bool,
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
  touched: false,
  error: undefined,
  style: undefined,
  help: undefined,
};

export default Presentational;
