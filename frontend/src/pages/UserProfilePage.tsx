import { useState } from "react";
import { Box, Center, Flex } from '@chakra-ui/react';
import UserProfileMenu from "../components/user/userManagement/UserProfileMenu";
import UserPersonalInfo from "../components/user/userManagement/UserPersonalInfo";
import UserSecurity from "../components/user/userManagement/UserSecurity";
import NavigationBar from '../components/NavigationBar';
import LocalStorageHandler from '../handlers/LocalStorageHandler';
import LoadingPage from "./LoadingPage";
import UserHistory from "../components/user/userManagement/UserHistory";
import { authChecker } from "../Util";

const UserProfilePage = () => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const userDataString = LocalStorageHandler.getUserData()!;
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  function renderUserProfileMenu() {
    return (
      <UserProfileMenu
        currentMenuIndex={currentMenuIndex}
        setCurrentMenuIndex={setCurrentMenuIndex}
      />
    );
  }

  function renderContent() {
    return (
      <Box width={'80vw'}>
        <Center alignItems={'center'} justifyItems={'center'} height={'100%'}>
          {currentMenuIndex === 0 && <UserPersonalInfo user={userDataString} />}
          {currentMenuIndex === 1 && <UserSecurity />}
          {currentMenuIndex === 2 && <UserHistory />}
        </Center>
      </Box>
    );
  }

  function renderAuthenticatedPage() {
    return (
      <Box>
        <Box alignItems={'center'} justifyItems={'center'}>
          <NavigationBar index={2} />
          <Flex>
            {renderUserProfileMenu()}
            {renderContent()}
          </Flex >
        </Box >
      </Box>
    );
  }

  authChecker(setIsAuthenticated);
  return isAuthenticated ? renderAuthenticatedPage() : <LoadingPage />
}

export default UserProfilePage;
