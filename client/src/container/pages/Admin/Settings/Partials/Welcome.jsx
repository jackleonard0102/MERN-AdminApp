import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Upload,
  message,
  Spin,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useSelector, useDispatch } from 'react-redux';

import constants from '../../../../../config/constants';
import { getStorage } from '../../../../../helpers';
import { getUser, updateProfile } from '../../../../../redux/auth/authSlice';

const { Title, Text } = Typography;

const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG/WEBP file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function WelcomePageDetail() {
  const [form] = Form.useForm();
  const loader = useSelector((state) => state.auth.loader);
  const user = useSelector((state) => state.auth.user);
  const errors = useSelector((state) => state.auth.errors);
  const [refresh, setRefresh] = useState(0);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(user.logo);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  useEffect(() => {
    // Fetch and set settings data if needed
    // For example:
    // dispatch(getSettings());
  }, [dispatch]);

  const updateSettings = async (values) => {
    try {
      const response = await fetch(`${constants.HOST_URL}settings/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getStorage('token'),
        },
        body: JSON.stringify({
          siteCode: values.siteCode,
          appVersion: values.appVersion,
        }),
      });
      const data = await response.json();
      if (data.success) {
        message.success('Settings updated successfully');
      } else {
        message.error('Failed to update settings');
      }
    } catch (error) {
      message.error('Error updating settings');
      console.error(error);
    }
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // Update logo and settings
    updateSettings(values);
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response?.path);
      setUploadedImageUrl(`${constants.SOCKET_URL}${info.file.response?.path}`);
      setLoading(false);
      dispatch(getUser());
      setRefresh((prev) => prev + 1);
    }
  };

  return (
    <Card className="max-w-xl w-full shadow-lg">
      <div className="my-4">
        <Title level={3}>Welcome Page Information</Title>
        <Text type="secondary">
          Update your welcome page's logo, site code, and app version.
        </Text>
      </div>
      <Form
        name="settings"
        form={form}
        initialValues={{
          siteCode: user.siteCode || '',
          appVersion: user.appVersion || '',
        }}
        className="form"
        scrollToFirstError
        onFinish={onFinish}
      >
        <Form.Item name="logo">
          <ImgCrop rotationSlider>
            <Upload
              name="file"
              listType="picture-card"
              className="logo-uploader"
              multiple={false}
              showUploadList={false}
              action={`${constants.HOST_URL}settings/upload-logo`}
              accept="image/*"
              headers={{
                Authorization: getStorage('token'),
              }}
              data={{
                oldFile: imageUrl,
              }}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {loading ? (
                <Spin />
              ) : (
                <div className="relative">
                  <img
                    src={
                      uploadedImageUrl || imageUrl
                        ? `${constants.SOCKET_URL}${uploadedImageUrl || imageUrl}?reload=${new Date().getTime()}`
                        : '/imgs/logo.jpg'
                    }
                    alt="logo"
                    className="w-full rounded-full"
                  />
                  <div className="rounded-full absolute top-0 left-0 w-full h-full hover:bg-[#000a] opacity-0 hover:opacity-100 flex items-center justify-center text-white">
                    Change
                  </div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item
          name="siteCode"
          rules={[
            {
              required: true,
              message: 'Please input the Site Code!',
            },
          ]}
        >
          <Input size="large" placeholder="Site Code" />
        </Form.Item>
        <Form.Item
          name="appVersion"
          rules={[
            {
              required: true,
              message: 'Please input the App Version!',
            },
          ]}
        >
          <Input size="large" placeholder="App Version" />
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

export default WelcomePageDetail;
