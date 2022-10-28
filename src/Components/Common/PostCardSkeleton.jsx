import { Box, Flex, Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

export default function PostCardSkeleton() {
    return (
        <Stack mb={10} spacing={3}>

            <Skeleton height='25px' width='50%' />
            <Skeleton height='15px' width='70%'/>
            <Flex direction={{base: 'column', lg: 'row'}} gap={2}>
                <Box w={{base: 'full', lg:'170px'}} h={{base: '150px', lg:'130px'}}>
                    <Skeleton height='full' />
                </Box>

                <Stack flex='1'>
                    <Skeleton height='13px' />
                    <Skeleton height='13px' />
                    <Skeleton height='13px' />
                    <Skeleton height='13px' />
                    <Skeleton height='13px' />
                    <Skeleton height='13px' w='30%' />
                </Stack>
            </Flex>
        </Stack>
    )
}
