import { Box, Flex, Text, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Spacer, Image, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { SECONDARY_COLOR } from "../CommonStyles";
import { useNavigate } from "react-router-dom";
import LocalStorageHandler from "../handlers/LocalStorageHandler";
import { useEffect, useState } from "react";

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
      label: 'History',
      onClick: () => { navigate('../history') }
    }, {
      label: 'More',
      onClick: () => { navigate('../more') }
    }
  ]
  return (
    <Box w={'100%'} h={HEIGHT} backgroundColor={SECONDARY_COLOR} position={'absolute'}>
      <Flex>
        <Center h={HEIGHT} ml={150}>
          <Box onClick={() => navigate('../home')} cursor={'pointer'}>
            <Text as='b' fontSize={25} mr={50}>PeerPrep</Text>
          </Box>
          <Tabs variant={'line'} index={index}>
            <TabList>
              {tabHeadings.map(h => <Tab key={h.label} onClick={h.onClick}>{h.label}</Tab>)}
            </TabList>
          </Tabs>
        </Center>
        <Spacer />
        <Menu>
          <MenuButton>
            <Center h={HEIGHT} mr={50} cursor={'pointer'}>
              <Image h={30} src='src\assets\images\user.png' />
            </Center>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate('../profile')}>Edit profile</MenuItem>
            <MenuItem onClick={() => { navigate('..'); LocalStorageHandler.clear() }}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex >
    </Box >
  );
}

export default NavigationBar;