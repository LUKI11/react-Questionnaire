import React, { FC } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { QuestionCheckboxStatPropsType } from './interface';

const StatComponent: FC<QuestionCheckboxStatPropsType> = (props: QuestionCheckboxStatPropsType) => {
  const { stat = [] } = props;
  return (
    <div style={{ width: '300px', height: '250px' }}>
      <ResponsiveContainer>
        <BarChart
          data={stat}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip></Tooltip>

          <XAxis dataKey="name"></XAxis>
          <YAxis></YAxis>
          <Bar dataKey="count" fill="#8884d8" background={{ fill: '#eee' }}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
