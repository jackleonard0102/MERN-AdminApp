import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Drawer } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  DashboardOutlined,
  EditOutlined,
  FileTextOutlined,
  SearchOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import UserMenu from './partials/UserMenu';
import LogoSrc from '../../assets/images/logo.png';
import smLogoSrc from '../../assets/images/logo-sm.png';
import Settings from './partials/Settings';

const { Header } = Layout;

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

function AuthLayout({ children }) {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.app.isDarkMode);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const size = useWindowSize();

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
  ];

  return (
    <>
      <Layout className="min-h-screen">
        <Header
          className={classNames(
            'shadow sticky top-0 z-[999] transition-colors duration-300',
            {
              'bg-white text-black': !isDarkMode,
              'bg-gray-900 text-white': isDarkMode,
            }
          )}
        >
          <div className="flex items-center justify-between px-2 max-w-7xl mx-auto">
            <div
              className={classNames('demo-logo h-[64px] mb-2', {
                'bg-white': !isDarkMode,
                'bg-gray-900': isDarkMode,
              })}
            >
              <Link to="/dashboard" className="hidden sm:inline">
                <img src={LogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
              <Link to="/dashboard" className="inline sm:hidden">
                <img src={smLogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {size.width >= 768 ? (
                <Menu
                  mode="horizontal"
                  className={classNames('bg-transparent border-b-0', {
                    'text-black': !isDarkMode,
                    'text-white': isDarkMode,
                  })}
                  items={menuItems}
                  onClick={({ item, key }) => {
                    navigate(key);
                  }}
                />
              ) : (
                <>
                  <Button
                    icon={<MenuOutlined />}
                    onClick={showDrawer}
                    className={classNames({
                      'text-black': !isDarkMode,
                      'text-white': isDarkMode,
                    })}
                  />
                  <Drawer
                    title="Menu"
                    placement="right"
                    onClose={onClose}
                    visible={drawerVisible}
                  >
                    <Menu
                      mode="inline"
                      items={menuItems}
                      onClick={({ item, key }) => {
                        navigate(key);
                        onClose();
                      }}
                    />
                  </Drawer>
                </>
              )}
              <div className="ml-4 ">
                <UserMenu />
              </div>
            </div>
          </div>
        </Header>
        <Layout>{children}</Layout>
        <Settings />
      </Layout>
    </>
  );
}

export default AuthLayout;
