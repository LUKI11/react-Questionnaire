import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './MainLayout.module.scss';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
import LoadingComponent from '../components/LoadingComponent';

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
          {waitingUserData ? <LoadingComponent></LoadingComponent> : <Outlet></Outlet>}
        </Content>
        <Footer className={styles.footer}>Questionnair Demo</Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
