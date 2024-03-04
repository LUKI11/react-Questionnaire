import React, { FC } from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';
import PageInfo from './PageInfo';

const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: 'Values',
      children: <ComponentProp></ComponentProp>,
      icon: <FileTextOutlined />,
    },
    {
      key: 'setting',
      label: 'Setting',
      children: <PageInfo></PageInfo>,
      icon: <SettingOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="prop" items={tabsItems} />;
};

export default RightPanel;
