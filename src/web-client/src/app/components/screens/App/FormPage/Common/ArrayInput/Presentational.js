import React, { useState } from 'react';
import { Tag } from 'antd';
import { Input } from 'formik-antd';
import { PlusOutlined } from '@ant-design/icons';
import i18n from 'i18next';
import PropTypes from 'prop-types';

import TweenOneGroup from '../TweenOneGroup/Presentational';

const onTagRemove = (oldTags, removedTag) => oldTags.filter((tag) => tag !== removedTag);
const onTagsInputConfirm = (
  tagsInputValue, 
  tagsSet, 
  setTagsInputValue, 
  setTagsSet,
  setShowTagsInput,
) => {
  if (tagsInputValue && !tagsSet.includes(tagsInputValue)) {
    tagsSet = [...tagsSet, tagsInputValue];
  }
  setTagsInputValue('');
  setTagsSet(tagsSet);
  setShowTagsInput(false);
};
const generateTags = (set, updateSet) => set.map((tag) => {
  const tagElem = (
    <Tag
      closable
      onClose={(e) => {
        e.preventDefault();
        updateSet(onTagRemove(set, tag));
      }}
    >
      {tag}
    </Tag>
  );
  
  return (
    <span key={tag} style={{ display: 'inline-block' }}>
      {tagElem}
    </span>
  );
});

const Presentational = ({
  array, 
  setArray,
  name,
}) => {
  const [tagsInputValue, setTagsInputValue] = useState('');
  const [showArrayInput, setShowArrayInput] = useState(false);

  return (
    <>
      <TweenOneGroup array={generateTags(array, setArray)} />
      {showArrayInput && (
        <Input
          name={name}
          type="text"
          size="small"
          style={{ width: 82 }}
          value={tagsInputValue}
          onChange={(e) => setTagsInputValue(e.target.value)}
          onMouseOver={(e) => e.target.focus()}
          onBlur={() => onTagsInputConfirm(
            tagsInputValue, 
            array, 
            setTagsInputValue, 
            setArray,
            setShowArrayInput,
          )}
          onPressEnter={() => onTagsInputConfirm(
            tagsInputValue, 
            array, 
            setTagsInputValue, 
            setArray,
            setShowArrayInput,
          )}
        />
      )}
      {!showArrayInput && (
        <Tag 
          onClick={() => setShowArrayInput(true)} 
          className="site-tag-plus"
        >
          <PlusOutlined /> 
          {i18n.t('formPage.newItem')}
        </Tag>
      )}
    </>
  );
};

Presentational.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired, 
  setArray: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Presentational;
