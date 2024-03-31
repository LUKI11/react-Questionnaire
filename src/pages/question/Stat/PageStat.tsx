import { useRequest } from 'ahooks';
import React, { FC, useState } from 'react';
import { getQuestionStatListService } from '../../../services/stat';
import { useParams, useSearchParams } from 'react-router-dom';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, STAT_PAGE_SIZE } from '../../../constant';
import { Table, Typography } from 'antd';
import LoadingComponent from '../../../components/LoadingComponent';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import ListPage from '../../../components/ListPage';
import { nanoid } from '@reduxjs/toolkit';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || STAT_PAGE_SIZE;
  const { id = '' } = useParams();

  const { componentList } = useGetComponentInfo();
  // get questionstat list
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize });
      return res;
    },
    {
      onSuccess(res) {
        const { total, list = [] } = res;
        setTotal(total);
        setList(list);
      },
      refreshDeps: [id, searchParams],
    },
  );

  // table element
  const columns = componentList.map((c) => {
    const { fe_id, title, props, type } = c;
    return {
      title: (
        <div
          style={{
            cursor: 'pointer',
            color: selectedComponentId === fe_id ? '#6f8be9' : 'inherit',
          }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          {props!.title || title}
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  const TableElem = (
    <Table columns={columns} dataSource={list} pagination={false} rowKey={(r) => r['_id']}></Table>
  );
  return (
    <div>
      {!loading && <Title level={3}>Total:{total}</Title>}
      {loading && <LoadingComponent></LoadingComponent>}
      {!loading && TableElem}
      <div style={{ textAlign: 'center' }}>
        <ListPage total={total}></ListPage>
      </div>
    </div>
  );
};

export default PageStat;
