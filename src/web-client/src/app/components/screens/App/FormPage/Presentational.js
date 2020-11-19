/* eslint-disable */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Formik, FieldArray, Field, ErrorMessage } from 'formik';
import { 
  Button, 
  Space, 
  Form,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import i18n from 'i18next';

import Input from './Common/Input/Presentational';
import TextArea from './Common/TextArea/Presentational';
import ArrayInput from './Common/ArrayInput/Presentational';
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

const Presentational = () => {
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
  const [backendFrameworks, setBackendFrameworks] = useState([
    'Express.js',
    'Flask',
  ]); 
  const [frontendFrameworks, setFrontendFrameworks] = useState([
    'ReactJS',
    'VueJS',
  ]); 
  const [operationsAndInfrastructure, setOperationsAndInfrastructure] = useState([
    'Docker',
    'JWT',
    'nginx',
  ]); 
  const [integrationAndDeployment, setIntegrationAndDeployment] = useState([
    'Jenkins',
  ]);
  const [testing, setTesting] = useState([
    'Jest',
  ]);
  const [thirdParty, setThirdParty] = useState([
    'Google Analytics',
    'Azure Content Moderator',
  ]);
  const [agile, setAgile] = useState([
    'Kanban',
    'Scrum',
  ]);
  const [other, setOther] = useState([
    'Natural Language Processing',
    'Android Development',
    'Machine Learning',
  ]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
    >
      {({ 
        values, 
        errors,
        touched, 
        setFieldTouched, 
      }) => (
        <Form layout="vertical" noValidate>
          <Field
            as={Input}
            name="firstName" 
            label={i18n.t('formPage.firstName')}
            required
            hasFeedback
            touched={touched.firstName}
            setFieldTouched={setFieldTouched}
            error={errors.firstName}
            placeholder={i18n.t('formPage.firstNameEx')} 
          />
          <Field
            as={Input}
            name="lastName" 
            label={i18n.t('formPage.lastName')}
            required
            hasFeedback
            touched={touched.lastName}
            setFieldTouched={setFieldTouched}
            error={errors.lastName}
            placeholder={i18n.t('formPage.lastNameEx')} 
          />
          <Field
            as={Input}
            name="role" 
            label={i18n.t('formPage.role')}
            required
            hasFeedback
            touched={touched.role}
            setFieldTouched={setFieldTouched}
            error={errors.role}
            placeholder={i18n.t('formPage.roleEx')} 
          />
          <Field
            as={TextArea}
            name="summary" 
            label={i18n.t('formPage.summary')}
            required
            autoSize
            touched={touched.summary}
            setFieldTouched={setFieldTouched}
            error={errors.summary}
            placeholder={i18n.t('formPage.summaryEx')} 
          />
          <ArrayInput
            array={languages} 
            setArray={setLanguages}
            name={i18n.t('formPage.languages')}
            label={i18n.t('formPage.languages')}
          />
          <ArrayInput
            array={databases} 
            setArray={setDatabases}
            name={i18n.t('formPage.databases')}
            label={i18n.t('formPage.databases')}
          />
          <ArrayInput
            array={backendFrameworks} 
            setArray={setBackendFrameworks}
            name={i18n.t('formPage.backendFrameworks')}
            label={i18n.t('formPage.backendFrameworks')}
          />
          <ArrayInput
            array={frontendFrameworks} 
            setArray={setFrontendFrameworks}
            name={i18n.t('formPage.frontendFrameworks')}
            label={i18n.t('formPage.frontendFrameworks')}
          />
          <ArrayInput
            array={operationsAndInfrastructure} 
            setArray={setOperationsAndInfrastructure}
            name={i18n.t('formPage.operationsAndInfrastructure')}
            label={i18n.t('formPage.operationsAndInfrastructure')}
          />
          <ArrayInput
            array={integrationAndDeployment} 
            setArray={setIntegrationAndDeployment}
            name={i18n.t('formPage.integrationAndDeployment')}
            label={i18n.t('formPage.integrationAndDeployment')}
          />
          <ArrayInput
            array={testing} 
            setArray={setTesting}
            name={i18n.t('formPage.testing')}
            label={i18n.t('formPage.testing')}
          />
          <ArrayInput
            array={thirdParty} 
            setArray={setThirdParty}
            name={i18n.t('formPage.thirdParty')}
            label={i18n.t('formPage.thirdParty')}
          />
          <ArrayInput
            array={agile} 
            setArray={setAgile}
            name={i18n.t('formPage.agile')}
            label={i18n.t('formPage.agile')}
          />
          <ArrayInput
            array={other} 
            setArray={setOther}
            name={i18n.t('formPage.other')}
            label={i18n.t('formPage.other')}
          />
          {/* <Form.Item 
            name="spokenLanguages" 
            label={i18n.t('formPage.spokenLanguages')}
          >
            <Form.List name="spokenLanguages">
              {(fields, { add, remove }) => (
                <div>
                  {fields.map((field) => (
                    <Space 
                      key={field.key} 
                      style={{
                        display: 'flex', 
                        marginBottom: 8,
                      }} 
                      align="baseline"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'language']}
                        fieldKey={[field.fieldKey, 'language']}
                        rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <Input 
                          size="small" 
                          placeholder="Language" 
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'level']}
                        fieldKey={[field.fieldKey, 'level']}
                        rules={[{ required: true, message: 'Missing last name' }]}
                      >
                        <Input 
                          size="small" 
                          placeholder="Level" 
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item name="button">
                    <Button
                      name="button"
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: '100%' }}
                    >
                      <PlusOutlined /> 
                      Add new language
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </Form.Item> */}
          <Form.Item>
            <Button 
              onClick={() => console.log(values)} 
              type="primary" 
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
          <FieldArray
            name="spokenLanguages"
            render={arrayHelpers => (
              <div>
                {values.spokenLanguages.map((friend, index) => (
                  <div key={index}>
                    <Field as={Input} name={`spokenLanguages[${index}].language`} />
                    <Field as={Input} name={`spokenLanguages.${index}.level`} />
        
                    <button type="button" onClick={() => arrayHelpers.remove(index)}>
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => arrayHelpers.push({ language: '', level: '' })}
                >
                  +
                </button>
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
};

export default Presentational;
