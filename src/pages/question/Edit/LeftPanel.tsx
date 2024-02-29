import React, { FC } from 'react';
import { Tabs } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import ComponentLib from './ComponentLib';

const LeftPanel: FC = () => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: 'Components',
      children: <ComponentLib />,
      icon: <AppstoreOutlined />,
    },
    {
      key: 'layers',
      label: 'Layers',
      children: <div>Layers</div>,
      icon: <BarsOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;
