import { Spacer, Button, Tag, Text, HStack, Link, Heading, Grid } from '@chakra-ui/react'
import React, { useState } from 'react';
import { QuestionString } from '../../Commons';
import QuestionPreferences from './QuestionPreferences';

const QuestionDetails: React.FC<QuestionString> = ({ id, title, complexity, categories, description, link, onQuestionChange, onFilter }) => {
    const [isPreferencesModalVisible, setIsPreferencesModalVisible] = useState(false);


    return (
        <Grid gap='0.5rem'>
            <HStack>
                <Heading color='white' as='b' size='md'>{id}. {title}</Heading>
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
            <HStack spacing='0.5rem'>
                <Tag colorScheme='purple'>{complexity}</Tag>
                {categories.map((category, index) => (
                    <Tag key={index} colorScheme='green'>{category}</Tag>
                ))}
            </HStack>
            <Text color='white'>{description}</Text>
            <span>
                <Link href={link} target="_blank" rel="noopener noreferrer"><u>Link</u></Link>
            </span>
        </Grid>
    );
};

export default QuestionDetails;

