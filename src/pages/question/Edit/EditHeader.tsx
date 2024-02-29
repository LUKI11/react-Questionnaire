import React, { FC } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolBar from './EditToolBar';

const { Title } = Typography;

const EditHeader: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              Back
            </Button>
            <Title>Title</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolBar></EditToolBar>
        </div>
        <div className={styles.right}>
          <Space>
            <Button>Save</Button>
            <Button type="primary">Publish</Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default EditHeader;
