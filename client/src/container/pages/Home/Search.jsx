import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Image, Layout, Row, Typography, Card, Input } from "antd";
import { setStorage } from "../../../helpers";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

function GlobalSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Content className="text-center max-w-7xl w-full mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <Title level={2} className="my-5">
            Search
          </Title>
        </Col>
        <Col sm={8} md={8} lg={12} xl={12} className="mx-auto mt-5">
          <Search placeholder="Enter the search code ..." allowClear />
        </Col>
      </Row>
    </Content>
  );
}

export default GlobalSearch;
