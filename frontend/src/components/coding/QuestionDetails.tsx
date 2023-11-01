import { Tag, Text, HStack, Link, Heading, Grid } from '@chakra-ui/react'
import React from 'react';
import { QuestionString } from '../../Commons';

const QuestionDetails: React.FC<QuestionString> = ({ id, title, complexity, categories, description, link }) => {
    return (
        <Grid gap='0.5rem'>
            <Heading color='white' as='b' size='md'>{id}. {title}</Heading>
            <HStack spacing='0.5rem'>
                <Tag colorScheme='purple'>{complexity}</Tag>
                {categories.map((category, index) => (
                    <Tag key={index} colorScheme='green'>{category}</Tag>
                ))}
            </HStack>
            <Text color='white'>{description}</Text>
            <span>
                <Link href={link}><u>Link</u></Link>
            </span>
        </Grid>
    );
};

export default QuestionDetails;
