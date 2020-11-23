import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import i18n from 'i18next';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const getBlob = (file) => {
  if (file.data) {
    return new Blob([new Uint8Array(file.data)])
  }

  return new Blob(file);
};

const Presentational = ({ 
  image,
  setFieldValue, 
  value, 
  name,
  error,
}) => {
  const [thumbnail, setThumbnail] = useState();
  const [uploadedFile, setUploadedFile] = useState();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{i18n.t('formPage.clickToUpload')}</div>
    </div>
  );
    
  useEffect(() => {
    if (image) {
      setThumbnail(getBlob(image));
    }
  }, [image]);

  return (
    <>
      <Upload 
        className={classes.UploadThumbnail}
        name={name}
        listType="picture-card"
        showUploadList={false}
        multiple={false}
        accept="image/jpeg,image/jpg,image/png"
        customRequest={({ onSuccess }) => setTimeout(() => { onSuccess('OK') }, 0)}
        onChange={(e) => {
          if (e.file.status === 'done') {
            getBase64(e.file.originFileObj, (imageUrl) => {
              setUploadedFile(e.file);
              setThumbnail(imageUrl);
              setFieldValue(name, e.file);
            });
          }
        }}
        fileList={value ? [value] : []}
      >
        {
          thumbnail 
            ? (
              <img 
                src={uploadedFile ? thumbnail : URL.createObjectURL(thumbnail)}
                alt="profileImage" 
                style={{ width: '100%' }} 
              />
            )
            : uploadButton
        }
      </Upload>
      {
        error
          ? <div className={classes.Error}>{error}</div> 
          : null
      }
    </>
  );
};

Presentational.propTypes = {
  image: PropTypes.shape({}),
  setFieldValue: PropTypes.func.isRequired, 
  value: PropTypes.shape({}), 
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

Presentational.defaultProps = {
  image: undefined,
  value: undefined,
  error: undefined,
};

export default Presentational;
