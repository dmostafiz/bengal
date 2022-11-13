import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React from 'react'

export default function TopCommentersSkeleton() {
    return (
        <Box w='full' bg='white' _hover={{ bg: 'blackAlpha.50' }} cursor='pointer' border={'1px'} borderColor='blackAlpha.200' color='blackAlpha.800' px={1} py={2} shadow='md' rounded='xl'>
            <Flex direction={'column'} alignItems='center' gap={{ base: 1, md: 2 }}>
                <Box>
                    <SkeletonCircle startColor='blackAlpha.50' endColor='blackAlpha.200' size='14' fadeDuration={3} />
                </Box>
                <Flex direction='column' gap={1} alignItems='center'>
                    <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.300' w='full' h={'15px'} />
                    <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.200' w='100px' h={'8px'} />
                </Flex>
            </Flex>

        </Box>
    )
}
