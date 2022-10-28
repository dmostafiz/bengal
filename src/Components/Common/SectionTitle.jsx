import { Box, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function SectionTitle({title, px=0, mb=6, order=4, showBorder=true, bg='transparent'}) {
    return (
        <Box py={2} px={px} borderBottom={showBorder ? '2px' : '0px'} borderColor={'blackAlpha.200'} bg={bg} mb={mb} fontWeight='bold' rounded='sm'>
            <Title order={order}><Text color={'blackAlpha.800'}>{title}</Text></Title>
        </Box>

    )
}
