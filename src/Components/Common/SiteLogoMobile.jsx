import { Box, Image } from '@chakra-ui/react'
import React from 'react'

export default function SiteLogoMobile() {
    return (
        <Box my={3} h={'40px'} w={'80px'}>
            <Image h={'full'} w={'full'} src='/logo.png' />
        </Box>
    )
}
