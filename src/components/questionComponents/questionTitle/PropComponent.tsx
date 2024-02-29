import React, { FC, useEffect } from 'react';
import { QuestionTitlePropsType } from './interface';
import { Checkbox, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter]);
  // return change props to father component
  const handleValueChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      initialValues={{ text, level, isCenter }}
      form={form}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label="Title"
        name="text"
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="FontSize" name="level">
        <Select
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>Center</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
