import React, { useState } from 'react';
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
  Modal,
} from 'antd';

const { Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const uploadProps = {
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

const onFinish = async (values) => {
  const formData = new FormData();

  formData.append(
    'member',
    JSON.stringify({
      gender: values.memberGender,
      disabilities: values.memberDisabilities,
      firstName: values.memberFirstName,
      secondName: values.memberSecondName,
      surname: values.memberSurname,
      idNumber: values.memberIDNumber,
    })
  );

  formData.append(
    'jointMember',
    JSON.stringify({
      gender: values.jointGender,
      disabilities: values.jointDisabilities,
      firstName: values.jointFirstName,
      secondName: values.jointSecondName,
      surname: values.jointSurname,
      idNumber: values.jointIDNumber,
    })
  );

  formData.append(
    'beneficiary',
    JSON.stringify({
      gender: values.beneficiaryGender,
      disabilities: values.beneficiaryDisabilities,
      firstName: values.beneficiaryFirstName,
      secondName: values.beneficiarySecondName,
      surname: values.beneficiarySurname,
      idNumber: values.beneficiaryIDNumber,
    })
  );

  formData.append(
    'landDetails',
    JSON.stringify({
      latLong: values.latLong,
      wardNumber: values.wardNumber,
      town: values.town,
      suburb: values.suburb,
      region: values.region,
      municipal: values.municipal,
      areaSize: values.areaSize,
      vdNumber: values.vdNumber,
    })
  );

  formData.append('endorsements', values.endorsements);

  const idCopies = document.querySelector('[name="idCopies"]').files[0];
  const authorityLetter = document.querySelector('[name="authorityLetter"]').files[0];

  if (idCopies) formData.append('idCopies', idCopies);
  if (authorityLetter) formData.append('authorityLetter', authorityLetter);

  try {
    const response = await fetch('http://localhost:5000/api/personal-entry', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function PersonalEntry() {
  const [isJointModalVisible, setJointModalVisible] = useState(false);
  const [isBeneficiaryModalVisible, setBeneficiaryModalVisible] = useState(false);

  const showJointModal = () => {
    setJointModalVisible(true);
  };

  const handleJointModalOk = () => {
    setJointModalVisible(false);
  };

  const handleJointModalCancel = () => {
    setJointModalVisible(false);
  };

  const showBeneficiaryModal = () => {
    setBeneficiaryModalVisible(true);
  };

  const handleBeneficiaryModalOk = () => {
    setBeneficiaryModalVisible(false);
  };

  const handleBeneficiaryModalCancel = () => {
    setBeneficiaryModalVisible(false);
  };

  return (
    <>
      <Content className="text-center max-w-7xl mx-auto w-full p-2 my-5">
        <Title level={2} className="my-5">
          Personal Entry
        </Title>

        <Collapse defaultActiveKey={['1']}>
          <Panel header="Member" className="text-start" key="1">
            {/* Member Form */}
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="memberGender"
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
                    name="memberDisabilities"
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
                    name="memberFirstName"
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
                    name="memberSecondName"
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
                    name="memberSurname"
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
                    name="memberIDNumber"
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

          <Panel
            header="Joint Member"
            className="text-start"
            key="2"
            extra={
              <Button
                type="primary"
                onClick={(event) => {
                  event.stopPropagation();
                  showJointModal();
                }}
              >
                Add Joint Member
              </Button>
            }
          >
            {/* Joint Member Form */}
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {/* Form content here */}
            </Form>
          </Panel>

          <Panel
            header="Beneficiary"
            className="text-start"
            key="3"
            extra={
              <Button
                type="primary"
                onClick={(event) => {
                  event.stopPropagation();
                  showBeneficiaryModal();
                }}
              >
                Add Beneficiary
              </Button>
            }
          >
            {/* Beneficiary Form */}
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {/* Form content here */}
            </Form>
          </Panel>

          <Panel header="Land Details" className="text-start" key="4">
            {/* Land Details Form */}
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Latitude, Longitude"
                    name="latLong"
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
                    name="town"
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
                    name="suburb"
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
                    name="region"
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
                    name="municipal"
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
                    name="areaSize"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Area Size!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="VD Number"
                    name="vdNumber"
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
              </Row>
            </Form>
          </Panel>

          <Panel header="Endorsements" className="text-start" key="5">
            {/* Endorsements Form */}
            <Form
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="Endorsements"
                    name="endorsements"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Endorsements!',
                      },
                    ]}
                  >
                    <TextArea rows={4} onChange={onChange} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>

        <Form>
          <Row className="mt-5 mb-8" gutter={24}>
            <Col span={12}>
              <Form.Item name="idCopies">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>ID Copies Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="authorityLetter">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Authority Letter</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="flex justify-center">
          <Button className="mx-3" type="primary">
            Save
          </Button>
          <Button className="mx-3" type="primary">
            Clear
          </Button>
        </div>

        <Modal
          title="Add Joint Member"
          visible={isJointModalVisible}
          onOk={handleJointModalOk}
          onCancel={handleJointModalCancel}
          footer={null}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="jointGender"
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
            <Form.Item
              name="jointDisabilities"
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
            <Form.Item
              label="First Name"
              name="jointFirstName"
              rules={[
                {
                  required: true,
                  message: 'Please input your firstname!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Second Name"
              name="jointSecondName"
              rules={[
                {
                  required: true,
                  message: 'Please input your secondname!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Surname"
              name="jointSurname"
              rules={[
                {
                  required: true,
                  message: 'Please input your surname!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ID Number"
              name="jointIDNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input your ID number!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </Modal>

        <Modal
          title="Add Beneficiary"
          visible={isBeneficiaryModalVisible}
          onOk={handleBeneficiaryModalOk}
          onCancel={handleBeneficiaryModalCancel}
          footer={null}
        >
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="beneficiaryGender"
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
            <Form.Item
              name="beneficiaryDisabilities"
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
            <Form.Item
              label="First Name"
              name="beneficiaryFirstName"
              rules={[
                {
                  required: true,
                  message: 'Please input your firstname!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Second Name"
              name="beneficiarySecondName"
              rules={[
                {
                  required: true,
                  message: 'Please input your secondname!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Surname"
              name="beneficiarySurname"
              rules={[
                {
                  required: true,
                  message: 'Please input your surname!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="ID Number"
              name="beneficiaryIDNumber"
              rules={[
                {
                  required: true,
                  message: 'Please input your ID number!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </Modal>
      </Content>
    </>
  );
}

export default PersonalEntry;
