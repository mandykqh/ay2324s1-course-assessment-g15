import { Card, CardBody, List, ListItem, Text, Spacer, Flex, Box } from '@chakra-ui/react'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../commonStyles';
import React from 'react';
import { Attempt } from '../../Commons';
import QuestionRequestHandler from '../../handlers/QuestionRequestHandler';

const AttemptEntry = ({ title, date }: { title: string, date: string }) => {
  return (
    <Card
      borderRadius={0}
      border={'1px solid #999'}
      mb={-1}
      p={3}
      direction={{ base: 'column', sm: 'row' }}
      width={'100%'}>
      <Text>{title}</Text>
      <Spacer />
      <Text color={'#BBBBBB'} fontSize={13}>{date}</Text>
    </Card>
  );
}

const PastAttempts = ({ attempts }: { attempts: Attempt[] }) => {
  return (
    <List width={600}>
      <ListItem bg={SECONDARY_COLOR} p={3} border={"1px solid #999"}>
        <Flex>
          <Text fontWeight={'bold'}>Question Title</Text>
          <Spacer />
          <Text fontWeight={'bold'}>Date Attempted</Text>
        </Flex>
      </ListItem>
      {attempts.map((entry, index) =>
        <ListItem key={index}><AttemptEntry title={entry.questionId} date={entry.timestamp} /></ListItem>
      )}
    </List>
  );
}

export default PastAttempts;