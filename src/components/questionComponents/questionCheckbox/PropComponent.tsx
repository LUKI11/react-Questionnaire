import React, { FC, useEffect } from 'react';
import { ListType, QuestionCheckboxPropsType } from './interface';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';

const PropComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, list = [], isVertical, onChange, disabled } = props;
  const [form] = useForm();
  useEffect(() => {
    form.setFieldsValue({ title, list, isVertical });
  }, [title, list, isVertical]);

  const handleValuesChange = () => {
    if (onChange == null) return;
    const list = form.getFieldValue('list');
    (list as ListType[]).forEach((element) => {
      if (element.value) return;
      element.value = nanoid(5);
    });
    onChange(form.getFieldsValue());
  };
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, list, isVertical }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Options">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                const { key, name } = field;
                return (
                  <Space key={key} align="baseline">
                    {/* checkbox */}
                    <Form.Item name={[name, 'isChecked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    {/* text  */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: 'Please enter your option value' },
                        {
                          validator(_, value) {
                            const list = form.getFieldValue('list');
                            let num = 0;
                            list.forEach((item: ListType) => {
                              if (item.text === value) num++;
                            });
                            if (num === 1) return Promise.resolve();
                            return Promise.reject(new Error('Cannot have the same option value'));
                          },
                        },
                      ]}
                    >
                      <Input></Input>
                    </Form.Item>
                    {/* delete fn */}
                    <Form.Item>
                      {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                    </Form.Item>
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  type="link"
                  block
                  icon={<PlusCircleOutlined />}
                  onClick={() => add({ value: '', text: '', isChecked: false })}
                >
                  Add option
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>Display Vertical</Checkbox>
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
