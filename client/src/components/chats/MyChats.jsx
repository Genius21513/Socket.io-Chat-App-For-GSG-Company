import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { Box, Text, Button, Stack, Avatar, Divider, Tooltip,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
} from "@chakra-ui/react";
import { IoMdAdd, IoMdPeople } from "react-icons/io";
import Loader from "../Loader";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { IoSearch } from "react-icons/io5";

import UserListItem from "./UserListItem";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const handleSearch = async () => {
    if (!search) {
      return toast.info("Please enter a query");
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/users?search=${search}`, config);

      setSearchResult(data.users);
      setLoading(false);
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    setLoading(true);
    setLoadingChat(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chats`, { userId }, config);
      if (!chats.find((item) => item._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      setLoading(false);
      setLoadingChat(false);
      onClose();
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

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
  }, [fetchAgain]);

  if (!loggedUser) {
    return <Loader />;
  }
  return (
    <>
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p="3"
      h="85vh"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      bg={"rgba(255, 255, 255, 0.885)"}
    >
      <Box 
          pb="3"
          px="3"
          fontSize={{ base: "1.25rem", md: "1.4rem" }}
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Tooltip label="Search to Connect" hasArrow placement="bottom-end">
            <Button variant="ghost" colorScheme={"blackAlpha"} onClick={onOpen}>
              <IoSearch />
              <Text d={{ base: "none", md: "flex" }} px="10">
                Search User
              </Text>
            </Button>
          </Tooltip>
      </Box>
      <Box
        pb="3"
        px="3"
        fontSize={{ base: "1.25rem", md: "1.4rem" }}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <Text>My Chats</Text> */}
        {user.user.role == 'superadmin' &&
          <GroupChatModal>
            <Button
              d="flex"
              fontSize={{ base: "1rem", md: "0.9rem", lg: "1rem" }}
              color="#fff"
              rightIcon={
                <div style={{ color: "#fff" }}>
                  <IoMdAdd />
                </div>
              }
              zIndex="0"
              colorScheme={"blackAlpha"}
              bg={"#1d1931"}
            >
              Create Team
            </Button>
          </GroupChatModal>
        }
      </Box>
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
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat, index) => (
              <div key={index}>
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#1d1931" : "e8e8e8"}
                  color={selectedChat === chat ? "#fff" : "#000"}
                  px="3"
                  py="2"
                  borderRadius="lg"
                  transition="200ms ease-in-out"
                  d="flex"
                >
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    bg={chat.isGroupChat ? "#1d1931" : null}
                    icon={
                      chat.isGroupChat && (
                        <IoMdPeople fontSize="1.5rem" color="#fff" />
                      )
                    }
                    src={
                      !chat.isGroupChat &&
                      getSender(loggedUser.user, chat.users)?.image
                    }
                    name={
                      !chat.isGroupChat &&
                      getSender(loggedUser.user, chat.users).name
                    }
                    mr="4"
                  />
                  <Text fontSize="1.25rem">
                    {!chat.isGroupChat
                      ? getSender(loggedUser?.user, chat?.users)?.name
                      : chat.chatName}
                  </Text>
                </Box>
                <Divider />
              </div>
            ))}
          </Stack>
        ) : (
          <Loader />
        )}
      </Box>
    </Box>
    <Drawer
      size="sm"
      placement="left"
      isOpen={isOpen}
      onClose={onClose}
      backdropFilter="blur(10px)"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody>
          <Box d="flex" pb={2}>
            <Input
              placeholder="Search by name or email"
              mr={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={handleSearch} fontSize="1.5rem">
              <IoSearch />
            </Button>
          </Box>
          {loading ? (
            <Loader />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Loader />}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    </>
  );
};

export default MyChats;
