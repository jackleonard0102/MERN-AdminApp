import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Table,
  Tag,
  Space,
  Pagination,
  Input,
  Modal,
  Form,
  InputNumber,
  Tooltip,
  message,
  Layout,
  Badge,
  Avatar,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import constants from "../../../config/constants";
import { updatePageState } from "../../../redux/user/userSlice";

import { getAllUsers } from "../../../services/userAPI";
import useForm from "../../../Hooks/useForm";

const { Search } = Input;
const { Content } = Layout;

function Users() {

  const dispatch = useDispatch();

  const pageState = useSelector(state => state.user);

  const [showGiveModal, setShowGiveModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(pageState.page);
  const [total, setTotal] = useState(pageState.total);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(pageState.pageSize);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, handleChange] = useForm({});
  const [form] = Form.useForm();

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
      key: "no",
      width: "70px",
      render: (_, row, index) => <>{(page - 1) * pageSize + index + 1} {row.socketId.length > 0 ? <Badge status="success" /> : <Badge status="default" />}</>,
    },
    {
      title: "Profile",
      dataIndex: "name",
      key: "name",
      render: (_, row) => <div className='flex items-center'>
        <Avatar size="large" src={row.avatar ? `${constants.SOCKET_URL}${row.avatar}` : '/imgs/avatar.png'} />
        <div className='ml-2'><b>{row.name}</b><br />{row.email}</div>
      </div>
    },
    // {
    //   title: "Plan",
    //   dataIndex: "plan",
    //   key: "plan",
    //   render: (_, row) => {
    //     if (row.plan) {
    //       return (
    //         <>
    //         <Tooltip placement="top" title={"Property"}>
    //           <Tag color="#108ee9">{_.property}</Tag>
    //         </Tooltip>
    //         <Tooltip placement="top" title={"Document"}>
    //           <Tag color="#108ee9">{_.document}</Tag>
    //         </Tooltip>
    //         {/* <Tooltip placement="top" title={"Account"}>
    //           <Tag color="#108ee9">{_.property}</Tag>
    //         </Tooltip> */}
    //         </>
    //       );
    //     }
    //   },
    // },
    {
      title: "UTM Params",
      dataIndex: "utm_source",
      key: "utm_source",
      render: (_, row) => <div>
        <p className="m-0"><span className="font-bold">Source</span>: {_}</p>
        <p className="m-0"><span className="font-bold">Medium</span>: {row.utm_medium}</p>
        <p className="m-0"><span className="font-bold">Campaign</span>: {row.utm_campaign}</p>
        <p className="m-0"><span className="font-bold">Content</span>: {row.utm_content}</p>
      </div>
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_) => {
        return moment(_).format("MM/DD/YY hh:mm A");
      },
    },
    // {
    //   title: "Projects",
    //   dataIndex: "projects",
    //   key: "projects",
    //   render: (_, row) => {
    //     // console.log(_);
    //     let isGenerating = _.reduce((accumulator, project) => accumulator + project.resultImages.filter(img => (img.status == 'pending' || img.status == 'processing')).length, 0);
    //     return <Link to={`/projects/${row._id}`}>
    //       <Badge status="success" count={isGenerating}>
    //         <Button size="small">{_?.length || 0}/{_.reduce(
    //           (accumulator, item) => accumulator + item.resultImages.length,
    //           0,
    //         )}</Button>
    //       </Badge>
    //     </Link>;
    //   },
    // },
    // {
    //   title: "Action",
    //   key: "_id",
    //   render: (_, row) => (
    //     <Space size="middle">
    //       <Button
    //         type="primary"
    //         size="small"
    //         onClick={() => {
    //           // if(row.activeSubscriptionId) {
    //             setSelectedUser(row);
    //             form.setFieldValue('property', row.plan?.property || 1);
    //             form.setFieldValue('document', row.plan?.document || 1);
    //             setShowGiveModal(true);
    //           // } else {
    //           //   message.warning("No active subscription.");
    //           // }
    //         }}
    //       >
    //         Give
    //       </Button>
    //       <Link to={`/admin/users/${row._id}/history`}>
    //         <Button type="dashed" danger size="small">View</Button>
    //       </Link>
    //     </Space>
    //   ),
    // },
  ];

  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const getUsers = (current) => {
    setLoading(true);
    getAllUsers({
      ...formData,
      page: current || page,
      limit: pageSize,
    }).then((data) => {
      setLoading(false);
      setUsers(data.users.map((user) => ({ ...user, key: user._id })));
      setTotal(data.total);
      dispatch(updatePageState({
        total: data.total,
        page,
        pageSize,
      }));
    });
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setPageSize(pageSize);
  };

  const onSearch = () => {
    if (page == 1) {
      getUsers(1);
    } else {
      setPage(1);
    }
  };

  return (
    <Content className="mx-auto p-2 px-5 my-5">
      <Row gutter={[16, 16]}>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Name..."
            allowClear
            value={formData.name}
            name="name"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Email..."
            allowClear
            value={formData.email}
            name="email"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Utm Source..."
            allowClear
            value={formData.utm_source}
            name="utm_source"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col sm={12} md={8} lg={6} xl={4}>
          <Search
            placeholder="Utm Campaign..."
            allowClear
            value={formData.utm_campaign}
            name="utm_campaign"
            onChange={handleChange}
            onSearch={onSearch}
          />
        </Col>
        <Col span={24}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={users}
            pagination={false}
          />
          <div className="text-right mt-2">
            <Pagination
              showQuickJumper
              showSizeChanger
              pageSize={pageSize}
              current={page}
              total={total}
              onChange={handlePageChange}
            />
          </div>
        </Col>
      </Row>
      {/* <Modal
        open={showGiveModal}
        title="Increase plan"
        okText="Submit"
        cancelText="Cancel"
        onCancel={() => setShowGiveModal(false)}
        onOk={() => {
          
        }}
        okButtonProps={{ loading }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="property"
            label="Property"
            rules={[
              {
                required: true,
                message: "Please input the count of property",
              },
            ]}
          >
            <InputNumber className="w-full" size="large" min={1} />
          </Form.Item>
          <Form.Item
            name="document"
            label="Document"
            rules={[
              {
                required: true,
                message: "Please input the count of document",
              },
            ]}
          >
            <InputNumber className="w-full" size="large" min={1} />
          </Form.Item>
        </Form>
      </Modal> */}
    </Content>
  );
}

export default Users;
