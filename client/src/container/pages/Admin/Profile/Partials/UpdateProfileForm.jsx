import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfile } from '../../../../../redux/auth/authSlice';

const { Title, Text } = Typography;

function UpdateProfileForm() {
  const [form] = Form.useForm();
  const loader = useSelector((state) => state.auth.loader);
  const user = useSelector((state) => state.auth.user);
  const errors = useSelector((state) => state.auth.errors);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    dispatch(updateProfile(values));
  };

  return (
    <Card className="max-w-xl w-full shadow-lg">
      <div className="my-4">
        <Title level={3}>Profile Information</Title>
        <Text type="secondary">
          Update your profile information including your username and email.
        </Text>
      </div>
      <Form
        name="register"
        form={form}
        initialValues={{
          name: user.name,
          email: user.email,
        }}
        className="form"
        scrollToFirstError
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input size="large" placeholder="Name" autoFocus />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email}
        >
          <Input size="large" placeholder="E-mail" />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loader}
            type="primary"
            htmlType="submit"
            className="mt-2"
            size="large"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default UpdateProfileForm;
