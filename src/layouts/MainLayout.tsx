import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';

const { Header, Footer, Content } = Layout;

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);
  return (
    <>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
            <Logo />
          </div>
          <div className={styles.right}>
            <UserInfo></UserInfo>
          </div>
        </Header>
        <Content className={styles.main}>
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <Spin />
            </div>
          ) : (
            <Outlet></Outlet>
          )}
        </Content>
        <Footer className={styles.footer}>Questionnair Demo</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
