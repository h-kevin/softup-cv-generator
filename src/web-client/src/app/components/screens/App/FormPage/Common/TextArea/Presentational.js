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
}) => (
  <Form.Item
    label={label}
    required={required}
    validateTrigger="onKeyUp"
    validateStatus={error && touched ? 'error' : 'success'}
  >
    <Input.TextArea
      onBlur={(...args) => {
        setFieldTouched(name);
        onChange(...args);
      }}
      name={name}
      placeholder={placeholder} 
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
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  autoSize: PropTypes.bool,
  error: PropTypes.string,
  touched: PropTypes.bool,
  setFieldTouched: PropTypes.func.isRequired,
};

Presentational.defaultProps = {
  label: undefined,
  required: false,
  placeholder: '',
  autoSize: false,
  touched: false,
  error: undefined,
};

export default Presentational;
