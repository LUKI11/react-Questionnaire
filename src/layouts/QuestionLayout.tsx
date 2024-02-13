import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUserData from '../hooks/useLoadUserData';
import { Spin } from 'antd';
import useNavPage from '../hooks/useNavPage';
const QuestionLayout: FC = () => {
  // load user data
  const { waitingUserData } = useLoadUserData();
  // nav to login if user not login
  useNavPage(waitingUserData);
  return (
    <div style={{ height: '100vh' }}>
      {waitingUserData ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin />
        </div>
      ) : (
        <Outlet></Outlet>
      )}
      test
    </div>
  );
};

test;
export default QuestionLayout;
