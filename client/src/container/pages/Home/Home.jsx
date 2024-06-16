import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Image, Layout, Row, Typography } from "antd";
import { getPlan } from "../../../redux/auth/authSlice";
import { setStorage } from "../../../helpers";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const plan = useSelector((state) => state.auth.plan);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPlan());
  }, []);

  return (
    <Content className="text-center max-w-7xl mx-auto p-2 my-5">
      <Row>
        <Col span={24}>
          <h3 className="text-lg sm:text-xl md:text-2xl mb-6">Hello World</h3>
        </Col>
        <Col span={24}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              Hello World
            </Col>
          </Row>
        </Col>
      </Row>
    </Content>
  );
}

export default Home;
