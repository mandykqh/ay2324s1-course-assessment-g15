import { Box, Center, Text } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useEffect } from "react";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import { useNavigate } from "react-router-dom";

const MorePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthRequestHandler.isAuth().then(res => {
      if (!res.isAuth) {
        navigate('/');
      }
    }).catch(e => {
      console.log(e);
    });
  }, [])

  return (
    <Box>
      <NavigationBar index={2} />
      <Center height='100vh'>
        <Text>
          More Page coming soon....
        </Text>
      </Center>
    </Box>
  );
}

export default MorePage;