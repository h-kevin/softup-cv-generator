import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import i18n from 'i18next';
import PropTypes from 'prop-types';

import classes from './Styles.module.scss';
import { colors } from '../../../../../../styles/abstracts/variables';

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
    
  useEffect(() => {
    if (image) {
      setThumbnail(getBlob(image));
    }
  }, [image]);

  let thumbnailClass = classes.UploadThumbnailDefault;

  if (error) {
    thumbnailClass = classes.UploadThumbnailWithError;
  }

  return (
    <>
      <Upload 
        className={thumbnailClass}
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
        <div
          className={classes.UploadButton} 
          style={
            thumbnail 
              ? { 
                backgroundImage: uploadedFile 
                  ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                    url(${thumbnail})`
                  : `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                    url(${URL.createObjectURL(thumbnail)})`,
              }
              : { 
                background: '',
                color: colors.washedBlack,
              }
          }
        >
          <PlusCircleFilled className={classes.Icon} />
          <div style={{ marginTop: 8 }}>{i18n.t('formPage.clickToUpload')}</div>
        </div>
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
