import { Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export default function SpinnerText({ justify = 'center', text = '', iconSize = '30px', py = 3 }) {
    return (
        <Flex py={py} w='full' alignItems={'center'} justify={justify} gap={1} color={'blackAlpha.500'}>
            <Spinner /> {text && <Text>{text}</Text>}
        </Flex>
    )
}
