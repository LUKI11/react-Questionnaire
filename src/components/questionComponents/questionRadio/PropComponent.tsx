import React, { FC, useEffect } from 'react';
import { QuestionRadioPropsType } from './interface';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { OptionType } from './interface';
import { nanoid } from '@reduxjs/toolkit';

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, options, isVertical, value });
  }, [title, options, isVertical, value]);
  const handleValuesChange = () => {
    const { options = [] } = form.getFieldsValue();
    (options as OptionType[]).forEach((element) => {
      if (element.value != '') return;
      element.value = nanoid(5);
    });
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  };
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
      form={form}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter your title' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Options">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* loop all options */}
              {fields.map((field, index) => {
                const { key, name } = field;
                return (
                  <Space key={key}>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please write your option' },
                        {
                          validator(_, value) {
                            const options = form.getFieldValue('options');
                            let num = 0;
                            options.forEach((element: OptionType) => {
                              if (value === element.text) num++;
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('Cannot have the same option'));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="write your option"></Input>
                    </Form.Item>
                    <Form.Item>
                      {index > 1 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                    </Form.Item>
                  </Space>
                );
              })}
              {/* add new option */}
              <Form.Item>
                <Button
                  type="link"
                  block
                  icon={<PlusCircleOutlined />}
                  onClick={() => add({ value: '', text: '' })}
                >
                  Add Option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="Default selection" name="value">
        <Select
          value={value}
          options={options.map(({ value, text }) => ({ value, label: text || ' ' }))}
        ></Select>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Display Vertical</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
