import React, { FC } from 'react';
import { QuestionTextareaPropsDefault, QuestionTextareaPropsType } from './interface';
import { Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const Component: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder } = { ...QuestionTextareaPropsDefault, ...props };
  return (
    <div>
      <Title level={4}>{title}</Title>
      <TextArea placeholder={placeholder}></TextArea>
    </div>
  );
};

export default Component;
