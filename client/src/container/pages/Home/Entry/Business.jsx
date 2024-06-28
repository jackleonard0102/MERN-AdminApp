import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import {
  Col,
  Divider,
  Button,
  message,
  Layout,
  Row,
  Typography,
  Flex,
  Form,
  Input,
  Select,
  Upload,
  Collapse,
} from 'antd';

const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function BusinessEntry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Content className="text-center max-w-7xl mx-auto w-full p-2 my-5">
        <Title level={2} className="my-5">
          Business Entry
        </Title>

        <Collapse defaultActiveKey={['1']}>
          <Panel header="Member" className="text-start" key="1">
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="BusinessType"
                    label="Business Type"
                    rules={[
                      {
                        required: true,
                        message: 'Please select business type',
                      },
                    ]}
                  >
                    <Select placeholder="Select Business Type">
                      <Option value="B&B">B&B Rooms</Option>
                      <Option value="Bottle Store">Bottle Store</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
                <Col span={12}>
                  <Form.Item
                    label="Business Name"
                    name="BusinessName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your business name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Registration Number"
                    name="RegistrationNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your registration number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Panel>

          <Panel header="Joint Member" className="text-start" key="2">
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Row gutter={24}>
                <Col span={24}>
                  <Divider orientation="left"> Joint Member </Divider>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="BusinessType"
                    label="Business Type"
                    rules={[
                      {
                        required: true,
                        message: 'Please select business type',
                      },
                    ]}
                  >
                    <Select placeholder="Select Business Type">
                      <Option value="B&B">B&B Rooms</Option>
                      <Option value="Bottle Store">Bottle Store</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}></Col>
                <Col span={12}>
                  <Form.Item
                    label="Business Name"
                    name="BusinessName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your business name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Registration Number"
                    name="RegistrationNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your registration number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Stand Number"
                    name="StandNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your stand number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="LandUse"
                    label="Land Use"
                    rules={[
                      { required: true, message: 'Please select Land Use' },
                    ]}
                  >
                    <Select placeholder="Select Land Use">
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Latitude, Longtitude"
                    name="LatLong"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your location!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ward Number"
                    name="wardNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Wardnumber!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Town"
                    name="Town"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Town!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Suburb"
                    name="Suburb"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Suburb!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Region"
                    name="Region"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Region!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Municipal"
                    name="Municipal"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Municipal!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Area Size"
                    name="AreaSize"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your area size!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="VD Number"
                    name="VD_Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your VD Number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>
                      Registration Certificate
                    </Button>
                  </Upload>
                </Col>
                <Col span={8}>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Authority Letter</Button>
                  </Upload>
                </Col>
                <Col span={8}>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>ID Copy</Button>
                  </Upload>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>

        <Flex className="my-6" vertical gap={32}>
          <TextArea
            label=""
            showCount
            maxLength={1000}
            onChange={onChange}
            placeholder="Note ..."
            style={{
              height: 120,
              resize: 'none',
            }}
          />
        </Flex>
        <div className="flex justify-center">
          <Button className="mx-3" type="primary">
            Save
          </Button>

          <Button className="mx-3" type="primary">
            Clear
          </Button>

          <Button className="mx-3" type="primary">
            Add Joint Member
          </Button>
        </div>
      </Content>
    </>
  );
}

export default BusinessEntry;
