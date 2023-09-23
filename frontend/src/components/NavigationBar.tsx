import { Box, Flex, Text, Center, Tab, TabList, TabPanel, TabPanels, Tabs, Spacer, Image, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { SECONDARY_COLOR } from "../CommonStyles";
import { useNavigate } from "react-router-dom";

const HEIGHT = 50;
const tabHeadings = ['Questions', 'History', 'More']

interface Props {
  mb: number;
}

const NavigationBar: React.FC<Props> = ({ mb }) => {
  const navigate = useNavigate();
  return (
    <Box w={'100vw'} h={HEIGHT} backgroundColor={SECONDARY_COLOR} mb={mb}>
      <Flex>
        <Center h={HEIGHT} ml={150}>
          <Text as='b' fontSize={25} mr={50}>PeerPrep</Text>
          <Tabs variant={'line'}>
            < TabList >
              {tabHeadings.map(h => <Tab key={h}>{h}</Tab>)}
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
            <MenuItem>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex >
    </Box >
  );
}

export default NavigationBar;