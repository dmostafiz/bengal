import { Box, Flex, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import React from 'react'

export default function LatestCommentsSkeleton() {
    return (
        <Box w='full' pb={2} mt={2} borderBottom='1px' borderColor={'blackAlpha.200'}>
            <Flex mt={4} direction={'column'} gap={1} w={'full'}>
                <Flex alignItems='center' gap={3}>
                    <SkeletonCircle startColor='blackAlpha.100' endColor='blackAlpha.300' size='8' fadeDuration={3} />
                    <Flex gap={1} direction='column'>
                        <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.300' height='15px' width='120px' fadeDuration={3} />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.200' height='12px' width='140px' fadeDuration={3} />
                    </Flex>
                </Flex>
                <Skeleton startColor='facebook.50' endColor='facebook.100' height='15px' width='100%' fadeDuration={3} />
                <Skeleton startColor='facebook.50' endColor='facebook.100' height='15px' width='80%' fadeDuration={3} />
                <Skeleton startColor='facebook.50' endColor='facebook.50' height='35px' width='100%' fadeDuration={3} />
            </Flex>
        </Box>
    )
}
