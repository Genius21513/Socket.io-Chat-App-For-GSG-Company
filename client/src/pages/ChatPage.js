import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/SideDrawer";
import MyChats from "../components/chats/MyChats";
import ChatBox from "../components/chats/ChatBox";
import { ToastContainer } from "react-toastify";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }} className="chatContainer">
      {user && <SideDrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
      <ToastContainer theme="colored" />
    </div>
  );
};

export default ChatPage;
