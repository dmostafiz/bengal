import { Box, Center, Image } from '@chakra-ui/react'
import React from 'react'

export default function SiteLogoDesktop() {
    return (
        <Box my={3} h={'60px'} w={{base: '90px', md:'200px'}} bgSize='contain' bgRepeat={'no-repeat'} bgPos={{base: 'center', md: 'left'}} bgImage='/logo.png'>
        </Box>
    )
}
