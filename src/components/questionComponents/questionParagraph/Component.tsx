import React, { FC } from 'react';
import { QuestionParagraphPropsType, QuestionParagraphDefaultProps } from './interface';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const Component: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text = '', isCenter = false } = { ...QuestionParagraphDefaultProps, ...props };
  const textArr = text.split('\n');
  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}>
      {textArr.map((text, index) => (
        <span key={index}>
          {index > 0 && <br />}
          {text}
        </span>
      ))}
    </Paragraph>
  );
};

export default Component;
