import React, { useState } from "react";
import { Form, Upload, Card, Typography, Spin, message } from "antd";
import ImgCrop from "antd-img-crop";
import { useSelector, useDispatch } from "react-redux";
import { updateLoginLogo } from "../../../redux/auth/authSlice";
import { postRequestWithFiles } from "../../../services/axiosClient";
import constants from "../../../config/constants";
import { getStorage } from "../../../helpers";

const { Title, Text } = Typography;

const LoginLogoUpload = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      try {
        const formData = new FormData();
        formData.append("file", info.file.originFileObj);

        const response = await postRequestWithFiles("logos/upload", formData);
        dispatch(updateLoginLogo({ logoUrl: response.data.logoUrl }));
        message.success("Login page logo uploaded successfully!");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error("Failed to upload login page logo.");
        console.error("Error uploading login page logo:", error);
      }
    }
  };

  return (
    <Card className="max-w-xl mx-auto my-20 w-full shadow-lg">
      <div className="my-4">
        <Title level={3}>Edit Logo</Title>
        <Text type="secondary">
          Upload your welcome screen's custom logo.
        </Text>
      </div>
      <Form>
        <Form.Item name="logo">
          <ImgCrop>
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${constants.HOST_URL}logos/upload`}
              headers={{
                Authorization: getStorage("token"),
              }}
              beforeUpload={(file) => {
                const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
                if (!isJpgOrPng) {
                  message.error("You can only upload JPG/PNG file!");
                  return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  message.error("Image must smaller than 2MB!");
                  return false;
                }
                return isJpgOrPng && isLt2M;
              }}
              onChange={handleChange}
            >
              {loading ? <Spin /> : <div>Upload Login Page Logo</div>}
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginLogoUpload;
