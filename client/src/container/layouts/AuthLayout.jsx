import React, { useEffect } from "react";
import { Button, FloatButton, Layout, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ArrowLeftOutlined, ExclamationCircleFilled, FileAddOutlined, MoonFilled, PlusOutlined } from "@ant-design/icons";
import ScrollToTop from "react-scroll-to-top";

import constants from "../../config/constants";
import UserMenu from "./partials/UserMenu";
import { setDarkMode, setOpenPayModal } from "../../redux/app/appSlice";

import LogoSrc from "../../assets/images/logo.png";
import smLogoSrc from "../../assets/images/logo-sm.png";
import Settings from "./partials/Settings";

const { Header } = Layout;

function AuthLayout({ children }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkMode = useSelector(state => state.app.isDarkMode);


  const changeTheme = () => {
    dispatch(setDarkMode());
  }

  const setOpenModal = () => {
    dispatch(setOpenPayModal());
  }

  return (
    <>
      <Layout className="min-h-screen">
        <Header className={classNames("shadow sticky px-0 top-0 z-[999]", !isDarkMode && "bg-white")}>
          <div className="flex items-center justify-between px-2 max-w-7xl mx-auto">
            <div className={classNames("demo-logo h-[64px] mb-2", !isDarkMode && "bg-white")}>
              <Link to="/home" className="hidden sm:inline">
                <img src={LogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
              <Link to="/home" className="inline sm:hidden">
                <img src={smLogoSrc} alt="logo" className="w-[64px] p-3" />
              </Link>
            </div>
            <div className="flex items-center">
              <UserMenu />
            </div>
          </div>
        </Header>
        {/* <div onClick={() => {
          navigate(-1);
        }} className={classNames("sticky w-[75px] cursor-pointer top-20 -ml-11 hover:ml-0 ease-in-out transition-[margin] z-[998] px-2.5 py-2 rounded-e-3xl", isDarkMode ? "bg-gray-100" : "bg-gray-300")}>
          <span>Back</span> &nbsp; <ArrowLeftOutlined />
        </div> */}
        <Layout /* className="h-[1000px]" */>
          {children}
        </Layout>
        {/* <ScrollToTop smooth className="animate-bounce" /> */}
        {/* <FloatButton.BackTop /> */}
        <Settings />
      </Layout>
    </>
  );
}

export default AuthLayout;
