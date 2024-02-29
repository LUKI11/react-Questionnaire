import React, { FC, useEffect } from 'react';
import { QuestionParagraphPropsType } from './interface';
import { Checkbox, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

const { TextArea } = Input;

const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter]);
  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <>
      <Form
        layout="vertical"
        initialValues={{ text, isCenter }}
        form={form}
        disabled={disabled}
        onValuesChange={handleValueChange}
      >
        <Form.Item
          label="Paragraph"
          name="text"
          rules={[{ required: true, message: 'Please enter your paragraph' }]}
        >
          <TextArea></TextArea>
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox>Center</Checkbox>
        </Form.Item>
      </Form>
    </>
  );
};

export default PropComponent;
