import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Button,
  message,
  Layout,
  DatePicker,
  Row,
  Typography,
  Form,
  Input,
  Select,
  Upload,
} from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

function GeneralRecommendation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Content className="max-w-7xl mx-auto w-full p-2 my-5">
        <Title level={2} className="my-5 text-center">
          RECOMMEDATION LETTER
        </Title>
        <div className="flex justify-between mb-4">
          <div>
            <p>Reference Number</p>
            <Input placeholder="AUTO CREATE" disabled />
          </div>
          <div>
            <p>Date</p>
            <DatePicker placeholder="AUTO CREATE" className="w-full" />
          </div>
        </div>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="To Which Organization"
                name="organization"
                rules={[
                  { required: true, message: "Please input the organization!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please input the address!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Attention of" name="attention">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Re: Subject" name="subject">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Letter Body"
                name="body"
                rules={[
                  { required: true, message: "Please input the letter body!" },
                ]}
              >
                <TextArea rows={6} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Signed by"
                name="signedBy"
                rules={[{ required: true, message: "Please input the name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Title" name="title">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Organization" name="signingOrganization">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <div className="flex justify-center space-x-4">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button type="primary" htmlType="button">
                Clear
              </Button>
              <Button type="primary" htmlType="button">
                Exit
              </Button>
              <Button type="primary" htmlType="button">
                Preview
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
}

export default GeneralRecommendation;
