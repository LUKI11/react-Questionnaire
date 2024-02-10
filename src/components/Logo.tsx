import React, { FC } from 'react';
import { Space, Typography } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME } from '../router';

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <>
      <Link to={HOME_PATHNAME}>
        <Space className={styles.container}>
          <Title>
            <HighlightOutlined />
          </Title>
          <Title>QuestionKing</Title>
        </Space>
      </Link>
    </>
  );
};

export default Logo;
