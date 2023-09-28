import { Input, Box, Text, Center, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { SECONDARY_COLOR } from "../commonStyles";
import { useNavigate } from "react-router-dom";
import UserRequestHandler from "../handlers/UserRequestHandler";
import { showError } from "../Util";
import LocalStorageHandler from "../handlers/LocalStorageHandler";

const DummyLoginPage = () => {
  const userRequestHandler = new UserRequestHandler();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  function loginHandler() {
    userRequestHandler.login(userName, password)
      .then(result => {
        LocalStorageHandler.storeUserData({
          id: result.id,
          username: result.username,
          email: result.email,
        });
        navigate('home');
      })
      .catch(e => {
        showError((e as Error).message, toast);
      })
  }

  return (
    <Center height={'100vh'}>
      <Box>
        <Text>User Name</Text>
        <Input backgroundColor={SECONDARY_COLOR} onChange={(e) => { setUserName(e.target.value) }}></Input>
        <Text mt={5}>Password</Text>
        <Input backgroundColor={SECONDARY_COLOR} type={'password'} onChange={(e) => { setPassword(e.target.value) }}></Input>
        <Button mt={5} float={'right'} onClick={loginHandler}>Login</Button>
      </Box>
    </Center>
  );
}

export default DummyLoginPage;