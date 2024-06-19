import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Image, Layout, Row, Typography, Card, Input } from "antd";
import { setStorage } from "../../../helpers";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Content className="text-center max-w-7xl mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <Title level={2} className="my-5">
            Search
          </Title>
        </Col>
        <Col span={24} className="mt-5">
          <Row gutter={[24, 24]}>
            <Col sm={12} md={12} lg={24} xl={24}>
              <Search placeholder="Enter the search code ..." allowClear/>
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

export default Dashboard;
