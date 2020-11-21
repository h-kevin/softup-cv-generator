import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { 
  Table, 
  Button,
  Row,
  Col,
  Tooltip,
  notification,
} from 'antd';
import {
  EditOutlined,
  FileWordOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons'

import { SearchModal, SearchIcon } from '../../../common/TableSearch/Presentational';
import PopConfirm from '../../../common/PopConfirm/Presentational';
import routes from '../../../../constants/routes';
import classes from './Styles.module.scss';

const generateColumns = (
  i18next, 
  deleteCv, 
  isDeletingCv,
  generateDocx,
  lastDeleted,
  history,
) => [
  {
    title: i18next.t('management.employee'),
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
    filterDropdown: SearchModal,
    filterIcon: SearchIcon,
    onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: i18next.t('management.cvActions'),
    key: 'action',
    render: (record) => (
      <Row gutter={[5, 5]} justify="center">
        <Col>
          <Tooltip title={i18n.t('global.update')}>
            <Button
              className={classes.Button}
              type="primary"
              icon={<EditOutlined />}
              onClick={() => history.push(`${routes.APP.FORM_PAGE}?id=${record.key}`)}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title={i18n.t('management.generateDocx')}>
            <Button 
              className={classes.Button}
              icon={<FileWordOutlined />}
              onClick={() => generateDocx({ id: record.key })}
            />
          </Tooltip>
        </Col>
        <Col>
          <PopConfirm
            title={i18n.t('management.confirmDelete')}
            okText={i18n.t('management.okText')}
            cancelText={i18n.t('management.cancelText')}
            onConfirm={() => deleteCv({ id: record.key })}
          >
            <Tooltip title={i18n.t('global.delete')}>
              <Button 
                className={classes.Button}
                type="primary"
                icon={<DeleteOutlined />}
                loading={isDeletingCv && lastDeleted === record.key}
                danger
              />
            </Tooltip>
          </PopConfirm>
        </Col>
      </Row>
    ),
    align: 'center',
    width: 200,
  },
];
const generateData = (cvs) => {
  let data = [];

  if (cvs) {
    data = cvs.map((cv) => ({
      key: cv._id,
      rowKey: cv._id,
      name: `${cv.firstName} ${cv.lastName}`,
    }));
  }

  return data;
};

const Presentational = ({
  cvs,
  isReadingCvs,
  isDeletingCv,
  error,
  getCvs,
  generateDocx,
  deleteCv,
  clearState,
  lastDeleted,
  history,
}) => {
  useEffect(() => {
    getCvs();
  }, [getCvs]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: i18n.t('global.error'),
        description: error,
      });
      clearState();
    }
  }, [error, clearState]);
  
  return (
    <Table 
      columns={generateColumns(
        i18n, 
        deleteCv,
        isDeletingCv,
        generateDocx,
        lastDeleted,
        history,
      )}
      dataSource={generateData(cvs)}
      title={() => (
        <Row justify="space-between" align="middle">
          <Col>
            <h4 className={classes.Header}>
              {i18n.t('management.header')}
            </h4>
          </Col>
          <Col>
            <Tooltip title={i18n.t('management.newCv')}>
              <Button
                className={classes.Button}
                icon={<PlusOutlined />}
                onClick={() => history.push(routes.APP.FORM_PAGE)}
              />
            </Tooltip>
          </Col>
        </Row>
      )}
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultPageSize: 7,
        defaultCurrent: 1,
      }}
      scroll={{ x: 400 }}
      key={(record) => record._id}
      loading={isReadingCvs}
      bordered
      sticky
    />
  );
};

Presentational.propTypes = {
  cvs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  isReadingCvs: PropTypes.bool,
  isDeletingCv: PropTypes.bool,
  error: PropTypes.string,
  getCvs: PropTypes.func.isRequired,
  generateDocx: PropTypes.func.isRequired,
  deleteCv: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  lastDeleted: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Presentational.defaultProps = {
  cvs: undefined,
  isReadingCvs: false,
  isDeletingCv: false,
  lastDeleted: undefined,
  error: undefined,
};

export default Presentational;
