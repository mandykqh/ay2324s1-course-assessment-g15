import { Spacer, Button, Tag, Box, HStack, Link, Heading, Grid, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import { QuestionString } from '../../Commons';
import QuestionPreferences from './QuestionPreferences';
import ComplexityTag from '../question/ComplexityTag';

function modifyHTMLTags(htmlCode: string) {
  const newTag = '<pre style="width: 100%; overflow: hidden; white-space: pre-wrap; overflow-y: auto;">';
  const oldTag = /<pre\b[^>]*>/gi;
  return htmlCode.replace(oldTag, newTag);
}

const QuestionDetails: React.FC<QuestionString> =
  ({ id, title, complexity, categories, description, link, onQuestionChange, onFilter }) => {
    const [isPreferencesModalVisible, setIsPreferencesModalVisible] = useState(false);

    function renderQuestionHTML() {
      return (
        <div dangerouslySetInnerHTML={{ __html: modifyHTMLTags(description) }} />
      );
    }
    return (
      <Grid gap='0.5rem' m='15px'>
        <HStack>
          <Heading color='primary.blue4' as='b' textStyle='h2'>{id}. {title}</Heading>
          <Spacer />
          <Button colorScheme='blue' onClick={() => { setIsPreferencesModalVisible(true) }}>Change</Button>
        </HStack>
        <QuestionPreferences
          onFilter={onFilter}
          isVisible={isPreferencesModalVisible}
          closeHandler={() => { setIsPreferencesModalVisible(false) }}
          onQuestionChange={() => {
            onQuestionChange();
            setIsPreferencesModalVisible(false);
          }
          }
        />
        <HStack spacing='0.5rem' my='10px'>
          {categories.map((category, index) => (
            <Tag key={index} colorScheme='cyan'>{category}</Tag>
          ))}
          <Spacer />
          <ComplexityTag complexity={complexity} />
        </HStack>
        <Box overflowY='auto' h='70vh' pr='5px'>
          {renderQuestionHTML()}
          <Box my='20px'>
            <Link href={link} target="_blank" rel="noopener noreferrer"><u>Go to LeetCode</u></Link>
          </Box>
        </Box>
      </Grid>
    );
  };

export default QuestionDetails;
