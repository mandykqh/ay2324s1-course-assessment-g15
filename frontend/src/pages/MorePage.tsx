import { Box, Center, Text } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import LoadingPage from "./LoadingPage";

const MorePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    AuthRequestHandler.isAuth()
      .then(res => {
        setIsAuthenticated(res.isAuth);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  if (isAuthenticated) {
    return (
      <Box>
        <NavigationBar index={3} />
        <Center height='100vh'>
          <Text>
            More Page coming soon....
          </Text>
        </Center>
      </Box>
    );
  } else {
    return <LoadingPage />
  }
}

export default MorePage;