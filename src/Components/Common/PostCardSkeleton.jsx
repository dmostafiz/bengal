import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

export default function PostCardSkeleton() {
    return (
        <Stack mb={10} spacing={3}>
            <Skeleton height='20px' />
            <Skeleton height='15px' />
            <Flex gap={2}>
                <Box w={'170px'} h={'90px'}>
                    <Skeleton height='full' />
                </Box>

                <Stack flex='1'>
                    <Skeleton height='15px' />
                    <Skeleton height='15px' />
                    <Skeleton height='15px' />
                    <Skeleton height='15px' />
                </Stack>
            </Flex>
        </Stack>
    )
}
