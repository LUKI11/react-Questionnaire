import React, { FC, useEffect, useState } from 'react';
import { Typography, Result, Empty } from 'antd';
import { getComponentConfigByType } from '../../../components/questionComponents';
import { useRequest } from 'ahooks';
import { getComponentStatService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { ExclamationOutlined } from '@ant-design/icons';
import LoadingComponent from '../../../components/LoadingComponent';
const { Title } = Typography;

type ChartStatPropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const ChartStat: FC<ChartStatPropsType> = (props: ChartStatPropsType) => {
  const { selectedComponentType, selectedComponentId } = props;
  const { id = '' } = useParams();
  const [stat, setStat] = useState([]);

  //axios get chart data
  const { loading, run } = useRequest(
    async (id, selectedComponentId) => {
      const data = await getComponentStatService(id, selectedComponentId);
      return data;
    },
    {
      manual: true,
      onSuccess(data) {
        setStat(data.stat);
      },
    },
  );
  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId]);

  // generate chart component
  const genChartEle = () => {
    if (!selectedComponentId) return <Empty></Empty>;
    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {};
    if (StatComponent == null)
      return (
        <Result
          icon={<ExclamationOutlined />}
          title={
            <>
              <Title level={4}>No chart for this column</Title>
              <p style={{ fontSize: '16px' }}>Please Select another one</p>
            </>
          }
        ></Result>
      );
    if (loading) return <LoadingComponent />;
    return <StatComponent stat={stat}></StatComponent>;
  };

  return (
    <div>
      <Title>Chart</Title>
      {genChartEle()}
    </div>
  );
};

export default ChartStat;
