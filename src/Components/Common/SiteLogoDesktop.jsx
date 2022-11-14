import { Box, Center, Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function SiteLogoDesktop() {
    return (
        <Link href={'/'}>
            <Box cursor={'pointer'} my={3} h={{ base: '48px', md: '60px', lg: '70px' }} w={{ base: '120px', md: '180px', lg: '200px' }}>
                <Image h='full' w='full' src='/logo.png' />
            </Box>
        </Link>
    )
}
