import { Spin } from 'antd';
import React from 'react';

const LoadingComponent = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Spin></Spin>
    </div>
  );
};

export default LoadingComponent;
