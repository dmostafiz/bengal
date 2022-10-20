import { Box, Center, Image } from '@chakra-ui/react'
import React from 'react'

export default function SiteLogoDesktop() {
    return (
        <Center h={'70px'} w={{ base: '100px', lg: '200px' }}>
            <Image h='full' w='full' src='/logo.png' />
        </Center>

    )
}
