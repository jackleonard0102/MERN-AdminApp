import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Table,
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
  Switch,
  Select,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import constants from "../../../config/constants";
import { updatePageState } from "../../../redux/user/userSlice";
import {
  getAllUsers,
  updateUserStatus,
  updateUserDetails,
  deleteUser,
  createUser,
} from "../../../services/userAPI";
import useForm from "../../../Hooks/useForm";

const { Search } = Input;
const { Content } = Layout;
const { Option } = Select;

function Users() {
  const dispatch = useDispatch();
  const pageState = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(pageState.page);
  const [total, setTotal] = useState(pageState.total);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(pageState.pageSize);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, handleChange] = useForm({});
  const [form] = Form.useForm();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();

  const columns = [
    {
      title: "No",
      dataIndex: "_id",
      key: "no",
      width: "70px",
      render: (_, row, index) => (
        <>
          {(page - 1) * pageSize + index + 1}{" "}
          {row.socketId.length > 0 ? (
            <Badge status="success" />
          ) : (
            <Badge status="default" />
          )}
        </>
      ),
    },
    {
      title: "Profile",
      dataIndex: "name",
      key: "name",
      render: (_, row) => (
        <div className="flex items-center">
          <Avatar
            size="large"
            src={
              row.avatar
                ? `${constants.SOCKET_URL}${row.avatar}`
                : "/imgs/avatar.png"
            }
          />
          <div className="ml-2">
            <b>{row.name}</b>
            <br />
            {row.email}
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, row) => (
        <Switch
          checked={row.status === 1}
          onChange={() => handleStatusChange(row._id, row.status)}
        />
      ),
    },
    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, row) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => showUpdateModal(row)}
          >
            Update
          </Button>
          <Button
            type="dashed"
            danger
            size="small"
            onClick={() => showDeleteModal(row._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
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
      dispatch(
        updatePageState({
          total: data.total,
          page,
          pageSize,
        })
      );
    });
  };

  const handlePageChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setPageSize(pageSize);
  };

  const onSearch = () => {
    if (page === 1) {
      getUsers(1);
    } else {
      setPage(1);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await updateUserStatus(userId, newStatus);
    getUsers();
  };

  const showUpdateModal = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      permission: user.permission,
    });
    setIsUpdateModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("avatar", values.avatar.file.originFileObj);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("permission", values.permission);

      await updateUserDetails(selectedUser._id, formData);
      setIsUpdateModalVisible(false);
      getUsers();
      message.success("User updated successfully");
    } catch (error) {
      message.error("Failed to update user");
    }
  };

  const showDeleteModal = (userId) => {
    setDeletingUserId(userId);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(deletingUserId);
      setIsDeleteModalVisible(false);
      getUsers();
      message.success("User deleted successfully");
    } catch (error) {
      message.error("Failed to delete user");
    }
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      const formData = new FormData();
      formData.append("avatar", values.avatar.file.originFileObj);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("permission", values.permission);

      await createUser(formData);
      setIsCreateModalVisible(false);
      getUsers();
      message.success("User created successfully");
    } catch (error) {
      message.error("Failed to create user");
    }
  };

  return (
    <Content className="mx-auto p-2 px-5 my-5">
      <Row gutter={[16, 16]} justify="end">
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
        <Col flex="auto" />
        <Col>
          <Button type="primary" onClick={() => setIsCreateModalVisible(true)}>
            Add New User
          </Button>
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
      <Modal
        visible={isUpdateModalVisible}
        title="Update User"
        okText="Update"
        cancelText="Cancel"
        onCancel={() => setIsUpdateModalVisible(false)}
        onOk={handleUpdate}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="avatar"
            label="Avatar"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.file)}
          >
            <Upload listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="permission"
            label="Permission"
            rules={[
              { required: true, message: "Please select the permission" },
            ]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={isDeleteModalVisible}
        title="Confirm Delete"
        okText="Yes"
        cancelText="No"
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={handleDelete}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
      <Modal
        visible={isCreateModalVisible}
        title="Create New User"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setIsCreateModalVisible(false)}
        onOk={handleCreate}
      >
        <Form form={createForm} layout="vertical">
          <Form.Item
            name="avatar"
            label="Avatar"
            valuePropName="file"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.file)}
            rules={[{ required: true, message: "Please upload an avatar" }]}
          >
            <Upload listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input the password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="permission"
            label="Permission"
            rules={[
              { required: true, message: "Please select the permission" },
            ]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}

export default Users;
