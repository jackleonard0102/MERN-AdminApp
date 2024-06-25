import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, Dropdown } from "antd";
import { Link, useLocation } from "react-router-dom"; // Add useLocation
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import UserMenu from "./partials/UserMenu";
import { setDarkMode } from "../../redux/app/appSlice";
import LogoSrc from "../../assets/images/logo.png";
import smLogoSrc from "../../assets/images/logo-sm.png";
import Settings from "./partials/Settings";

const { Header } = Layout;

const newEntryMenu = (
  <Menu>
    <Menu.Item key="personal">
      <Link to="/new-entry/personal">Personal</Link>
    </Menu.Item>
    <Menu.Item key="business">
      <Link to="/new-entry/business">Business</Link>
    </Menu.Item>
  </Menu>
);

const recommendationsMenu = (
  <Menu>
    <Menu.Item key="personal">
      <Link to="/recommendations/personal">Personal</Link>
    </Menu.Item>
    <Menu.Item key="business">
      <Link to="/recommendations/business">Business</Link>
    </Menu.Item>
    <Menu.Item key="general">
      <Link to="/recommendations/general">General</Link>
    </Menu.Item>
  </Menu>
);

function AuthLayout({ children }) {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.app.isDarkMode);
  const [menuVisible, setMenuVisible] = useState(false);
  const location = useLocation(); // Add useLocation

  useEffect(() => {
    setMenuVisible(false); // Reset menu visibility on route change
  }, [location.pathname]); // Dependency on location.pathname

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <Layout className="min-h-screen">
        <Header
          className={classNames(
            "shadow sticky top-0 z-[999] transition-colors duration-300",
            {
              "bg-white text-black": !isDarkMode,
              "bg-gray-900 text-white": isDarkMode,
            }
          )}
        >
          <div className="flex items-center justify-between px-2 max-w-7xl mx-auto">
            <div
              className={classNames("demo-logo h-[64px] mb-2", {
                "bg-white": !isDarkMode,
                "bg-gray-900": isDarkMode,
              })}
            >
              <Link to="/dashboard" className="hidden sm:inline">
                <img src={LogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
              <Link to="/dashboard" className="inline sm:hidden">
                <img src={smLogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
            </div>
            <div className="flex items-center sm:hidden">
              <Button type="text" icon={<MenuOutlined />} onClick={toggleMenu} />
            </div>
            <div
              className={classNames("flex items-center space-x-4", {
                "hidden sm:flex": !menuVisible,
                "flex flex-col sm:flex-row": menuVisible,
              })}
            >
              <Menu
                mode="horizontal"
                className={classNames(
                  "bg-transparent border-b-0 w-full sm:w-auto",
                  {
                    "text-black": !isDarkMode,
                    "text-white": isDarkMode,
                  }
                )}
              >
                <Menu.Item
                  key="dashboard"
                  className="hover:bg-transparent"
                  style={{ marginRight: "15px" }}
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
                <Menu.Item
                  key="search"
                  className="hover:bg-transparent"
                  style={{ marginRight: "15px" }}
                >
                  <Link to="/search">Search</Link>
                </Menu.Item>
                <Menu.Item
                  key="new-entry"
                  className="hover:bg-transparent"
                  style={{ marginRight: "15px" }}
                >
                  <Dropdown
                    overlay={newEntryMenu}
                    overlayClassName={classNames({
                      "bg-white text-black": !isDarkMode,
                      "bg-gray-900 text-white": isDarkMode,
                    })}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      New Entry <DownOutlined />
                    </a>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item
                  key="recommendations"
                  className="hover:bg-transparent"
                  style={{ marginRight: "15px" }}
                >
                  <Dropdown
                    overlay={recommendationsMenu}
                    overlayClassName={classNames({
                      "bg-white text-black": !isDarkMode,
                      "bg-gray-900 text-white": isDarkMode,
                    })}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      Recommendations <DownOutlined />
                    </a>
                  </Dropdown>
                </Menu.Item>
                <Menu.Item
                  key="reports"
                  className="hover:bg-transparent"
                  style={{ marginRight: "15px" }}
                >
                  <Link to="/reports">Reports</Link>
                </Menu.Item>
              </Menu>
              <div className="ml-4">
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
