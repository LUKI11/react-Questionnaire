import React, { FC, useEffect } from 'react';
import { QuestionInfoPropsType } from './interface';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';

const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, paragraph, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, paragraph });
  }, [title, paragraph]);

  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ title, paragraph }}
        disabled={disabled}
        onValuesChange={handleValueChange}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter title' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item label="Paragraph" name="paragraph">
          <TextArea></TextArea>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
