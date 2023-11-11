import { HStack, Divider, Tag, Box, Flex, Text, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Spacer, Image, Button, Menu, MenuButton, MenuItem, MenuList, TabIndicator } from "@chakra-ui/react";
import { SECONDARY_COLOR } from "../CommonStyles";
import { useNavigate } from "react-router-dom";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import { useEffect, useState } from "react";
import AuthRequestHandler from "../handlers/AuthRequestHandler";

const HEIGHT = 50;


interface Props {
  index: number;
}

const NavigationBar: React.FC<Props> = ({ index }) => {
  const navigate = useNavigate();

  const tabHeadings = [
    {
      label: 'Questions',
      onClick: () => { navigate('../home') }
    }, {
      label: 'Collaborate',
      onClick: () => { navigate('../collaborate') }
    }, {
      label: 'More',
      onClick: () => { navigate('../more') }
    }
  ]

  function signoutHandler() {
    // <<<<<<< HEAD
    //     AuthRequestHandler.signout()
    //       .then(() => {
    //         LocalStorageHandler.clearUserData();
    //         navigate('..');
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //   }
    // =======
    AuthRequestHandler.signout(LocalStorageHandler.getUserData()!.username)
      .then(() => {
        LocalStorageHandler.clearUserData();
        navigate('..');
      })
      .catch((e) => {
        console.log(e);
      });
  }
  // >>>>>>> master

  return (
    <Box w={'100%'} h={HEIGHT} bg='primary.blue1' position={'absolute'}>
      <Flex>
        <Center h={HEIGHT} ml={150}>
          <HStack>
            <Box onClick={() => navigate('../home')} cursor={'pointer'}>
              <Image h={30} src='src\assets\logo.svg' />
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
              <Image h={30} src='src\assets\images\user.png' />
            </Center>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate('../profile')}>Edit profile</MenuItem>
            <MenuItem onClick={signoutHandler}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex >
    </Box >
  );
}

export default NavigationBar;