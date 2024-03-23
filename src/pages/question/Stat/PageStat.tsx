import { useRequest } from 'ahooks';
import React, { FC, useState } from 'react';
import { getQuestionStatListService } from '../../../services/stat';
import { useParams, useSearchParams } from 'react-router-dom';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../../../constant';
import { getQuestionService } from '../../../services/question';
import { Typography } from 'antd';
import LoadingComponent from '../../../components/LoadingComponent';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};

const PageStat: FC<PropsType> = (props: PropsType) => {
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10;
  const { id = '' } = useParams();
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
      refreshDeps: [searchParams],
    },
  );

  return (
    <div>
      {!loading && <Title level={3}>Total:{total}</Title>}
      {loading && <LoadingComponent></LoadingComponent>}
    </div>
  );
};

export default PageStat;
