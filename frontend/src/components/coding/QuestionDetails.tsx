import { Tag, Text, HStack, Link, Heading, Grid } from '@chakra-ui/react'
import React from 'react';
import { QuestionString } from '../../Commons';

const QuestionDetails: React.FC<QuestionString> = ({ id, title, complexity, categories, description, link }) => {
  return (
    <Grid gap='10px'>
        <Heading color='white' as='b' size='md'>{id}. {title}</Heading>
        <HStack spacing='10px'>
            <Tag colorScheme='purple'>{complexity}</Tag>
            {categories.map((category, index) => (
                <Tag key={index} colorScheme='green'>{category}</Tag>
            ))}
        </HStack>
        <Text color='white'>{description}</Text>
        <Link href={link}><u>Link</u></Link>
    </Grid>
  );
};

export default QuestionDetails;

