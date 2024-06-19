import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Image, Layout, Row, Typography, Card } from "antd";
import { setStorage } from "../../../helpers";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Content className="text-center max-w-7xl mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <Title level={2} className="my-5">
            Dashboard
          </Title>
        </Col>
        <Col span={24} className="mt-5">
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Card title="Total Areas" className="mr-3" bordered={false}>
                <p className="text-start mx-5">Towns</p>
                <p className="text-start mx-5">Suburbs</p>
                <p className="text-start mx-5">Wards</p>
                <p className="text-start mx-5">Municipalities</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Total Members" bordered={false}>
                <p>100000</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Members Status" bordered={false}>
                <p className="text-start mx-5">Disabled Persons</p>
                <p className="text-start mx-5">Residential</p>
                <p className="text-start mx-5">Businesses</p>
                <p className="text-start mx-5">Schools</p>
                <p className="text-start mx-5">Hospitals</p>
                <p className="text-start mx-5">Clinics</p>
                <p className="text-start mx-5">Retail Centers</p>
                <p className="text-start mx-5">Farms</p>
              </Card>
            </Col>
          </Row>
          {/* <Row gutter={[24, 24]} className="mt-4">
            <Col span={8}>
              <Card title="Card Title 4" bordered={false}>
                <p>Card content 4</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Card Title 5" bordered={false}>
                <p>Card content 5</p>
              </Card>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Content>
  );
}

export default Dashboard;
