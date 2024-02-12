import React, { FC, useEffect, useState } from 'react';
import { Space, Typography } from 'antd';
import { HighlightOutlined } from '@ant-design/icons';
import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router';
import useGetUserInfo from '../hooks/useGetUserInfo';

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();
  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);
  return (
    <>
      <Link to={pathname}>
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
