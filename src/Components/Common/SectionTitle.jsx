import { Box, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function SectionTitle({title}) {
    return (
        <Box py={2} borderBottom='2px' borderColor={'blackAlpha.200'} px={0} mb={6} fontWeight='bold' rounded='sm'>
            <Title order={4}><Text color={'blackAlpha.800'}>{title}</Text></Title>
        </Box>

    )
}
