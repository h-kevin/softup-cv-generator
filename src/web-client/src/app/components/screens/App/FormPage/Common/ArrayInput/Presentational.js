import React, { useState } from 'react';
import { Tag, Input, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import i18n from 'i18next';
import PropTypes from 'prop-types';

import TweenOneGroup from '../TweenOneGroup/Presentational';
import classes from './Styles.module.scss';

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
      className={classes.Tags}
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
  label,
}) => {
  const [tagsInputValue, setTagsInputValue] = useState('');
  const [showArrayInput, setShowArrayInput] = useState(false);

  return (
    <Form.Item
      className={classes.TagsFormItem}
      colon={false}
      label={label}
    >
      <TweenOneGroup 
        styles={classes.TagsContainer} 
        array={generateTags(array, setArray)} 
      />
      <div className={classes.AddTagContainer}>
        {showArrayInput && (
          <Input
            className={classes.AddTagInput}
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
            className={classes.AddTagButton}
            onClick={() => setShowArrayInput(true)} 
          >
            <PlusOutlined /> 
            {i18n.t('formPage.newItem')}
          </Tag>
        )}
      </div>
    </Form.Item>
  );
};

Presentational.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired, 
  setArray: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Presentational;
