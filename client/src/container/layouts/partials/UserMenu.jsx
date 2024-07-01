import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Dropdown } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  IdcardOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

import { logout } from '../../../redux/auth/authSlice';
import constants from '../../../config/constants';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [refreshKey, setRefreshKey] = useState(0); // Initialize with 0 or any value

  // Function to update the key and force refresh
  const refreshImage = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const items = [
    {
      label: 'Log Out',
      key: '/auth/logout',
      icon: <LockOutlined />,
    },
  ];

  if (user.isAdmin) {
    items.unshift({
      label: (
        <div className="flex items-center">
          <Avatar
            size="large"
            src={
              user.logo
                ? `${constants.SOCKET_URL}${
                    user.logo
                  }?reload=${new Date().getTime()}`
                : '/imgs/logo.jpg'
            }
          />
          <div className="ml-1">
            {user.name}
            <br />
            {user.email}
          </div>
        </div>
      ),
      key: 'user',
      type: 'group',
      children: [
        {
          label: 'Profile',
          key: '/admin/profile',
          icon: <IdcardOutlined />,
        },
        {
          label: 'Admin',
          key: 'admin',
          type: 'group',
          icon: <SafetyOutlined />,
          children: [
            {
              label: 'Users',
              key: '/admin/users',
              icon: <UserOutlined />,
            },
          ],
        },
      ],
    });
  }

  const handleClick = ({ item, key }) => {
    if (key === '/auth/logout') {
      dispatch(logout());
    } else {
      navigate(key);
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleClick,
      }}
      trigger={['click']}
      placement="bottomLeft"
      arrow
    >
      <Avatar
        src={`http://localhost:5000/upload/logo.png?${refreshKey}`}
        className="shadow-lg cursor-pointer"
      />
    </Dropdown>
  );
};

export default UserMenu;
