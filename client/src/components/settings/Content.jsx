import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import UsersSetting from "./UsersSetting";

const Content = ({ fetchAgain, setFetchAgain }) => {
  return (
    <Box
      d={{ base: "flex", md: "flex" }}
      alignItems="center"
      flexDir="column"
      maxH={{ base: "100vh", md: "85vh" }}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      border="1px rgba(255, 255, 255, 0.085) solid"
      backgroundColor="rgba(255, 255, 255, .85)"
      padding="2"
    >
      <Routes>
        <Route path="/" element={<UsersSetting/>}>
          <Route path="users" element={<UsersSetting/>} />
          <Route path="discussions" element={<UsersSetting/>} />
          <Route path="teams" element={<UsersSetting/>} />
        </Route>
      </Routes>
    </Box>
  );
};

export default Content;
