import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'

export default function IconText({ icon = null, justify = 'center', text = 'কোন কিছু পাওয়া যায়নি!', iconSize = '30px',height=0, py = 3 }) {
    return (
        <Box minH={height}>
            <Flex py={py} w='full' alignItems={'center'} justify={justify} gap={1} color={'blackAlpha.500'}>
                {icon && <Icon as={icon} fontSize={iconSize} />} {text && <Text>{text}</Text>}
            </Flex>
        </Box>

    )
}
