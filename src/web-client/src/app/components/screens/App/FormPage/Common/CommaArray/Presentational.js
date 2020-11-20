import React from 'react';
import { Form, Input } from 'antd';
import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const Presentational = ({ 
  onChange,
  touched,
  name,
  label,
  required,
  hasFeedback,
  placeholder,
  error,
  setFieldTouched,
  setFieldValue,
  value,
  style,
  help,
}) => (
  <>
    <Form.Item
      label={label}
      required={required}
      validateTrigger="onBlur"
      validateStatus={error && touched ? 'error' : 'success'}
      hasFeedback={touched && hasFeedback}
      style={style}
      help={help}
    >
      <Input 
        onBlur={(...args) => {
          setFieldTouched(name);
          onChange(...args);
          setFieldValue(
            name,
            args[0].target.value
              .replace(/ +/g, ' ')
              .split(/\s*,\s*/)
              .filter((item) => item),
          );
        }}
        defaultValue={value}
        name={name} 
        placeholder={placeholder} 
        onKeyPress={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      />
    </Form.Item>
    {error && touched
      ? (
        <ErrorMessage 
          name={name} 
          render={() => (
            <div className={classes.Error}>{error}</div> 
          )} 
        />
      ) : null}
  </>
);

Presentational.propTypes = {
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  style: PropTypes.shape({}),
  help: PropTypes.string,
};

Presentational.defaultProps = {
  value: '',
  label: '',
  required: false,
  hasFeedback: false,
  placeholder: undefined,
  error: undefined,
  touched: false,
  style: undefined,
  help: undefined,
};

export default Presentational;
