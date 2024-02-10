import React, { FC, useState } from 'react';
import { Form, Input, Space, Typography, Button, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATHNAME } from '../router';
import { registerService } from '../services/user';
import { useRequest } from 'ahooks';

const { Title } = Typography;

const Register: FC = () => {
  const navigate = useNavigate();
  // to login
  const handleLogin = () => {
    navigate({
      pathname: LOGIN_PATHNAME,
    });
  };
  // register fn
  const { run: registerUser } = useRequest(
    async (values) => {
      const { username, password, nickname } = values;
      await registerService(username, password, nickname);
    },
    {
      manual: true,
      onSuccess() {
        message.success('register sucessfully');
        navigate({
          pathname: LOGIN_PATHNAME,
        });
      },
    },
  );
  const onFinish = (values: any) => {
    registerUser(values);
  };
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title>
            <UserAddOutlined />
          </Title>
          <Title level={2}>Register</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 20 }}
          style={{ minWidth: '500px' }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Usrname"
            name="username"
            rules={[
              { required: true, message: 'Please enter username!' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: 'Your username should more than 5 less than 20 and',
              },
              {
                pattern: /^\w+$/,
                message: 'Username can only contain number, letter and undersocre',
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter password!' },
              { type: 'string', min: 8, message: 'Your password should more than 8 characters' },
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please enter password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('Password not match!'));
                  }
                },
              }),
            ]}
          >
            <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label="Name" name="nickname">
            <Input></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
              <Button onClick={handleLogin}>Login</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
