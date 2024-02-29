import React, { FC, useEffect } from 'react';
import { QuestionTextareaPropsType } from './interface';
import { Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder]);
  const handleValuesChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="Title" name="title">
        <Input></Input>
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input></Input>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
