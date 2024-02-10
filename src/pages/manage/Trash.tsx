import React, { FC, useState } from 'react';
import styles from './common.module.scss';
import { useTitle } from 'react-use';
import { Empty, Typography, Table, Tag, Button, Space, Modal, message, Spin } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import ListSearch from '../../components/ListSearch';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import ListPage from '../../components/ListPage';
import { updateQuestionService, deleteQuestionService } from '../../services/question';
import { useRequest } from 'ahooks';

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  const { loading, data = {}, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  useTitle('Questionnairee - Trash list');
  // table columns defined
  const columns = [
    { title: 'name', dataIndex: 'title' },
    {
      title: 'Published',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="green">Published</Tag> : <Tag>Not Published</Tag>;
      },
    },
    { title: 'Responses', dataIndex: 'answerCount' },
    { title: 'Create Time', dataIndex: 'createAt' },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedIds(selectedRowKeys as string[]);
    },
  };
  // recover fn
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false });
      }
    },
    {
      manual: true,
      debounceWait: 500, // in case fast click recover
      onSuccess() {
        message.success('Recover successfully');
        refresh(); //after deleted, refresh the list
        setSelectedIds([]);
      },
    },
  );
  // delete fn
  const { run: deleteQuestion } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds);
    },
    {
      manual: true,
      debounceWait: 500,
      onSuccess() {
        message.success(`delete successfully`);
        refresh();
        setSelectedIds([]);
      },
    },
  );
  const confirmDel = () => {
    confirm({
      title: 'Delete Permanently',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure to delete permanently?',
      okType: 'danger',
      okText: 'Yes',
      onOk: deleteQuestion,
    });
  };
  //table element
  const TableElem = (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length > 0 ? false : true} onClick={recover}>
            Recover
          </Button>
          <Button danger disabled={selectedIds.length > 0 ? false : true} onClick={confirmDel}>
            Delete Permanent
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
      />
    </>
  );
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>Trash List</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin size="large"></Spin>
          </div>
        )}
        {!loading && list.length === 0 && <Empty></Empty>}
        {!loading && list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  );
};

export default Trash;
