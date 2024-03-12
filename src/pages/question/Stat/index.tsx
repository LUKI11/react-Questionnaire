import React, { FC } from 'react';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useTitle } from 'ahooks';
import { Button, Result, Spin, Layout } from 'antd';
import { useNavigate } from 'react-router';
import Sider from 'antd/es/layout/Sider';

const { Header, Content, Footer } = Layout;

const Stat: FC = () => {
  const { loading } = useLoadQuestionData();

  const { title, isPublished } = useGetPageInfo();
  useTitle(`Statistics - ${title}`);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Spin></Spin>
      </div>
    );
  }
  console.log(isPublished);
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
    <div>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider width="20%">left</Sider>
          <Content>Content</Content>
          <Sider width="20%">right</Sider>
        </Layout>
      </Layout>
    </div>
  );
};

export default Stat;
