import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Drawer } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  DashboardOutlined,
  EditOutlined,
  FileTextOutlined,
  SearchOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import UserMenu from './partials/UserMenu';
import LogoSrc from '../../assets/images/logo.png';
import smLogoSrc from '../../assets/images/logo-sm.png';
import Settings from './partials/Settings';
import { logout } from '../../redux/auth/authSlice';

const { Header } = Layout;

function AuthLayout({ children }) {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.app.isDarkMode);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const dispatch = useDispatch();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      key: '/dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: 'Search',
      key: '/search',
      icon: <SearchOutlined />,
    },
    {
      label: 'New Entry',
      key: 'sub1',
      children: [
        {
          key: '/new-entry/personal',
          label: 'Personal',
          icon: <UserAddOutlined />,
        },
        {
          key: '/new-entry/business',
          label: 'Business',
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: 'Recommendation',
      key: 'sub2',
      children: [
        {
          key: '/recommendations/general',
          label: 'General',
          icon: <EditOutlined />,
        },
        {
          key: '/recommendations/personal',
          label: 'Personal',
          icon: <UserAddOutlined />,
        },
        {
          key: '/recommendations/business',
          label: 'Business',
          icon: <UsergroupAddOutlined />,
        },
      ],
    },
    {
      label: 'Report',
      key: '/reports',
      icon: <FileTextOutlined />,
    },
    {
      label: 'Logout',
      key: '/logout',
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <>
      <Layout className="min-h-screen">
        <Header
          className={classNames('shadow sticky top-0 z-[999]', {
            'bg-white text-black': !isDarkMode,
            //   'bg-gray-900 text-white': isDarkMode,
          })}
        >
          <div className="flex items-center max-w-7xl mx-auto w-full">
            <div className={classNames('h-16')}>
              <Link to="/dashboard" className="hidden sm:inline">
                <img src={LogoSrc} alt="logo" className="h-16 p-3" />
              </Link>
              <Link to="/dashboard" className="inline sm:hidden">
                <img src={smLogoSrc} alt="logo" className="h-16 p-3" />
              </Link>
            </div>
            <Menu
              mode="horizontal"
              theme={isDarkMode ? 'dark' : 'light'}
              defaultSelectedKeys={['2']}
              items={menuItems}
              className={classNames('flex-1 min-w-0 flex justify-end')}
              onClick={({ key }) => {
                if (key == '/logout') {
                  return dispatch(logout());
                }
                navigate(key);
              }}
            />
          </div>
        </Header>
        <Layout>{children}</Layout>
        <Settings />
      </Layout>
    </>
  );
}

export default AuthLayout;
