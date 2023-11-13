import React from 'react';
import { complexityColorMap } from "./utils/colorMap";
import { Card, Tag } from '@chakra-ui/react';
import Complexity from '../../models/enums/Complexity';

interface ComplexityTagProps {
    complexity: string;
}

const ComplexityTag: React.FC<ComplexityTagProps> = ({ complexity }) => {
    return (
        <Tag colorScheme={complexityColorMap(complexity)}
            w='70px'
            // m='auto'
            // mt='18px'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >{complexity}</Tag>
    );
};

export default ComplexityTag;