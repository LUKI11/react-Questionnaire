import React, { FC, useEffect } from 'react';
import { Form, Input, Space, Typography, Button, Checkbox, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { REGISTER_PATHNAME } from '../router';
import { useForm } from 'antd/es/form/Form';
import { loginService } from '../services/user';
import { useRequest } from 'ahooks';
import { MANAGE_INDEX_PATHNAME } from '../router';
import { setToken } from '../utils/user-token';

const { Title } = Typography;

const USERNAME_KEY = 'username';
const PASSWORD_KEY = 'password';

// set user info into local storage
const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
};
// delete user info from local storage
const deleteUserFromLocal = () => {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
};
// retrive user info from local storage
const getUserFromLocal = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
};

const Login: FC = () => {
  const navigate = useNavigate();

  // jump to register page
  const handleRegister = () => {
    navigate({
      pathname: REGISTER_PATHNAME,
    });
  };
  // login fn
  const { run: loginUser } = useRequest(
    async (username: string, password: string) => {
      const data = await loginService(username, password);
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { token } = result;
        message.success('login successfully');
        navigate({
          pathname: MANAGE_INDEX_PATHNAME,
        });
        setToken(token);
      },
    },
  );
  const onFinish = (values: any) => {
    const { username, password, remember } = values || {};
    // store user info in local storage
    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromLocal();
    }
    // login
    loginUser(username, password);
  };

  const [form] = useForm();

  useEffect(() => {
    const { username, password } = getUserFromLocal();
    form.setFieldsValue({ username, password });
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title>
            <UserOutlined />
          </Title>
          <Title level={2}>Login</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 20 }}
          style={{ minWidth: '500px' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please enter your username' },
              {
                pattern: /^\w+$/,
                message: 'Username can only contain number, letter and undersocre',
              },
            ]}
          >
            <Input placeholder="Please enter your username"></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Please enter your password"></Input.Password>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10 }} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Button onClick={handleRegister}>Register</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
