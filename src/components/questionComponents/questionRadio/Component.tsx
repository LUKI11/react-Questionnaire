import React, { FC } from 'react';
import { QuestionRadioPropsType, QuestionRadioPropsDefault } from './interface';
import { Radio, Space, Typography } from 'antd';

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, options = [], value } = { ...QuestionRadioPropsDefault, ...props };
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((option) => {
            const { value, text } = option;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default Component;
