import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { 
  Formik, 
  FieldArray, 
  Field,
  Form,
} from 'formik';
import { 
  Button, 
  Space, 
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
import DatePicker from './Common/DatePicker/Presentational';
import CommaArray from './Common/CommaArray/Presentational';
import routes from '../../../../constants/routes';
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
let formValues = { ...initialValues };
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
        startDate: Yup.date().required(i18n.t('formPage.fieldIsRequired')).nullable(),
        endDate: Yup.date().nullable(),
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
        startDate: Yup.date().required(i18n.t('formPage.fieldIsRequired')).nullable(),
        endDate: Yup.date().nullable(),
      }).required(),
    })).defined(),
  profileImage: Yup.object().shape({
    size: Yup.number().max(300000, i18n.t('formPage.profileImageRequiredSize')),
  }),
});
const onSubmit = async ({ ...args }) => {
  const formValidation = await args.actions.validateForm();
  if (!formValidation) return;

  const skills = {
    languages: args.languages,
    databases: args.databases,
    backendFrameworks: args.backendFrameworks,
    frontendFrameworks: args.frontendFrameworks,
    operationsAndInfrastructure: args.operationsAndInfrastructure,
    integrationAndDeployment: args.integrationAndDeployment,
    testing: args.testing,
    thirdParty: args.thirdParty,
    agile: args.agile,
    other: args.other,
  }

  const requestBody = {
    firstName: args.values.firstName,
    lastName: args.values.lastName,
    role: args.values.role,
    summary: args.values.summary,
    skills,
    spokenLanguages: args.values.spokenLanguages,
    projects: args.values.projects,
    education: args.values.education,
  };

  let createdCvId;

  if (!args.cv) {
    createdCvId = await args.createCv(requestBody);
    
    if (!createdCvId) return;
  } else {
    requestBody.id = args.cv._id;
    const didUpdate = await args.updateCv(requestBody);
    
    if (!didUpdate) return;
  }

  if (args.values.profileImage !== '') {
    const cvId = args.cv ? args.cv._id : createdCvId;

    const response = await args.updateProfileImage({
      id: cvId,
      profileImage: args.values.profileImage,
    });

    if (!response) return;
  }

  args.actions.resetForm();
  args.history.replace(routes.APP.INDEX);
};

const Presentational = ({
  cv,
  isReadingCv,
  isCreatingCv,
  isUpdatingCv,
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
      formValues = { ...cv };
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

  useEffect(() => () => {
    formValues = { ...initialValues }
  }, []);

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
      initialValues={formValues}
      enableReinitialize
      validationSchema={validation}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, actions) => onSubmit({
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
        history,
      })}
    >
      {({
        values, 
        errors,
        setFieldTouched,
        setFieldValue,
        resetForm,
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
                      setFieldTouched={setFieldTouched}
                      setFieldValue={setFieldValue}
                      value={language?.level}
                      error={errors.spokenLanguages && errors.spokenLanguages[index]?.level}
                      placeholder={i18n.t('formPage.level')} 
                    />
                    <MinusCircleOutlined onClick={() => arrayHelpers.remove(index)} />
                  </Space>
                ))}
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
                        as={DatePicker}
                        name={`projects[${index}].period.startDate`}
                        hasFeedback
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.period?.startDate}
                        error={errors.projects && errors.projects[index]?.period?.startDate}
                        placeholder={i18n.t('formPage.startDate')}
                      />
                      <Field
                        as={DatePicker}
                        name={`projects[${index}].period.endDate`}
                        hasFeedback
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
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={project?.technologies}
                        error={errors.projects && errors.projects[index]?.technologies}
                        placeholder={i18n.t('formPage.technologies')} 
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
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={item?.qualifications}
                        error={errors.education && errors.education[index]?.qualifications}
                        placeholder={i18n.t('formPage.qualifications')} 
                      />
                    </Space>
                    <Space 
                      style={{ display: 'flex' }} 
                      align="baseline"
                      size="small"
                    >
                      <Field
                        as={DatePicker}
                        name={`education[${index}].period.startDate`}
                        hasFeedback
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={item?.period?.startDate}
                        error={errors.education && errors.education[index]?.period?.startDate}
                        placeholder={i18n.t('formPage.startDate')}
                      />
                      <Field
                        as={DatePicker}
                        name={`education[${index}].period.endDate`}
                        hasFeedback
                        setFieldTouched={setFieldTouched}
                        setFieldValue={setFieldValue}
                        value={item?.period?.endDate}
                        error={errors.education && errors.education[index]?.period?.endDate}
                        placeholder={i18n.t('formPage.endDate')}
                      />
                      <MinusCircleOutlined onClick={() => arrayHelpers.remove(index)} />
                    </Space>
                  </div>
                ))}
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
              </div>
            )}
          />
          <Divider orientation="left">{i18n.t('formPage.uploadSection')}</Divider>
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
          <Row gutter={[10, 10]} justify="end">
            <Col>
              <Button 
                className={classes.Button} 
                onClick={() => {
                  resetForm();
                  history.replace(routes.APP.INDEX);
                }}
              >
                {i18n.t('formPage.cancel')}
              </Button>
            </Col>
            <Col>
              <Button 
                className={classes.Button} 
                type="primary" 
                htmlType="submit"
                loading={isCreatingCv || isUpdatingCv}
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
  isCreatingCv: PropTypes.bool,
  isUpdatingCv: PropTypes.bool,
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
  isCreatingCv: false,
  isUpdatingCv: false,
  error: undefined,
};

export default Presentational;
