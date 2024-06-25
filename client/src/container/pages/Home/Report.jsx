import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row, Input, Layout, Typography } from "antd";

import { setStorage } from "../../../helpers";

const { Search } = Input;
const { Title } = Typography;
const { Content } = Layout;

function Report() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Content className="text-center max-w-7xl w-full mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <Title level={2} className="my-5">
            REPORTS
          </Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Town" allowClear />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Suburb" allowClear />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Ward Number" allowClear />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Residential" allowClear />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Business Type" allowClear />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Municipal" allowClear />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Select Date" allowClear />
        </Col>
        <Col span={1} className="justify-center items-center my-auto">
          <p className="my-auto"> to </p>
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search placeholder="Select Date" allowClear />
        </Col>
      </Row>
    </Content>
  );
}

export default Report;
