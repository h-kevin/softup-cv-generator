import React from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';

import classes from './Styles.module.scss';

const Presentational = ({ 
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
}) => {
  const DatePicker = generatePicker(dateFnsGenerateConfig);
  return (
    <>
      <Form.Item
        className={classes.FormItem}
        label={label}
        required={required}
        colon={false}
        validateStatus={error ? 'error' : ''}
        hasFeedback={hasFeedback}
        style={style}
        help={help}
      >
        <DatePicker
          className={classes.DatePicker}
          onChange={(date) => {
            setFieldTouched(name);
            setFieldValue(name, date);
          }}
          value={value || null}
          name={name} 
          placeholder={placeholder} 
          onKeyPress={(e) => {
            if (e.key === 'Enter') e.preventDefault();
          }}
        />
      </Form.Item>
      {
        error
          ? <div className={classes.Error}>{error}</div> 
          : null
      }
    </>
  );
};

Presentational.propTypes = {
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.shape({}),
  label: PropTypes.string,
  required: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  style: PropTypes.shape({}),
  help: PropTypes.string,
};

Presentational.defaultProps = {
  value: undefined,
  label: '',
  required: false,
  hasFeedback: false,
  placeholder: undefined,
  error: undefined,
  style: undefined,
  help: undefined,
};

export default Presentational;
