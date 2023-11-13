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
import ComplexityTag from "../question/ComplexityTag";


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
      <Card width={'520px'} bg='primary.blue3' borderRadius='15px' border='2px solid #244153'>
        <CardBody>
          <Stack>
            <Flex>
              <Stack flexDirection={'column'} mx={4} alignItems="center">
                {/* <Text fontSize={30} fontWeight={'bold'}>{attempted}</Text> */}
                <Text textStyle='h1' pt='30px'> {attempted} Questions Attempted</Text>
                <Flex
                  justifyContent={'space-between'}
                  bg='primary.blue1'
                  pb={3} pl={5} pr={5}
                  w={280}
                  borderRadius={10}
                  mt={3}
                >
                  <Center flexDirection={'column'} pt='19px'>
                    <ComplexityTag complexity={'Easy'} />
                    <Text>{easy}</Text>
                  </Center>
                  <Center flexDirection={'column'} pt='19px'>
                    <ComplexityTag complexity={'Medium'} />
                    <Text >{medium}</Text>
                  </Center>
                  <Center flexDirection={'column'} pt='19px'>
                    <ComplexityTag complexity={'Hard'} />
                    <Text>{hard}</Text>
                  </Center>
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
