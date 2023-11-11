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
import ComplexityTag from "../question/ComplexityTag";


const HistoryOverview =
  ({ total, attempted, easy, medium, hard }:
    { total: number, attempted: number, easy: number, medium: number, hard: number }) => {
    let completed = (Math.round(attempted / total * 100) / 100) * 100;
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
                  mt={5}
                >
                  <Center flexDirection={'column'}>
                    <ComplexityTag complexity={'Easy'} />
                    {/* <Text color={'#77DD77'}>Easy</Text> */}
                    <Text>{easy}</Text>
                  </Center>
                  <Center flexDirection={'column'}>
                    <ComplexityTag complexity={'Medium'} />
                    <Text >{medium}</Text>
                  </Center>
                  <Center flexDirection={'column'}>
                    <ComplexityTag complexity={'Hard'} />
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