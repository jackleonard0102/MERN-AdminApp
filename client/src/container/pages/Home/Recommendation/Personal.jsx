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

const { Content } = Layout;
const { Title } = Typography;

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function PersonalRecommendation() {
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
              placeholder="ENTER CAPACITY"
              className="inline-block w-60 mx-2"
            />
            , hereby confirm that the following information is true and correct
            from my knowledge of the present status of the following person,
          </p>
          <div className="mb-4">
            <p>Names and Surname</p>
            <Input placeholder="NAMES AND SURNAME" />
          </div>
          <div className="mb-4">
            <p>Identity Number</p>
            <Input placeholder="ENTER ID NUMBER" />
          </div>
          <p>
            That the said person resides at stand number{" "}
            <Input placeholder="00500" className="inline-block w-20 mx-2" /> at{" "}
            <Input
              placeholder="SUBURB NAME"
              className="inline-block w-40 mx-2"
            />{" "}
            in{" "}
            <Input placeholder="TOWN NAME" className="inline-block w-40 mx-2" />
            ,{" "}
            <Input
              placeholder="REGION NAME"
              className="inline-block w-40 mx-2"
            />{" "}
            in{" "}
            <Input
              placeholder="MUNICIPAL NAME"
              className="inline-block w-40 mx-2"
            />{" "}
            under the jurisdiction of{" "}
            <Input
              placeholder="ENTER OFFICE OF AUTHORITY"
              className="inline-block w-40 mx-2"
            />
            .
          </p>
          <p className="mt-4">
            We therefore recommend him/her for any undertaking that would in
            turn benefit him or her.
          </p>
          <p className="mt-4">Hoping that you will find this order.</p>
          <p className="mt-4">Yours in service.</p>
          <div className="mt-4">
            <p>Signed by</p>
            <Input placeholder="ENTER NAME AND SURNAME" className="mb-2" />
            <p>Capacity</p>
            <Input placeholder="CAPACITY" />
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

export default PersonalRecommendation;
