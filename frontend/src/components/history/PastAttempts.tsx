import { Table, Thead, Td, Tbody, Tr, Th, Card, List, ListItem, Text, Spacer, Flex, Box } from '@chakra-ui/react'
import { SECONDARY_COLOR } from '../../CommonStyles';
import { Attempt } from '../../Commons';

const AttemptEntry = ({ title, date }: { title: string, date: string }) => {
  return (
    <Tr>
      <Td >{title}</Td>
      <Td isNumeric>{date}</Td>
    </Tr>
  );
}

// const AttemptEntry = ({ title, date }: { title: string, date: string }) => {
//   return (
//     <Card
//       borderRadius={0}
//       border={'1px solid #999'}
//       mb={-1}
//       p={3}
//       direction={{ base: 'column', sm: 'row' }}
//       width={'100%'}>
//       <Text>{title}</Text>
//       <Spacer />
//       <Text color={'#BBBBBB'} fontSize={13}>{date}</Text>
//     </Card>
//   );
// }
const PastAttempts = ({ attempts }: { attempts: Attempt[] }) => {
  return (
    <Box border="1.5px solid #244153" overflow="hidden" borderRadius="xl" width={'520px'}>
      <Table variant="simple" borderRadius="full" width={'520px'}>
        <Thead bg='primary.blue2'>
          <Tr >
            <Th color='primary.green' borderTopLeftRadius={15}>Question Title</Th>
            <Th color='primary.green' isNumeric borderTopRightRadius={15}>Date Attempted</Th>
          </Tr>
        </Thead>
        <Tbody bg='primary.blue3'>
          {attempts.map((entry, index) => (
            <AttemptEntry key={index} title={entry.questionId} date={entry.timestamp.substring(0, 10)} />

            // <AttemptEntry title={entry.questionId} date={entry.timestamp.substring(0, 10)} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default PastAttempts;