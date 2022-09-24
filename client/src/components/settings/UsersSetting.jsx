import React from "react";
import { Box, Avatar } from "@chakra-ui/react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { AuthState } from "../../context/AuthProvider";
import { useEffect } from "react";
import { useState } from "react";

const UsersSetting = ({ fetchAgain, setFetchAgain }) => {
  const { user } = AuthState();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {    
    try {      
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };      
      const { data } = await axios.get(`/api/users`, config);            
      setUsers(data.users);
      // toast.success('Loading Success.');      
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (user)
      loadUsers();
  },[user]);

  return (
    <Box
      d="flex"
      px="3"
      py="2"
      width="100%"
    >
      <TableContainer
        display="block"
        maxWidth="100%"
      >
        <Table 
          variant="striped" 
          colorScheme="blackAlpha"          
        >
          {/* <TableCaption placement="top">Users</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Team</Th>
              <Th>Discussion</Th>
              <Th>Avatar</Th>
              <Th>Nick</Th>
              <Th>O/X</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user, index) => (              
                <Tr key={index}>
                  <Td>{user._id.slice(0, 5)}...</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email.slice(0, 3)}...</Td>
                  <Td>{user.role.slice(0, 1)}</Td>
                  <Td>{user.team}</Td>
                  <Td>{user.discussion}</Td>
                  <Td>
                    <Avatar
                      mr={2}
                      size="sm"
                      cursor="pointer"
                      name={user.name}
                      src={user.image}
                    />
                  </Td>
                  <Td>{user.nick}</Td>
                  <Td>{user.active}</Td>
                </Tr>
            ))}
          </Tbody>          
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersSetting;
