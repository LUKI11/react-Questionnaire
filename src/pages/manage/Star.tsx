import React, { FC } from 'react';
import styles from './common.module.scss';
import QuestionCard from '../../components/QuestionCard';
import { useTitle } from 'react-use';
import { Empty, Spin, Typography } from 'antd';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';

const { Title } = Typography;

const Star: FC = () => {
  useTitle('Questionnairee - Star list');
  const { loading, data = {} } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>Star List</Title>
        </div>
        <div className={styles.right}>
          <ListSearch></ListSearch>
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large"></Spin>
          </div>
        )}
        {!loading && list.length === 0 && (
          <Empty description={<span>No Star Questionnaire</span>}></Empty>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const id = q._id;
            return <QuestionCard key={id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  );
};

export default Star;
