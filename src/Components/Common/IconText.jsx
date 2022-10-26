import { Center, Flex, Icon, Text } from '@chakra-ui/react'
import React from 'react'

export default function IconText({icon = null, justify='center', text = '', iconSize='30px', py=3 }) {
    return (

        <Flex py={py} w='full' alignItems={'center'} justify={justify} gap={1} color={'blackAlpha.500'}>
            {icon && <Icon as={icon} fontSize={iconSize}/>} {text && <Text>কোন কিছু পাওয়া যায়নি!</Text>}
        </Flex>
    )
}
