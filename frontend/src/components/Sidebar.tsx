import React, { useState } from 'react';
import { Text, Box, Flex } from '@chakra-ui/react';

const SidebarContent = ({ onHover }) => {
    return (
        <Flex
            direction="column"
            p="4"
            w="full"
            h="100vh"
            bg="blue.700"
            color="white"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
        >
            {/* Add your sidebar icons here */}

            {/* More icons... */}
        </Flex>
    );
};

const Sidebar = () => {
    // State to handle sidebar expansion
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to toggle sidebar expansion
    const handleHover = () => setIsExpanded(!isExpanded);

    return (
        <Flex h="100vh" maxW="full" overflowX="hidden">
            {/* Sidebar */}
            <Box
                w={isExpanded ? "200px" : "50px"} // Width of the sidebar depending on whether it's expanded
                h="100vh"
                bg="blue.600"
                transition="all .3s"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
                position="absolute" // Positioned absolutely to overlay content
                zIndex="docked" // Ensures sidebar is above content
            >
                {/* <SidebarContent /> */}
            </Box>

            {/* Main content */}
            <Box flex="1" ml={isExpanded ? "200px" : "50px"} transition="margin .3s">
                {/* Your main content goes here */}
                <Text fontSize="xl">Main Content</Text>
            </Box>
        </Flex>
    );
};

export default Sidebar;
