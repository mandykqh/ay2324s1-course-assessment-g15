import React from 'react';
import { complexityColorMap, ComplexityColorMap } from "./utils/colorMap";
import { Tag } from '@chakra-ui/react';

interface ComplexityTagProps {
    complexity: string;
}

const ComplexityTag: React.FC<ComplexityTagProps> = ({ complexity }) => {
    return (
        // <Tag colorScheme={complexityColorMap[complexity]}
        //     variant='outline'
        //     borderRadius='xl'
        // >{complexity}</Tag>
        <Tag colorScheme={complexityColorMap[complexity]}
            borderRadius='xl'
            w='70px'
            m='auto'
            mt='18px'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >{complexity}</Tag>
    );
};

export default ComplexityTag;