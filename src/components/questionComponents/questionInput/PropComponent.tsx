import React, { FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { QuestionInputPropsType } from './interface';
import { useForm } from 'antd/es/form/Form';

const PropComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'necessary value' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input></Input>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
