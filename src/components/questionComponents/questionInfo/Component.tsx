import React, { FC } from 'react';
import { QuestionInfoPropsType, QuestionInfoPropsDefault } from './interface';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Component: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title = '', paragraph = '' } = { ...QuestionInfoPropsDefault, ...props };
  const paragraphArr = paragraph.split('\n');

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center' }}>
        {title}
      </Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: '0' }}>
        {paragraphArr.map((text, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {text}
            </span>
          );
        })}
      </Paragraph>
    </div>
  );
};

export default Component;
