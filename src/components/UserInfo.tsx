import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { getUserInfoService } from '../services/user';
import { useRequest } from 'ahooks';
import { UserOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { removeToken } from '../utils/user-token';

const UserInfo: FC = () => {
  const { data } = useRequest(getUserInfoService);
  const { username, nickname } = data || {};
  const navigate = useNavigate();
  // Logout fn
  const logout = () => {
    removeToken();
    message.success('Logout Successfully');
    navigate({
      pathname: LOGIN_PATHNAME,
    });
  };

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined /> {nickname}
      </span>
      <Button type="link" onClick={logout}>
        Log out
      </Button>
    </>
  );

  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>Login</Link>
    </>
  );
  return <>{username ? UserInfo : Login}</>;
};

export default UserInfo;
