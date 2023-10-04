import { Box, Center, Text } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthRequestHandler from "../handlers/AuthRequestHandler";

const HistoryPage = () => {
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
      <NavigationBar index={1} />
      <Center height='100vh'>
        <Text>
          History Page coming soon....
        </Text>
      </Center>
    </Box>
  );
}

export default HistoryPage;