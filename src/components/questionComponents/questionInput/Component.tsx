import React, { FC } from 'react';
import { QuestionInputPropsDefault, QuestionInputPropsType } from './interface';
import { Typography, Input } from 'antd';
const { Paragraph } = Typography;

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputPropsDefault, ...props };
  return (
    <>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </>
  );
};

export default QuestionInput;
