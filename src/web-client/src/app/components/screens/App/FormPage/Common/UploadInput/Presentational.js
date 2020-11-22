/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import i18n from 'i18next';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';

// const getBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// };
const getBlob = (file) => {
  if (file.data) {
    return new Blob([new Uint8Array(file.data)])
  }

  return new Blob(file);
};
// const handlePreview = async (file) => {
//   return getbl
// };

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
      setThumbnail(getBlob(image));
    }
  }, [image]);

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
          console.log(getBlob(e.file));
          setThumbnail(e.file);
        }

        setFieldValue(name, e.file);
      }}
      fileList={value ? [value] : []}
    >
      {
        thumbnail 
          ? <img 
              src={URL.createObjectURL(thumbnail)}
              alt="profileImage" style={{ width: '100%' }} 
            />
          : uploadButton
      }
    </Upload>
  );
};

Presentational.propTypes = {
  image: PropTypes.shape({}),
  setFieldValue: PropTypes.func.isRequired, 
  value: PropTypes.shape({}).isRequired, 
  name: PropTypes.string.isRequired,
};

Presentational.defaultProps = {
  image: undefined,
};

export default Presentational;
