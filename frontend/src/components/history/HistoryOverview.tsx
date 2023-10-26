import {
  CircularProgress,
  Card,
  CardBody,
  Stack,
  Flex,
  Spacer,
  Text,
  Center,
  CircularProgressLabel
} from "@chakra-ui/react";
import { PRIMARY_COLOR } from "../../CommonStyles";

const HistoryOverview =
  ({ total, attempted, easy, medium, hard }:
    { total: number, attempted: number, easy: number, medium: number, hard: number }) => {
    let completed = (Math.round(attempted / total * 100) / 100) * 100;
    return (
      <Card width={'600px'}>
        <CardBody>
          <Stack>
            <Flex>
              <Stack flexDirection={'column'} ml={70}>
                <Text fontSize={15}>Questions Attempted</Text>
                <Text fontSize={30} fontWeight={'bold'}>{attempted}</Text>
                <Flex
                  justifyContent={'space-between'}
                  bg={PRIMARY_COLOR}
                  pt={1} pb={1} pl={5} pr={5}
                  w={250}
                  borderRadius={5}
                  mt={50}
                >
                  <Center flexDirection={'column'}>
                    <Text color={'#77DD77'}>Easy</Text>
                    <Text>{easy}</Text>
                  </Center>
                  <Center flexDirection={'column'}>
                    <Text color={'#FFFAA0'}>Medium</Text>
                    <Text >{medium}</Text>
                  </Center>
                  <Center flexDirection={'column'}>
                    <Text color={'#FF6961'}>Hard</Text>
                    <Text>{hard}</Text>
                  </Center>
                </Flex>
              </Stack>
              <Spacer />
              <Center>
                <CircularProgress value={completed} size={'160px'} thickness={5} mr={50}>
                  <CircularProgressLabel fontSize={20}>
                    <Text fontWeight={'bold'}>{`${completed}%`}</Text>
                    <Text fontSize={15}>Attempted</Text>
                  </CircularProgressLabel>
                </CircularProgress>
              </Center>
            </Flex>
          </Stack>
        </CardBody>
      </Card >
    );
  }

export default HistoryOverview;