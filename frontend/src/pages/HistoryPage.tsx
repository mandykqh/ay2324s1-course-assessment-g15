import { Box, Center, Text } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";

const HistoryPage = () => {
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
}

export default HistoryPage;