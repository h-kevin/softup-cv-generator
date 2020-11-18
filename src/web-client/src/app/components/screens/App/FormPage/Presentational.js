import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Tag } from 'antd';
import { FormItem, Form, Input } from 'formik-antd';
import { PlusOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import i18n from 'i18next';

import TweenOneGroup from './Common/TweenOneGroup/Presentational';
import classes from './Styles.module.scss';

const initialValues = {
  firstName: '',
  lastName: '',
  role: '',
  summary: '',
  skills: {
    languages: [],
    databases: [],
    backendFrameworks: [],
    frontendFrameworks: [],
    operationsAndInfrastructure: [],
    integrationAndDeployment: [],
    testing: [],
    thirdParty: [],
    agile: [],
    other: [],
  },
  spokenLanguages: [],
  projects: [],
  education: [],
  profileImage: '',
};
const validation = () => Yup.object().shape({
  firstName: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  lastName: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  role: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  summary: Yup
    .string()
    .required(i18n.t('formPage.fieldIsRequired')),
  skills: Yup
    .object()
    .shape({
      languages: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      databases: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      backendFrameworks: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      frontendFrameworks: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      operationsAndInfrastructure: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      integrationAndDeployment: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      testing: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      thirdParty: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      agile: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
      other: Yup
        .array()
        .of(
          Yup
            .string()
            .required(),
        ),
    })
    .required(),
  spokenLanguages: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          language: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          level: Yup
            .string()
            .required(),
        }),
    )
    .required(),
  projects: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          period: Yup
            .object()
            .shape({
              startDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
                .required(i18n.t('formPage.fieldIsRequired')),
              endDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
            })
            .required(),
          client: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          position: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          technologies: Yup
            .array()
            .of(
              Yup
                .string()
                .required(),
            ),
          responsibilities: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
        }),
    )
    .required(),
  education: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          institution: Yup
            .string()
            .required(i18n.t('formPage.fieldIsRequired')),
          qualifications: Yup
            .array()
            .of(
              Yup
                .string()
                .required(),
            ),
          period: Yup
            .object()
            .shape({
              startDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
                .required(i18n.t('formPage.fieldIsRequired')),
              endDate: Yup
                .string()
                .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
            })
            .required(),
        }),
    )
    .required(),
});
// const onSubmit = async () => {
  
// };
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

const Presentational = () => {
  const [tagsInputValue, setTagsInputValue] = useState('');
  const [showLanguagesInput, setShowLanguagesInput] = useState(false);
  const [showDatabasesInput, setShowDatabasesInput] = useState(false);
  const [languages, setLanguages] = useState([
    'JavaScript',
    'Python',
    'Java',
  ]);
  const [databases, setDatabases] = useState([
    'MongoDB',
    'MySQL',
    'PostgreSQL',
  ]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
    >
      {() => (
        <Form layout="vertical" noValidate>
          <FormItem
            name="firstName" 
            label={i18n.t('formPage.firstName')}
            required
            showValidateSuccess
          >
            <Input name="firstName" placeholder={i18n.t('formPage.firstNameEx')} />
          </FormItem>
          <FormItem
            name="lastName" 
            label={i18n.t('formPage.lastName')}
            required
            showValidateSuccess
          >
            <Input name="lastName" placeholder={i18n.t('formPage.lastNameEx')} />
          </FormItem>
          <FormItem
            name="role" 
            label={i18n.t('formPage.role')}
            required
            showValidateSuccess
          >
            <Input name="role" placeholder={i18n.t('formPage.roleEx')} />
          </FormItem>
          <FormItem
            name="summary" 
            label={i18n.t('formPage.summary')}
            required
            showValidateSuccess
          >
            <Input.TextArea
              className={classes.TextArea}
              name="summary" 
              placeholder={i18n.t('formPage.summaryEx')} 
              autoSize
            />
          </FormItem>
          <FormItem
            name="languages" 
            label={i18n.t('formPage.languages')}
          >
            <TweenOneGroup array={generateTags(languages, setLanguages)} />
            {showLanguagesInput && (
              <Input
                name="languages"
                type="text"
                size="small"
                style={{ width: 82 }}
                value={tagsInputValue}
                onChange={(e) => setTagsInputValue(e.target.value)}
                onMouseOver={(e) => e.target.focus()}
                onBlur={() => onTagsInputConfirm(
                  tagsInputValue, 
                  languages, 
                  setTagsInputValue, 
                  setLanguages,
                  setShowLanguagesInput,
                )}
                onPressEnter={() => onTagsInputConfirm(
                  tagsInputValue, 
                  languages, 
                  setTagsInputValue, 
                  setLanguages,
                  setShowLanguagesInput,
                )}
              />
            )}
            {!showLanguagesInput && (
              <Tag 
                onClick={() => setShowLanguagesInput(true)} 
                className="site-tag-plus"
              >
                <PlusOutlined /> 
                {i18n.t('formPage.newItem')}
              </Tag>
            )}
          </FormItem>
          <FormItem
            name="databases" 
            label={i18n.t('formPage.databases')}
          >
            <TweenOneGroup array={generateTags(databases, setDatabases)} />
            {showDatabasesInput && (
              <Input
                name="databases"
                type="text"
                size="small"
                style={{ width: 82 }}
                value={tagsInputValue}
                onChange={(e) => setTagsInputValue(e.target.value)}
                onMouseOver={(e) => e.target.focus()}
                onBlur={() => onTagsInputConfirm(
                  tagsInputValue, 
                  databases, 
                  setTagsInputValue, 
                  setDatabases,
                  setShowDatabasesInput,
                )}
                onPressEnter={() => onTagsInputConfirm(
                  tagsInputValue, 
                  databases, 
                  setTagsInputValue, 
                  setDatabases,
                  setShowDatabasesInput,
                )}
              />
            )}
            {!showDatabasesInput && (
              <Tag 
                onClick={() => setShowDatabasesInput(true)} 
                className="site-tag-plus"
              >
                <PlusOutlined /> 
                {i18n.t('formPage.newItem')}
              </Tag>
            )}
          </FormItem>
        </Form>
      )}
    </Formik>
  );
};

export default Presentational;
