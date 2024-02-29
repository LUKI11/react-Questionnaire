import React, { FC } from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import ComponentProp from './ComponentProp';

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
      children: <div>Setting</div>,
      icon: <SettingOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="prop" items={tabsItems} />;
};

export default RightPanel;
