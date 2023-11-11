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

interface Props {
  total: number;
  attempted: number;
  easy: number;
  medium: number;
  hard: number;
};

const CountLabel = ({ color, label, value }:
  { color: string, label: string, value: number }) => {
  return (
    <Center flexDirection={'column'}>
      <Text color={color}>{label}</Text>
      <Text>{value}</Text>
    </Center>
  );
}

const QuestionProgress = ({ completed }: { completed: number }) => {
  return (
    <Center>
      <CircularProgress value={completed} size={'160px'} thickness={5} mr={50}>
        <CircularProgressLabel fontSize={20}>
          <Text fontWeight={'bold'}>{`${completed}%`}</Text>
          <Text fontSize={15}>Attempted</Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Center>
  );
}

const HistoryOverview: React.FC<Props> =
  ({ total, attempted, easy, medium, hard }) => {
    let completed = (Math.round(attempted / total * 100) / 100) * 100;
    if (attempted == 0) {
      completed = 0;
    }
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
                  <CountLabel color='#77DD77' label='Easy' value={easy} />
                  <CountLabel color='#FFFAA0' label='Medium' value={medium} />
                  <CountLabel color='#FF6961' label='Hard' value={hard} />
                </Flex>
              </Stack>
              <Spacer />
              <QuestionProgress completed={completed} />
            </Flex>
          </Stack>
        </CardBody>
      </Card >
    );
  }

export default HistoryOverview;
