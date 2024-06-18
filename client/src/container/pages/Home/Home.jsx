import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Image, Layout, Row, Typography, Card } from "antd";
import { setStorage } from "../../../helpers";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Content className="text-center max-w-7xl mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <Title level={2} className="mb-2">
            Dashboard
          </Title>
          <Text type="secondary" className="mb-6">
            Welcome to your dashboard
          </Text>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Card title="Card Title 1" bordered={false}>
                <p>Card content 1</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Card Title 2" bordered={false}>
                <p>Card content 2</p>
              </Card>
            </Col>
          </Row>
          <Row gutter={[24, 24]} className="mt-4">
            <Col span={8}>
              <Card title="Card Title 3" bordered={false}>
                <p>Card content 3</p>
              </Card>
            </Col>
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
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

export default Home;
