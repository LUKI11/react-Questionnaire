import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
import { Button, Result, Spin, Layout, Divider } from 'antd';
import { useNavigate } from 'react-router';
import Sider from 'antd/es/layout/Sider';
import styles from './index.module.scss';
import StatHeader from './StatHeader';

const { Header, Content } = Layout;

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();

  const { title, isPublished } = useGetPageInfo();
  useTitle(`Statistics - ${title}`);
  const navigate = useNavigate();

  const LoadingElem = (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Spin></Spin>
    </div>
  );

  const genContentElem = () => {
    if (isPublished != null && !isPublished) {
      return (
        <Result
          status="warning"
          title="Cannot find the statistics for unpublished questionnaire"
          extra={
            <Button type="primary" onClick={() => navigate(-1)}>
              Back
            </Button>
          }
        ></Result>
      );
    }

    return (
      <>
        <Sider width="20%" className={styles.left}>
          left
        </Sider>
        <Content className={styles.mid}>Content</Content>
        <Sider width="20%" className={styles.right}>
          right
        </Sider>
      </>
    );
  };

  return (
    <div>
      <Layout className={styles.main}>
        <Header className={styles.header}>
          <StatHeader></StatHeader>
        </Header>
        <Divider style={{ margin: '0', padding: '0', borderColor: '#e8e8e8' }}></Divider>
        <Layout className={styles.content}>
          {loading && LoadingElem}
          {!loading && genContentElem()}
        </Layout>
      </Layout>
    </div>
  );
};

export default Stat;
