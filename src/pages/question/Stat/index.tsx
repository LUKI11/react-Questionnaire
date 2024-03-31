import React, { FC, useState } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
import { Button, Result, Layout, Divider } from 'antd';
import { useNavigate } from 'react-router';
import Sider from 'antd/es/layout/Sider';
import styles from './index.module.scss';
import StatHeader from './StatHeader';
import ComponentList from './ComponentList';
import PageStat from './PageStat';
import LoadingComponent from '../../../components/LoadingComponent';
import ChartStat from './ChartStat';

const { Header, Content } = Layout;

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();

  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  const { title, isPublished } = useGetPageInfo();
  useTitle(`Statistics - ${title}`);
  const navigate = useNavigate();

  const LoadingElem = <LoadingComponent></LoadingComponent>;

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
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></ComponentList>
        </Sider>
        <Content className={styles.mid}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></PageStat>
        </Content>
        <Sider width="20%" className={styles.right}>
          <ChartStat
            selectedComponentType={selectedComponentType}
            selectedComponentId={selectedComponentId}
          ></ChartStat>
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
