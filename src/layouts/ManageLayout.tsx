import React, { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './ManageLayout.module.scss';
import { Button, Divider, Space, message } from 'antd';
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { createQuestionService } from '../services/question';
import { useRequest } from 'ahooks';

const ManageLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    loading,
    //error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(data) {
      const { id } = data || {};
      navigate({ pathname: `/question/edit/${id}` });
      message.success('create successfully');
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            New Questionnair
          </Button>
          <Divider></Divider>
          <Button
            type={location.pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate('list')}
          >
            My Questionnair
          </Button>
          <Button
            type={location.pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate('star')}
          >
            Star Questionnair
          </Button>
          <Button
            type={location.pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate('trash')}
          >
            Trash
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default ManageLayout;
