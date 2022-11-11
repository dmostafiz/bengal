import { Box, Flex, Skeleton, SkeletonCircle, Stack } from '@chakra-ui/react'
import React from 'react'

export default function PostCardSkeleton() {
    return (
        <Stack mb={10} spacing={3}>
            <Flex direction={{ base: 'column', md: 'column', lg: 'column', xl: 'row' }} gap={{ base: 3, sm: 3, md: 3, lg: 3, xl: 4 }}>
                <Flex mt={4} direction={'column'} gap={2} w={{ base: 'full', md: 'full', lg: 'full', xl: '210px' }}>
                    <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.200' height='full' rounded={'lg'} fadeDuration={3} />
                    <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.200' height='30px' width='100%' fadeDuration={3} />
                    <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.200' height='30px' width='80%' fadeDuration={3} />
                    <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='18px' width='50%' fadeDuration={3} />

                    <Flex gap={2}>
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='15px' width={'50px'} fadeDuration={3} />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='15px' width={'50px'} fadeDuration={3} />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='15px' width={'50px'} fadeDuration={3} />
                    </Flex>
                </Flex>

                <Box flex={1} border={{ base: '0px', md: '0px', lg: '0px', xl: '1px' }} borderColor={{ base: 'blackAlpha.100', sm: 'blackAlpha.100', md: 'blackAlpha.100', lg: 'blackAlpha.100', xl: 'blackAlpha.100' }} shadow={{ xl: 'md' }} py={2} px={{ base: 0, md: 1, lg: 1, xl: 3 }} w='full' rounded='md' overflow={'hidden'} mb={3}>
                    <Stack>
                        <Flex alignItems='center' gap={3}>
                            {/* <SkeletonCircle startColor='blackAlpha.100' endColor='blackAlpha.300' size='8' fadeDuration={3} /> */}
                            <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.300' height='20px' width='40px' fadeDuration={3} rounded='full' />
                            <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.300' height='20px' width='55px' fadeDuration={3} rounded='full' />

                        </Flex>

                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='70%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='80%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='90%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='70%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='75%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='90%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='100%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='12px' fadeDuration={3}  width='60%' />
                        <Skeleton startColor='blackAlpha.50' endColor='blackAlpha.100' height='13px' w='30%' fadeDuration={3} />

                        <Flex gap={2} mt={3}>
                            <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.200' height='13px' width={'50px'} fadeDuration={3} />
                            <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.200' height='13px' width={'50px'} fadeDuration={3} />
                            <Skeleton startColor='blackAlpha.100' endColor='blackAlpha.200' height='13px' width={'50px'} fadeDuration={3} />
                        </Flex>
                    </Stack>

                </Box>
            </Flex>

        </Stack>
    )
}
