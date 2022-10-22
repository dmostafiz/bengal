import { Box, Center, Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export default function FullscreenLoader({spinnerSize='xl', text='অপেক্ষা করুন...', showText=true}) {
    return (
        <Center bg='blackAlpha.600' w='100vw' h='100vh' right={0} top={0} zIndex={999999999999} pos={'fixed'} >
            <Box px={3} py={2} rounded='full'>
                <Flex alignItems={'center'} gap={3}>
                    <Spinner size={spinnerSize} color='white' />
                    {(showText && text) && <Text color='white' fontWeight={'bold'}>{text}</Text>}
                </Flex>
            </Box>
        </Center>
    )
}
