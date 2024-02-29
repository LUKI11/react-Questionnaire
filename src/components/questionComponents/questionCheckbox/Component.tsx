import React, { FC } from 'react';
import { QuestionCheckboxPropsType, QuestionCheckboxPropsDefault } from './interface';
import { Checkbox, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, list = [], isVertical } = { ...QuestionCheckboxPropsDefault, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((item) => {
          const { value, text, isChecked } = item;
          return (
            <Checkbox key={value} value={value} checked={isChecked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
