import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import SideDrawer from "../components/SideDrawer";
import LeftMenu from "../components/settings/LeftMenu";
import Content from "../components/settings/Content";
import { ToastContainer } from "react-toastify";

const SettingsPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setLoading(false);
  }, [])

  return (
    <div style={{ height: "100vh", overflow: "hidden" }} className="chatContainer">
      {loading? '' : <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91vh" p="10px">
        <LeftMenu />
        <Content />
      </Box>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default SettingsPage;
