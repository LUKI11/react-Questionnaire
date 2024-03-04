import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '../../../store/pageInfoReducer';

const PageInfo = () => {
  const pageInfo = useGetPageInfo();
  const [form] = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);

  // value change, update pageinfo data in redux
  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()));
  };
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="Title" name="title">
        <Input></Input>
      </Form.Item>
      <Form.Item label="Description" name="desc">
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item label="CSS" name="css">
        <TextArea></TextArea>
      </Form.Item>
      <Form.Item label="JavaScript" name="js">
        <TextArea></TextArea>
      </Form.Item>
    </Form>
  );
};

export default PageInfo;
