import { Box, Center, Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function SiteLogoDesktop() {
    return (
        <Link href={'/'}>
            <Box cursor={'pointer'} my={3} h={{ base: '55px', md: '60px', lg: '70px' }} w={{ base: '150px', md: '200px', lg: '230px' }}>
                <Image h='full' w='full' src='/logo.png' />
            </Box>
        </Link>
    )
}
