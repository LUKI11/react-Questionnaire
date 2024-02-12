import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUserData from '../hooks/useLoadUserData';
import { Spin } from 'antd';
import useNavPage from '../hooks/useNavPage';
const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <>
      <div>Question Layout</div>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </>
  );
};

export default QuestionLayout;
