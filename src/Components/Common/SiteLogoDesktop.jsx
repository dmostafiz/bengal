import { Box, Center, Image } from '@chakra-ui/react'
import React from 'react'

export default function SiteLogoDesktop() {
    return (
        <Box my={3} h={{base: '50px', md: '60px', lg:'70px'}} w={{base: '90px', md: '120px', lg: '200px'}}>
          <Image h='full' w='full' src='logo.png' />
        </Box>
    )
}
