import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
