import React from 'react';
// import PropTypes from 'prop-types';
// import i18n from 'i18next';
import { 
  Table, 
  Button,
  Row,
  Col,
} from 'antd';

import { SearchModal, SearchIcon } from '../../../common/TableSearch/Presentational';
// import classes from './Styles.module.scss';

const columns = [
  {
    title: 'Employee',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend', 'ascend'],
    filterDropdown: SearchModal,
    filterIcon: SearchIcon,
    onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: 'CV Actions',
    key: 'action',
    render: () => (
      <Row gutter={[5, 5]} justify="start">
        <Col>
          <Button 
            type="primary"
            shape="round"
            size="small"
          >
            EDIT
          </Button>
        </Col>
        <Col>
          <Button 
            type="primary"
            shape="round"
            size="small"
            danger
          >
            DELETE
          </Button>
        </Col>
      </Row>
    ),
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const getData = () => {
  const data = [];
  
  data.push({
    key: 1,
    name: 'Edrward 1',
  });

  return data;
};

const Presentational = () => (
  <Table 
    rowSelection={{
      type: 'checkbox',
      ...rowSelection,
    }}
    columns={columns}
    dataSource={getData()}
    title={() => 'Header'}
    scroll={{ x: 456 }}
    sticky
  />
);

export default Presentational;
