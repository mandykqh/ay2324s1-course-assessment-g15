import { Box, Stack, Text } from "@chakra-ui/react";
import HistoryOverview from "../../history/HistoryOverview";
import PastAttempts from "../../history/PastAttempts";

const UserHistory = () => {
  return (
    <Box>
      <Stack>
        <Box pb={3} borderBottom={'1px solid #999'} mb={3}>
          <Text fontSize={24}>
            Attempts Overview
          </Text>
        </Box>
        <HistoryOverview
          total={100}
          attempted={50}
          easy={30}
          medium={10}
          hard={10}
        />
        <Stack>
          <Box pb={3} pt={5} borderBottom={'1px solid #999'} mb={3}>
            <Text fontSize={24}>
              Recent Attempts
            </Text>
          </Box>
          <PastAttempts />
        </Stack>
      </Stack>
    </Box >
  );
}

export default UserHistory;