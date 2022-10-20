import { Box, Image } from '@chakra-ui/react'
import React from 'react'

export default function SiteLogoDesktop() {
    return (
        <Box h={'70px'} maxW={'160px'}>
            <Image h={'full'} w={'full'} src='/logo.png' />
        </Box>
    )
}
