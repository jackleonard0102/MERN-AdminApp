import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Image,
  Button,
  Checkbox,
  Card,
  Typography,
  Modal,
  message
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../../redux/auth/authSlice';
import GuestLayout from '../../layouts/GuestLayout';
import { forgotPassword } from '../../../services/authAPI';
import axios from 'axios';

const { Title, Text } = Typography;

function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef();

  const loader = useSelector((state) => state.auth.loader);
  const errors = useSelector((state) => state.auth.errors);

  const [form] = Form.useForm();

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState({ siteCode: '', appVersion: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/settings')
      .then((response) => {
        console.log("Response from settings", response.data); // For debugging
        if (response.data && response.data.welcome) {
          setSettings(response.data.welcome);
        } else {
          // If the response structure is different, handle accordingly
          setSettings({ siteCode: 'N/A', appVersion: 'N/A' });
        }
      })
      .catch((error) => {
        message.error('Failed to load settings');
        console.error(error);
      });
  }, []);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const refreshImage = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <GuestLayout>
      <div className="absolute top-20 right-4">
        <Text>
          Site Code: {settings.siteCode || 'N/A'} <br />
          App Version: {settings.appVersion || 'N/A'}
        </Text>
      </div>
      <Card className="w-[400px] shadow-lg">
        <div className="flex justify-center items-center text-center my-1">
        <Image
          className="mb-5"
          width={100}
          src={`http://localhost:5000/upload/logo.png?${refreshKey}`}
          preview={false}
        />
        </div>
        <div className="flex justify-center items-center text-center my-1">
          <Title level={3}>Log In</Title>
        </div>
        <Form
          name="login_form"
          className="form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              type="email"
              placeholder="Email"
              autoComplete="username"
              ref={emailRef}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loader}
              type="primary"
              htmlType="submit"
              className="w-full"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        open={showForgotModal}
        title="Forgot Password"
        okText="Email Password Reset Link"
        cancelText="Cancel"
        maskClosable={false}
        onCancel={() => setShowForgotModal(false)}
        onOk={() => {
          setLoading(true);
          forgotPassword({
            ...form.getFieldsValue(),
          })
            .then((res) => {
              setMessage(res.data.message);
            })
            .catch((err) => {
              console.log(err);
              form.setFields([
                {
                  name: 'email',
                  errors: [err.response.data.message],
                },
              ]);
            })
            .finally(() => setLoading(false));
        }}
        styles={{
          mask: {
            background: '#000e',
          },
        }}
        width={350}
        okButtonProps={{ loading }}
      >
        <p className="mb-2">
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </p>
        {message && <p className="text-green-500 my-2">{message}</p>}
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input email for forgot password.',
              },
              {
                type: 'email',
                message: 'Invalid email',
              },
            ]}
          >
            <Input placeholder="Email" className="w-full" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </GuestLayout>
  );
}

export default Login;
