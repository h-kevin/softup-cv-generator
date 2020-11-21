import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { 
  Formik, 
  FieldArray, 
  Field,
} from 'formik';
import { 
  Button, 
  Space, 
  Form,
  Upload,
  PageHeader,
  Divider,
  Row,
  Col,
  Spin,
  notification,
} from 'antd';
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
import DatePickerC from './Common/DatePicker/Presentational';
import CommaArray from './Common/CommaArray/Presentational';
import routes from '../../../../constants/routes';
import classes from './Styles.module.scss';

let initialValues = {
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
  firstName: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
  lastName: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
  role: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
  summary: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
  skills: Yup.object().shape({
    languages: Yup.array().of(Yup.string().required()),
    databases: Yup.array().of(Yup.string().required()),
    backendFrameworks: Yup.array().of(Yup.string().required()),
    frontendFrameworks: Yup.array().of(Yup.string().required()),
    operationsAndInfrastructure: Yup.array().of(Yup.string().required()),
    integrationAndDeployment: Yup.array().of(Yup.string().required()),
    testing: Yup.array().of(Yup.string().required()),
    thirdParty: Yup.array().of(Yup.string().required()),
    agile: Yup.array().of(Yup.string().required()),
    other: Yup.array().of(Yup.string().required()),
  }).required(),
  spokenLanguages: Yup
    .array().of(Yup.object().shape({
      language: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
      level: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
    })).defined(),
  projects: Yup
    .array().of(Yup.object().shape({
      period: Yup.object().shape({
        startDate: Yup
          .string()
          .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
          .required(i18n.t('formPage.fieldIsRequired')),
        endDate: Yup
          .string()
          .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
      }).required(),
      client: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
      position: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
      technologies: Yup.string(),
      responsibilities: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
    })).defined(),
  education: Yup.array()
    .of(Yup.object().shape({
      institution: Yup.string().required(i18n.t('formPage.fieldIsRequired')),
      qualifications: Yup.string(),
      period: Yup.object().shape({
        startDate: Yup
          .string()
          .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
          .required(i18n.t('formPage.fieldIsRequired')),
        endDate: Yup
          .string()
          .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
      }).required(),
    })).defined(),
  profileImage: Yup.object().shape({
    size: Yup.number().max(300000, i18n.t('formPage.profileImageRequiredSize')),
  }),
});
const onSubmit = async () => {
  
};

const Presentational = ({
  cv,
  isReadingCv,
  error,
  getCv,
  createCv,
  updateCv,
  updateProfileImage,
  clearState,
  history,
  location,
}) => {
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
  const queryParams = queryString.parse(location.search);

  useEffect(() => {
    if (queryParams.id) {
      getCv({ id: queryParams.id });
    }
  }, [getCv, queryParams.id]);

  useEffect(() => {
    if (cv) {
      initialValues = { ...cv };
      setLanguages(cv.skills.languages);
      setDatabases(cv.skills.databases);
      setBackendFrameworks(cv.skills.backendFrameworks);
      setFrontendFrameworks(cv.skills.frontendFrameworks);
      setOperationsAndInfrastructure(cv.skills.operationsAndInfrastructure);
      setIntegrationAndDeployment(cv.skills.integrationAndDeployment);
      setTesting(cv.skills.testing);
      setThirdParty(cv.skills.thirdParty);
      setAgile(cv.skills.agile);
      setOther(cv.skills.other);
    }
  }, [cv]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: i18n.t('global.error'),
        description: error,
      });
      clearState();
    }
  }, [error, clearState]);

  if (isReadingCv) {
    return (
      <Row 
        style={{
          height: '100vh',
          margin: '-15px',
        }}
        justify="center" 
        align="middle"
      >
        <Col>
          <Spin size="large" spinning />
        </Col>
      </Row>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validation}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={({ values, actions }) => onSubmit(
        values,
        actions,
        languages,
        databases,
        backendFrameworks,
        frontendFrameworks,
        operationsAndInfrastructure,
        integrationAndDeployment,
        testing,
        thirdParty,
        agile,
        other,
        cv,
        createCv,
        updateCv,
        updateProfileImage,
      )}
    >
      {({
        values, 
        errors,
        touched, 
        setFieldTouched,
        setFieldValue,
      }) => (
        <Form layout="vertical" noValidate>
          <PageHeader 
            style={{ padding: '0 0 16px 0' }}
            title={i18n.t('formPage.generalInformationSection')}
            backIcon={false}
          />
          <Field
            as={Input}
            name="firstName" 
            label={i18n.t('formPage.firstName')}
            required
            hasFeedback
            touched={touched.firstName}
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            value={values.firstName}
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
            setFieldValue={setFieldValue}
            value={values.lastName}
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
            setFieldValue={setFieldValue}
            value={values.role}
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
            setFieldValue={setFieldValue}
            value={values.summary}
            error={errors.summary}
            placeholder={i18n.t('formPage.summaryEx')} 
          />
          <Divider orientation="left">{i18n.t('formPage.skillsSection')}</Divider>
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
          <Divider orientation="left">{i18n.t('formPage.spokenLanguagesSection')}</Divider>
          <FieldArray
            name="spokenLanguages"
            render={(arrayHelpers) => (
              <div>
                {values.spokenLanguages.map((language, index) => (
                  <Space 
                    key={`spokenLanguages-${index}`}
                    style={{
                      display: 'flex', 
                      marginBottom: 10,
                    }} 
                    align="baseline"
                  >
                    <Field
                      as={Input}
                      name={`spokenLanguages[${index}].language`}
                      hasFeedback
                      touched={touched.spokenLanguages && touched.spokenLanguages[index]?.language}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      value={language.language}
                      error={errors.spokenLanguages && errors.spokenLanguages[index]?.language}
                      placeholder={i18n.t('formPage.language')} 
                    />
                    <Field
                      as={Input}
                      name={`spokenLanguages[${index}].level`}
                      hasFeedback
                      touched={touched.spokenLanguages && touched.spokenLanguages[index]?.level}
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      value={language?.level}
                      error={errors.spokenLanguages && errors.spokenLanguages[index]?.level}
                      placeholder={i18n.t('formPage.level')} 
                    />
                    <MinusCircleOutlined onClick={() => arrayHelpers.remove(index)} />
                  </Space>
                ))}
                <Form.Item name="button">
                  <Button
                    id="addLanguages"
                    name="button"
                    type="dashed"
                    onClick={() => arrayHelpers.push({})}
                    style={{ width: '100%' }}
                  >
                    <PlusOutlined /> 
                    {i18n.t('formPage.addNewLanguage')}
                  </Button>
                </Form.Item>
              </div>
            )}
          />
          <Divider orientation="left">{i18n.t('formPage.projectsSection')}</Divider>
          <FieldArray
            name="projects"
            render={(arrayHelpers) => (
              <div>
                {values.projects.map((project, index) => (
                  <div key={`projects-${index}`}>
                    <Space 
                      style={{
                        display: 'flex', 
                        marginBottom: 4,
                      }} 
                      size="small"
                      align="baseline"
                    >
                      <Field
                        as={DatePickerC}
                        name={`projects[${index}].period.startDate`}
                        hasFeedback
                        touched={touched.projects && touched.projects[index]?.period?.startDate}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.period?.startDate}
                        error={errors.projects && errors.projects[index]?.period?.startDate}
                        placeholder={i18n.t('formPage.startDate')}
                      />
                      <Field
                        as={DatePickerC}
                        name={`projects[${index}].period.endDate`}
                        hasFeedback
                        touched={touched.projects && touched.projects[index]?.period?.endDate}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.period?.endDate}
                        error={errors.projects && errors.projects[index]?.period?.endDate}
                        placeholder={i18n.t('formPage.endDate')}
                      />
                    </Space>
                    <Space 
                      style={{ display: 'flex' }} 
                      align="baseline"
                      size="small"
                    >
                      <Field
                        as={Input}
                        name={`projects[${index}].client`}
                        hasFeedback
                        touched={touched.projects && touched.projects[index]?.client}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.client}
                        error={errors.projects && errors.projects[index]?.client}
                        placeholder={i18n.t('formPage.client')} 
                      />
                      <Field
                        as={Input}
                        name={`projects[${index}].position`}
                        hasFeedback
                        touched={touched.projects && touched.projects[index]?.position}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.position}
                        error={errors.projects && errors.projects[index]?.position}
                        placeholder={i18n.t('formPage.position')} 
                      />
                    </Space>
                    <Space 
                      style={{ display: 'flex' }} 
                      align="baseline"
                      size="small"
                    >
                      <Field
                        style={{
                          minWidth: '250px',
                          maxWidth: '400px',
                          width: '60vw',
                        }}
                        as={CommaArray}
                        name={`projects[${index}].technologies`}
                        hasFeedback
                        touched={touched.projects && touched.projects[index]?.technologies}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.technologies}
                        error={errors.projects && errors.projects[index]?.technologies}
                        placeholder={i18n.t('formPage.technologies')} 
                        help={i18n.t('formPage.technologiesEx')}
                      />
                    </Space>
                    <Space 
                      style={{ display: 'flex' }} 
                      align="baseline"
                      size="small"
                    >
                      <Field
                        style={{
                          minWidth: '250px',
                          maxWidth: '400px',
                          width: '60vw',
                        }} 
                        as={TextArea}
                        name={`projects[${index}].responsibilities`} 
                        touched={touched.projects && touched.projects[index]?.responsibilities}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.responsibilities}
                        error={errors.projects && errors.projects[index]?.responsibilities}
                        placeholder={i18n.t('formPage.responsibilities')} 
                        autoSize
                      />
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
                    {i18n.t('formPage.addNewProject')}
                  </Button>
                </Form.Item>
              </div>
            )}
          />
          <Divider orientation="left">{i18n.t('formPage.educationSection')}</Divider>
          <FieldArray
            name="education"
            render={(arrayHelpers) => (
              <div>
                {values.education.map((item, index) => (
                  <div key={`education-${index}`}>
                    <Space 
                      style={{ display: 'flex' }} 
                      align="baseline"
                      size="small"
                    >
                      <Field
                        as={Input}
                        name={`education[${index}].institution`}
                        hasFeedback
                        touched={touched.education && touched.education[index]?.institution}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={item?.institution}
                        error={errors.education && errors.education[index]?.institution}
                        placeholder={i18n.t('formPage.institution')} 
                      />
                    </Space>
                    <Space 
                      style={{ display: 'flex' }} 
                      align="baseline"
                      size="small"
                    >
                      <Field
                        style={{
                          minWidth: '250px',
                          maxWidth: '400px',
                          width: '60vw',
                        }}
                        as={CommaArray}
                        name={`education[${index}].qualifications`}
                        hasFeedback
                        touched={touched.education && touched.education[index]?.qualifications}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={item?.qualifications}
                        error={errors.education && errors.education[index]?.qualifications}
                        placeholder={i18n.t('formPage.qualifications')} 
                        help={i18n.t('formPage.qualificationsEx')}
                      />
                    </Space>
                    <Space 
                      style={{ display: 'flex' }} 
                      align="baseline"
                      size="small"
                    >
                      <Field
                        as={DatePickerC}
                        name={`education[${index}].period.startDate`}
                        hasFeedback
                        touched={touched.education && touched.education[index]?.period?.startDate}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={item?.period?.startDate}
                        error={errors.period && errors.period[index]?.period?.startDate}
                        placeholder={i18n.t('formPage.startDate')}
                      />
                      <Field
                        as={DatePickerC}
                        name={`education[${index}].period.endDate`}
                        hasFeedback
                        touched={touched.education && touched.education[index]?.period?.endDate}
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={item?.period?.endDate}
                        error={errors.period && errors.period[index]?.period?.endDate}
                        placeholder={i18n.t('formPage.endDate')}
                      />
                      <MinusCircleOutlined onClick={() => arrayHelpers.remove(index)} />
                    </Space>
                  </div>
                ))}
                <Form.Item name="button">
                  <Button
                    id="addInstitutions"
                    name="button"
                    type="dashed"
                    onClick={() => arrayHelpers.push({})}
                    style={{ width: '100%' }}
                  >
                    <PlusOutlined /> 
                    {i18n.t('formPage.addNewInstitution')}
                  </Button>
                </Form.Item>
              </div>
            )}
          />
          <Divider orientation="left">{i18n.t('formPage.uploadSection')}</Divider>
          <Form.Item>
            <Upload 
              name="profileImage"
              multiple={false}
              accept="image/jpeg,image/jpg,image/png"
              customRequest={({ onSuccess }) => setTimeout(() => { onSuccess('OK') }, 0)}
              onChange={(e) => setFieldValue('profileImage', e.file)}
              fileList={values.profileImage ? [values.profileImage] : []}
            >
              <Button 
                icon={<UploadOutlined />}
              >
                {i18n.t('formPage.clickToUpload')}
              </Button>
            </Upload>
          </Form.Item>
          <Row gutter={[10, 10]} justify="end">
            <Col>
              <Button 
                className={classes.Button} 
                onClick={() => history.replace(routes.APP.INDEX)}
              >
                {i18n.t('formPage.cancel')}
              </Button>
            </Col>
            <Col>
              <Button 
                className={classes.Button} 
                type="primary" 
                htmlType="submit"
              >
                {cv ? i18n.t('formPage.update') : i18n.t('formPage.create')}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

Presentational.propTypes = {
  cv: PropTypes.shape({
    skills: PropTypes.shape({
      languages: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      databases: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      backendFrameworks: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      frontendFrameworks: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      operationsAndInfrastructure: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      integrationAndDeployment: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      testing: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      thirdParty: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      agile: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
      other: PropTypes.arrayOf(
        PropTypes.string.isRequired,
      ),
    }).isRequired,
  }),
  isReadingCv: PropTypes.bool,
  error: PropTypes.string,
  getCv: PropTypes.func.isRequired,
  createCv: PropTypes.func.isRequired,
  updateCv: PropTypes.func.isRequired,
  updateProfileImage: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

Presentational.defaultProps = {
  cv: undefined,
  isReadingCv: false,
  error: undefined,
};

export default Presentational;
