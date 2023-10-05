import { Box, Center, Text } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import LoadingPage from "./LoadingPage";

const HistoryPage = () => {
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
        <NavigationBar index={1} />
        <Center height='100vh'>
          <Text>
            History Page coming soon....
          </Text>
        </Center>
      </Box>
    );
  } else {
    return <LoadingPage />
  }
}

export default HistoryPage;