import React from 'react';
import { complexityColorMap } from "./utils/colorMap";
import { Card, Tag } from '@chakra-ui/react';

interface ComplexityTagProps {
    complexity: string;
}

const ComplexityTag: React.FC<ComplexityTagProps> = ({ complexity }) => {
    return (
        <Tag colorScheme={complexityColorMap(complexity)}
            w='70px'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >{complexity}</Tag>
    );
};

export default ComplexityTag;