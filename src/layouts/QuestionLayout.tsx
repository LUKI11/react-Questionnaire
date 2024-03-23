import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import LoadingComponent from '../components/LoadingComponent';
const QuestionLayout: FC = () => {
  // load user data
  const { waitingUserData } = useLoadUserData();
  // nav to login if user not login
  useNavPage(waitingUserData);
  return (
    <div style={{ height: '100vh' }}>
      {waitingUserData ? <LoadingComponent></LoadingComponent> : <Outlet></Outlet>}
    </div>
  );
};
export default QuestionLayout;
