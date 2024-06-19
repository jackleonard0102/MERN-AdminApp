import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Flex,
  Form,
  Input,
  Select,
  Upload,
} from "antd";

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const { Content, Sider } = Layout;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

const onChange = (e) => {
  console.log("Change:", e.target.value);
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function BusinessRecommendation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Content className="max-w-7xl mx-auto w-full p-2 my-5">
        <Title level={2} className="my-5 text-center">
          PROOF OF ADDRESS
        </Title>

        <div className="p-8">
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
          <p>Subject : TO WHOM IT MAY CONCERN</p>
          <p className="mb-4">
            I, the undersigned in my capacity as{" "}
            <Input
              placeholder="Enter Capacity"
              className="inline-block w-60 mx-2"
            />
            , hereby confirm that the following information is true and correct
            from my knowledge of the present status of the following business;
          </p>
          <div className="mb-4">
            <p>Business Name</p>
            <Input placeholder="Business Name" />
          </div>
          <div className="mb-4">
            <p>Business Registration Number</p>
            <Input placeholder="Enter Business Registration Number" />
          </div>
          <p>
            That the said business operate at stand number{" "}
            <Input placeholder="00000" className="inline-block w-20 mx-2" /> at
            <Input
              placeholder="Suburb Name"
              className="inline-block w-40 mx-2"
            />{" "}
            in
            <Input placeholder="Town Name" className="inline-block w-40 mx-2" />
            ,
            <Input
              placeholder="Region Name"
              className="inline-block w-40 mx-2"
            />{" "}
            in
            <Input
              placeholder="Municipal Name"
              className="inline-block w-40 mx-2"
            />{" "}
            under the jurisdiction of{" "}
            <Input
              placeholder="Enter Office of Authority"
              className="inline-block w-40 mx-2"
            />
            .
          </p>
          <p className="mt-4">
            We therefore recommend it for any undertaking that would in turn
            benefit it.
          </p>
          <p className="mt-4">Hoping that you will find this order.</p>
          <p className="mt-4">Yours in service.</p>
          <div className="mt-4">
            <p>Signed by</p>
            <Input placeholder="Enter Name and Surname" className="mb-2" />
            <p>Capacity</p>
            <Input placeholder="Capacity" />
          </div>
          <div className="flex justify-center mt-6">
            <Button className="mx-3" type="primary">
              Save
            </Button>
            <Button className="mx-3" type="primary">
              Preview
            </Button>
            <Button className="mx-3" type="primary">
              Print
            </Button>
            <Button className="mx-3" type="primary">
              Cancel
            </Button>
          </div>
        </div>
      </Content>
    </>
  );
}

export default BusinessRecommendation;
