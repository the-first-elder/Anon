import React, { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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