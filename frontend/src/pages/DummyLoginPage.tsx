import { Input, Box, Text, Center, Button } from "@chakra-ui/react";
import { useState } from "react";
import { SECONDARY_COLOR } from "../CommonStyles";
import { useNavigate, useNavigation } from "react-router-dom";

const DummyLoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function loginHandler() {
    console.log(userName);
    console.log(password);
    navigate('./home');
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