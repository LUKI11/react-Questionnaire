import React, { FC, useMemo } from 'react';
import { QuestionRadioStatPropsType } from './interface';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import randomColor from 'randomcolor';

const format = (n: number) => (n * 100).toFixed(2);

const StatComponent: FC<QuestionRadioStatPropsType> = (props: QuestionRadioStatPropsType) => {
  const { stat = [] } = props;
  const colors = randomColor({
    count: stat.length,
    luminosity: 'bright',
  });
  const sum = useMemo(() => {
    return stat.reduce((total, ele) => (total += ele.count), 0);
  }, [stat]);

  return (
    <div style={{ width: '300px', height: '250px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="count"
            isAnimationActive={false}
            data={stat}
            cx="50%"
            cy="50%"
            label={(i) => `${i.name}:${format(i.count / sum)}%`}
          >
            {stat.map((entry, index) => (
              <Cell key={index} fill={colors[index]}></Cell>
            ))}
          </Pie>
          <Tooltip></Tooltip>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatComponent;
