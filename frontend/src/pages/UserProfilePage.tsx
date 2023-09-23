import User from '../models/User';
import { useEffect, useState } from "react";
import {
  Box, Grid, Text, Input, Center, Flex

} from '@chakra-ui/react';
import md5 from 'md5';
import UserProfileMenu from '../components/user/UserProfileMenu';
import UserPersonalInfo from '../components/user/UserPersonalInfo';
import UserSecurity from '../components/user/UserSecurity';
import NavigationBar from '../components/NavigationBar';

const UserProfilePage = () => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const dummyUser = new User('Johnny', 'johnny@email.com', md5('password1234'));
  return (
    <>
      <Box height={'100vh'} alignItems={'center'} justifyItems={'center'} overflow={'hidden'}>
        <NavigationBar mb={0} />
        <Flex>
          <UserProfileMenu
            currentMenuIndex={currentMenuIndex}
            setCurrentMenuIndex={setCurrentMenuIndex}
          />
          <Box width={'80vw'} >
            <Center alignItems={'center'} justifyItems={'center'} height={'100%'}>
              {
                currentMenuIndex === 0 ?
                  null :
                  currentMenuIndex === 1 ? <UserPersonalInfo user={dummyUser} />
                    : <UserSecurity />
              }

            </Center>
          </Box>
        </Flex >

      </Box >
    </>
  );
}

export default UserProfilePage;