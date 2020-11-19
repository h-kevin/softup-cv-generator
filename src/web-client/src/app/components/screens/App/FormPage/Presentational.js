/* eslint-disable */

import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { 
  Formik, 
  FieldArray, 
  Field,
} from 'formik';
import { 
  Button, 
  Space, 
  Form,
  DatePicker,
  Upload,
} from 'antd';
import AntInput from 'antd/lib/input/Input';
import AntTextArea from 'antd/lib/input/TextArea';
import { 
  PlusOutlined, 
  MinusCircleOutlined, 
  UploadOutlined,
} from '@ant-design/icons';
import * as Yup from 'yup';
import i18n from 'i18next';

import Input from './Common/Input/Presentational';
import TextArea from './Common/TextArea/Presentational';
import ArrayInput from './Common/ArrayInput/Presentational';
import { antRules } from '../../../../helpers/validation';

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
        setFieldValue,
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
          <FieldArray
            name="spokenLanguages"
            render={(arrayHelpers) => (
              <div>
                {values.spokenLanguages.map((_language, index) => (
                  <Space 
                    key={index}
                    style={{
                      display: 'flex', 
                      marginBottom: 10,
                    }} 
                    align="baseline"
                  >
                    <Form.Item
                      hasFeedback
                      name={`spokenLanguages[${index}].language`}
                      rules={antRules()}
                    >
                      <AntInput
                        name={`spokenLanguages[${index}].language`}
                        placeholder={i18n.t('formPage.language')} 
                        onBlur={(e) => setFieldValue(
                          `spokenLanguages[${index}].language`,
                          e.target.value,
                        )}
                      />
                    </Form.Item>
                    <Form.Item
                      hasFeedback
                      name={`spokenLanguages[${index}].level`}
                      rules={antRules()}
                    >
                      <AntInput 
                        name={`spokenLanguages.${index}.level`} 
                        placeholder={i18n.t('formPage.level')} 
                        onBlur={(e) => setFieldValue(
                          `spokenLanguages[${index}].level`,
                          e.target.value,
                        )}
                      />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => arrayHelpers.remove(index)} />
                  </Space>
                ))}
                <Form.Item name="button">
                    <Button
                      id="addLanguages"
                      name="button"
                      type="dashed"
                      onClick={() => arrayHelpers.push({ 
                        language: '', 
                        level: '',
                      })}
                      style={{ width: '100%' }}
                    >
                      <PlusOutlined /> 
                      Add new language
                    </Button>
                  </Form.Item>
              </div>
            )}
          />
          <FieldArray
            name="projects"
            render={(arrayHelpers) => (
              <div>
                {values.projects.map((_project, index) => (
                  <div key={index}>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 4,
                      }} 
                      align="baseline"
                    >
                      <Form.Item
                        hasFeedback
                        name={`projects[${index}].period.startDate`}
                        rules={antRules()}
                      >
                        <DatePicker
                          name={`projects[${index}].period.startDate`}
                          placeholder={i18n.t('formPage.startDate')}
                          onChange={(e) => setFieldValue(
                            `projects[${index}].period.startDate`,
                            e?._d,
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        hasFeedback
                        name={`projects[${index}].period.endDate`}
                      >
                        <DatePicker 
                          name={`projects[${index}].period.endDate`} 
                          placeholder={i18n.t('formPage.endDate')} 
                          onChange={(e) => setFieldValue(
                            `projects[${index}].period.endDate`,
                            e?._d,
                          )}
                        />
                      </Form.Item>
                    </Space>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 4,
                      }} 
                      align="baseline"
                    >
                      <Form.Item
                        hasFeedback
                        name={`projects[${index}].client`}
                        rules={antRules()}
                      >
                        <AntInput 
                          name={`projects.${index}.client`} 
                          placeholder={i18n.t('formPage.client')} 
                          onBlur={(e) => setFieldValue(
                            `projects[${index}].client`,
                            e.target.value,
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        hasFeedback
                        name={`projects[${index}].position`}
                        rules={antRules()}
                      >
                        <AntInput 
                          name={`projects.${index}.position`} 
                          placeholder={i18n.t('formPage.position')} 
                          onBlur={(e) => setFieldValue(
                            `projects[${index}].position`,
                            e.target.value,
                          )}
                        />
                      </Form.Item>
                    </Space>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 4,
                      }} 
                      align="baseline"
                      size="small"
                    >
                      <Form.Item
                      style={{
                        width: '376px'
                      }} 
                        hasFeedback
                        name={`projects[${index}].technologies`}
                        rules={antRules()}
                      >
                        <AntInput 
                          name={`projects.${index}.technologies`} 
                          placeholder={i18n.t('formPage.technologies')} 
                          onBlur={(e) => setFieldValue(
                            `projects[${index}].technologies`,
                            e.target.value
                              .replace(/ +/g, ' ')
                              .split(/\s*,\s*/)
                              .filter((item) => item),
                          )}
                        />
                      </Form.Item>
                    </Space>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 10,
                      }} 
                      align="baseline"
                      size="small"
                    >
                      <Form.Item
                      style={{
                        width: '376px'
                      }} 
                        name={`projects[${index}].responsibilities`}
                        rules={antRules()}
                      >
                        <AntTextArea 
                          style={{ resize: 'none' }}
                          autoSize={true}
                          name={`projects.${index}.responsibilities`} 
                          placeholder={i18n.t('formPage.responsibilities')} 
                          onBlur={(e) => setFieldValue(
                            `projects[${index}].responsibilities`,
                            e.target.value,
                          )}
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => arrayHelpers.remove(index)} />
                    </Space>
                  </div>
                ))}
                <Form.Item name="button">
                    <Button
                      id="addProjects"
                      name="button"
                      type="dashed"
                      onClick={() => arrayHelpers.push({})}
                      style={{ width: '100%' }}
                    >
                      <PlusOutlined /> 
                      Add new Project
                    </Button>
                  </Form.Item>
              </div>
            )}
          />
          <FieldArray
            name="education"
            render={(arrayHelpers) => (
              <div>
                {values.education.map((_item, index) => (
                  <div key={index}>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 4,
                      }} 
                      align="baseline"
                    >
                      <Form.Item
                        hasFeedback
                        name={`education[${index}].institution`}
                        rules={antRules()}
                      >
                        <AntInput 
                          name={`education.${index}.institution`} 
                          placeholder={i18n.t('formPage.institution')} 
                          onBlur={(e) => setFieldValue(
                            `education[${index}].institution`,
                            e.target.value,
                          )}
                        />
                      </Form.Item>
                    </Space>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 4,
                      }} 
                      align="baseline"
                      size="small"
                    >
                      <Form.Item
                      style={{
                        width: '500px'
                      }} 
                        hasFeedback
                        name={`education[${index}].qualifications`}
                        rules={antRules()}
                      >
                        <AntInput 
                          name={`education.${index}.qualifications`} 
                          placeholder={i18n.t('formPage.qualifications')} 
                          onBlur={(e) => setFieldValue(
                            `education[${index}].qualifications`,
                            e.target.value
                              .replace(/ +/g, ' ')
                              .split(/\s*,\s*/)
                              .filter((item) => item),
                          )}
                        />
                      </Form.Item>
                    </Space>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 10,
                      }} 
                      align="baseline"
                    >
                      <Form.Item
                        hasFeedback
                        name={`education[${index}].period.startDate`}
                        rules={antRules()}
                      >
                        <DatePicker
                          name={`education[${index}].period.startDate`}
                          placeholder={i18n.t('formPage.startDate')}
                          onChange={(e) => setFieldValue(
                            `education[${index}].period.startDate`,
                            e?._d,
                          )}
                        />
                      </Form.Item>
                      <Form.Item
                        hasFeedback
                        name={`education[${index}].period.endDate`}
                      >
                        <DatePicker 
                          name={`education[${index}].period.endDate`} 
                          placeholder={i18n.t('formPage.endDate')} 
                          onChange={(e) => setFieldValue(
                            `education[${index}].period.endDate`,
                            e?._d,
                          )}
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => arrayHelpers.remove(index)} />
                    </Space>
                  </div>
                ))}
                <Form.Item name="button">
                    <Button
                      id="addInstitutions"
                      name="button"
                      type="dashed"
                      onClick={() => arrayHelpers.push()}
                      style={{ width: '100%' }}
                    >
                      <PlusOutlined /> 
                      Add new institution
                    </Button>
                  </Form.Item>
              </div>
            )}
          />
          <Form.Item>
            <Upload 
              name="file"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              headers={{ authorization: 'authorization-text' }}
            >
              <Button 
                icon={<UploadOutlined />}
              >
                Click to Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button 
              onClick={() => console.log(values)} 
              type="primary" 
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default Presentational;
