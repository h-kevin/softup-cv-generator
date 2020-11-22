/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import i18n from 'i18next';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const Presentational = ({ 
  image,
  setFieldValue, 
  value, 
  name,
}) => {
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{i18n.t('formPage.clickToUpload')}</div>
    </div>
  );
    
  useEffect(() => {
    if (image) {
      setThumbnail(image);
      console.log(image);
    }
  }, [image])

  return (
    <Upload 
      className={classes.UploadThumbnail}
      name={name}
      listType="picture-card"
      showUploadList={false}
      multiple={false}
      accept="image/jpeg,image/jpg,image/png"
      customRequest={({ onSuccess }) => setTimeout(() => { onSuccess('OK') }, 0)}
      onChange={(e) => {
        if (e.file.status === 'uploading') {
          setLoading(true)
        }

        if (e.file.status === 'done') {
          getBase64(
            e.file.originFileObj, 
            (image) => setThumbnail(image)
          );

          setThumbnail(image)
        }

        setFieldValue(name, e.file);
      }}
      fileList={value ? [value] : []}
    >
      {
        thumbnail 
          ? <img 
              src={`data:image/jpeg;base64, ${thumbnail}`} 
              alt="avatar" style={{ width: '100%' }} 
            />
          : uploadButton
      }
    </Upload>
  );
};

Presentational.propTypes = {
  image: PropTypes.string,
  setFieldValue: PropTypes.func.isRequired, 
  value: PropTypes.string.isRequired, 
  name: PropTypes.string.isRequired,
};

Presentational.defaultProps = {
  image: undefined,
};

export default Presentational;
