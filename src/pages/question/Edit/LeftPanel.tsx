import React, { FC } from 'react';
import { Tabs } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import ComponentLib from './ComponentLib';
import Layer from './Layer';

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
      children: <Layer></Layer>,
      icon: <BarsOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;
