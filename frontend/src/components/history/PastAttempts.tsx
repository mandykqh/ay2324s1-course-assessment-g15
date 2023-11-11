import { Table, Thead, Td, Tbody, Tr, Th, Card, CardBody, List, ListItem, Text, Spacer, Flex, Box } from '@chakra-ui/react'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../CommonStyles';
import React from 'react';
import { Attempt } from '../../Commons';
import QuestionRequestHandler from '../../handlers/QuestionRequestHandler';

// const AttemptEntry = ({ title, date }: { title: string, date: string }) => {
//   return (
//     <Card
//       borderRadius={0}
//       border={'2px solid #244153'}
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
const AttemptEntry = ({ title, date }: { title: string, date: string }) => {
  return (
    <Tr>
      <Td >{title}</Td>
      <Td isNumeric>{date}</Td>
    </Tr>
  );
}

// const PastAttempts = ({ attempts }: { attempts: Attempt[] }) => {
//   return (
//     <Box>
//       <List width={520} sx={{
//         '& > :last-of-type': {
//           borderBottomRadius: '15px',
//         },
//       }}>
//         <ListItem bg='primary.blue2' p={3} border={"2px solid #244153"} borderTopRadius={15}>
//           <Flex>
//             <Text textStyle='h1' color='white'>Question Title</Text>
//             <Spacer />
//             <Text textStyle='h1' color='white'>Date Attempted</Text>
//           </Flex>
//         </ListItem>
//         {attempts.map((entry, index) =>
//           <ListItem key={index} ><AttemptEntry title={entry.questionId} date={entry.timestamp.substring(0, 10)} /></ListItem>
//         )}
//       </List>
//     </Box >
//   );
// }

// export default PastAttempts;
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
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default PastAttempts;