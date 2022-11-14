import { Box, Flex, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import React from 'react'

export default function SliderPostCarkSkeleton({mb=10}) {
    return (
        <Box w='full' mb={mb} spacing={3} shadow='md'>
            <Flex mt={4} direction={'column'} gap={2} w={'full'}>
                <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.200' height='130px' roundedTop={'xl'} fadeDuration={3} />

                <Flex direction={'column'} gap={2} p={2}>
                    <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.200' height='30px' width='100%' fadeDuration={3} />
                    <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='16px' width='60%' fadeDuration={3} />
                    <Flex alignItems='center' gap={3}>
                        <SkeletonCircle startColor='blackAlpha.100' endColor='blackAlpha.300' size='8' fadeDuration={3} />
                        <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.300' height='15px' width='120px' fadeDuration={3} />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}
