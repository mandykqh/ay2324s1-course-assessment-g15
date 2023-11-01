import { useEffect, useState } from "react";
import { Box, Center, Flex } from '@chakra-ui/react';
import UserProfileMenu from "../components/user/userManagement/UserProfileMenu";
import UserPersonalInfo from "../components/user/userManagement/UserPersonalInfo";
import UserSecurity from "../components/user/userManagement/UserSecurity";
import NavigationBar from '../components/NavigationBar';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import UserHomePage from "../components/user/userManagement/UserHomePage";
import AuthRequestHandler from "../handlers/AuthRequestHandler";
import LoadingPage from "./LoadingPage";
import UserHistory from "../components/user/userManagement/UserHistory";

const UserProfilePage = () => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const userDataString = LocalStorageHandler.getUserData()!;
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
        <Box alignItems={'center'} justifyItems={'center'}>
          <NavigationBar index={2} />
          <Flex>
            <UserProfileMenu
              currentMenuIndex={currentMenuIndex}
              setCurrentMenuIndex={setCurrentMenuIndex}
            />
            <Box width={'80vw'}>
              <Center alignItems={'center'} justifyItems={'center'} height={'100%'}>
                {currentMenuIndex === 0 && <UserHomePage />}
                {currentMenuIndex === 1 && <UserPersonalInfo user={userDataString} />}
                {currentMenuIndex === 2 && <UserSecurity />}
                {currentMenuIndex === 3 && <UserHistory />}
              </Center>
            </Box>
          </Flex >
        </Box >
      </Box>
    );
  } else {
    return <LoadingPage />
  }
}

export default UserProfilePage;