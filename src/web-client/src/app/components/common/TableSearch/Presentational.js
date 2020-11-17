import React from 'react';
import { 
  Input, 
  Button, 
  Space, 
} from 'antd';
import * as Icon from '@ant-design/icons';
import i18n from 'i18next';
import PropTypes from 'prop-types';

import { colors } from '../../../styles/abstracts/variables';

export const SearchModal = ({ 
  setSelectedKeys, 
  selectedKeys, 
  confirm, 
  clearFilters, 
}) => (
  <div style={{ padding: 8 }}>
    <Input
      placeholder={i18n.t('global.typeSth')}
      value={selectedKeys[0]}
      onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => confirm()}
      style={{ 
        width: 188, 
        marginBottom: 8, 
        display: 'block',
      }}
    />
    <Space>
      <Button
        type="primary"
        onClick={() => confirm()}
        icon={<Icon.SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        {i18n.t('global.search')}
      </Button>
      <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
        {i18n.t('global.reset')}
      </Button>
    </Space>
  </div>
);

export const SearchIcon = (filtered) => (
  <Icon.SearchOutlined 
    style={{ 
      color: filtered ? colors.dodgerBlue : undefined,
    }} 
  />
);

SearchModal.propTypes = {
  setSelectedKeys: PropTypes.func.isRequired,
  selectedKeys: PropTypes.shape([]).isRequired,
  confirm: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};
