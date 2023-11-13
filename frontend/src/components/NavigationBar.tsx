import { HStack, Divider, Tag, Box, Flex, Text, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Spacer, Image, Button, Menu, MenuButton, MenuItem, MenuList, TabIndicator } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import AuthRequestHandler from "../handlers/AuthRequestHandler";

const HEIGHT = 50;


interface Props {
  index: number;
}

const NavigationBar: React.FC<Props> = ({ index }) => {
  const navigate = useNavigate();

  const tabHeadings = [
    {
      label: 'Overview',
      onClick: () => { navigate('../home') }
    }, {
      label: 'Collaborate',
      onClick: () => { navigate('../collaborate') }
    }
  ]

  function signoutHandler() {
    AuthRequestHandler.signout(LocalStorageHandler.getUserData()!.username)
      .then(() => {
        LocalStorageHandler.clearUserData();
        navigate('..');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Box w={'100%'} bg='primary.blue1' position={'absolute'} pt={0.6} pb={1.5}>      <Flex>
      <Center h={HEIGHT} ml={150}>
        <HStack>
          <Box onClick={() => navigate('../home')} cursor={'pointer'}>
            <Image h={30} src='/src/assets/logo.svg' />
          </Box>
          <Box onClick={() => navigate('../home')} cursor={'pointer'}>
            <Text as='b' color='primary.green' fontSize={25} mr={50}>PeerPrep</Text>
          </Box>
        </HStack>
        <Tabs variant={'line'} index={index}>
          <TabList>
            {tabHeadings.map(h =>
              <Tab color='primary.green'
                textStyle='h1'
                key={h.label} onClick={h.onClick}>{h.label}
              </Tab>)}
          </TabList>
        </Tabs>
      </Center>
      <Spacer />
      <Menu>
        <MenuButton>
          <Center h={HEIGHT} mr={50} cursor={'pointer'}>
            {LocalStorageHandler.getUserData()?.role === 'ADMIN' && (
              <>
                <Tag mx='15px' colorScheme="cyan">Administrator</Tag>
                <Divider orientation="vertical" />
              </>
            )}
            <Text textStyle='h1' px='15px'>{LocalStorageHandler.getUserData()?.username}</Text>
            <Image h={30} src='/src/assets/images/user.png' />
          </Center>
        </MenuButton>
        <MenuList bg='primary.blue2' border='2px solid #244153'>
          <MenuItem bg='transparent' _hover={{ bg: 'primary.blue3', color: 'white' }} onClick={() => navigate('../profile')}>Your profile</MenuItem>
          <MenuItem bg='transparent' _hover={{ bg: 'primary.blue3', color: 'white' }} onClick={signoutHandler}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex >
    </Box >
  );
}

export default NavigationBar;