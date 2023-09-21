import User from '../models/User';
import { useEffect, useState } from "react";
import { mockUsers } from "../MockData";
import {
  Box, Grid, Text, Input, Center, Flex

} from '@chakra-ui/react';
import md5 from 'md5';
import UserProfileMenu from '../components/user/UserProfileMenu';
import UserPersonalInfo from '../components/user/UserPersonalInfo';
import UserSecurity from '../components/user/UserSecurity';

const UserProfilePage = () => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);
  const dummyUser = new User('Johnny', 'johnny@email.com', md5('password1234'));
  return (
    <Box alignItems={'center'} justifyItems={'center'}>
      <Flex>
        <UserProfileMenu
          currentMenuIndex={currentMenuIndex}
          setCurrentMenuIndex={setCurrentMenuIndex}
        />
        <Box width={'80vw'} height={'100vh'}>
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
  );
}

export default UserProfilePage;