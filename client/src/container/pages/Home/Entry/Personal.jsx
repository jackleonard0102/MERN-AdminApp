import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import {
  Col,
  Button,
  message,
  Layout,
  Row,
  Typography,
  Form,
  Input,
  Select,
  Upload,
  Collapse,
} from 'antd';

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

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

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function PersonalEntry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Content className="text-center max-w-7xl mx-auto w-full p-2 my-5">
        <Title level={2} className="my-5">
          Personal Entry
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
                    name="Gender"
                    label="Gender"
                    rules={[
                      { required: true, message: 'Please select Gender' },
                    ]}
                  >
                    <Select placeholder="Select Gender">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Disabilities"
                    label="Disabilities"
                    rules={[
                      { required: true, message: 'Please select Disabilities' },
                    ]}
                  >
                    <Select placeholder="Select Disabilities">
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="FirstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your firstname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Second Name"
                    name="SecondName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your secondname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Surname"
                    name="Surname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your surname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="ID Number"
                    name="ID_Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your ID number!',
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
                <Col span={12}>
                  <Form.Item
                    name="Gender"
                    label="Gender"
                    rules={[
                      { required: true, message: 'Please select Gender' },
                    ]}
                  >
                    <Select placeholder="Select Gender">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Disabilities"
                    label="Disabilities"
                    rules={[
                      { required: true, message: 'Please select Disabilities' },
                    ]}
                  >
                    <Select placeholder="Select Disabilities">
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="FirstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your firstname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Second Name"
                    name="SecondName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your secondname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Surname"
                    name="Surname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your surname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="ID Number"
                    name="ID_Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your ID number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Panel>

          <Panel header="Beneficiary" className="text-start" key="3">
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
                    name="Gender"
                    label="Gender"
                    rules={[
                      { required: true, message: 'Please select Gender' },
                    ]}
                  >
                    <Select placeholder="Select Gender">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Disabilities"
                    label="Disabilities"
                    rules={[
                      { required: true, message: 'Please select Disabilities' },
                    ]}
                  >
                    <Select placeholder="Select Disabilities">
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="FirstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your firstname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Second Name"
                    name="SecondName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your secondname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Surname"
                    name="Surname"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your surname!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="ID Number"
                    name="ID_Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your ID number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Stand Number"
                    name="Stand_Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Stand Number!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="Landuse"
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
                    label="Address"
                    name="Address"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your address!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Location"
                    name="Location"
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
                    label="Latitude, Longitude"
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
                    name="WardNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Ward Number!',
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
                <Col span={12}>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>ID Copies Upload</Button>
                  </Upload>
                </Col>
                <Col span={12}>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Authority Letter</Button>
                  </Upload>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>

        <div className="my-6">
          <TextArea
            showCount
            maxLength={1000}
            onChange={onChange}
            placeholder="Note ..."
            style={{
              height: 120,
              resize: 'none',
            }}
          />
        </div>
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
          <Button className="mx-3" type="primary">
            Add Beneficiary
          </Button>
        </div>
      </Content>
    </>
  );
}

export default PersonalEntry;
