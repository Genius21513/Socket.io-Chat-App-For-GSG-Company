import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Box, Text, Button, Stack, Divider,
} from "@chakra-ui/react";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const LeftMenu = ({ }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const navigate = useNavigate();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/chats`, config);
      setChats(data);
    } catch (err) {
      toast.error(err);
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("deLinkUser")));
    fetchChats();
  }, []);

  if (!loggedUser) {
    return <Loader />;
  }
  return (
    <>
    <Box
      d={{ base: "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p="3"
      h="85vh"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      bg={"rgba(255, 255, 255, 0.885)"}
    > 
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#f8f8f8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        <Stack overflowY="scroll">
            <div>
              <Box
                cursor="pointer"
                bg={"e8e8e8"}
                color={"#000"}
                px="3"
                py="2"
                borderRadius="lg"
                transition="200ms ease-in-out"
                d="flex"
                onClick={() => navigate('/settings/users')}
              >
                <Text fontSize="1.25rem">
                  Users
                </Text>
              </Box>
              <Divider />
            </div>
            <div>
              <Box
                cursor="pointer"
                bg={"e8e8e8"}
                color={"#000"}
                px="3"
                py="2"
                borderRadius="lg"
                transition="200ms ease-in-out"
                d="flex"
                onClick={() => navigate('/settings/discussions')}
              >
                <Text fontSize="1.25rem">
                  Discussions
                </Text>
              </Box>
              <Divider />
            </div>
            <div>
              <Box
                cursor="pointer"
                bg={"e8e8e8"}
                color={"#000"}
                px="3"
                py="2"
                borderRadius="lg"
                transition="200ms ease-in-out"
                d="flex"
                onClick={() => navigate('/settings/teams')}
              >
                <Text fontSize="1.25rem">
                  Teams
                </Text>
              </Box>
              <Divider />
            </div>
        </Stack>
      </Box>
    </Box>
    </>
  );
};

export default LeftMenu;
