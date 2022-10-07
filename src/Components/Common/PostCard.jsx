import { Avatar, Box, Center, Divider, Flex, Image, Spacer, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ title, image, content, createdAt, states, author, slug = 'বান্দুরা-রানী-পবিত্র-জপমালা-গীর্জা' }) {
    return (
        <Box bg={'gray.50'} border='0px' borderColor={'blackAlpha.50'} rounded='sm' shadow='sm' overflow={'hidden'}>

            <Box w='full' bg='blackAlpha.50' py={2} px={4}>
                <Box fontSize={'15px'}>
                    <Flex alignItems={'center'} gap={2}>
                        {/* <Avatar shadow={'sm'} src={author.image} size={'md'} name='লিমন লস্কর' /> */}
                        <Box>
                            <Text>
                                {/* <Avatar shadow={'sm'} src={author.image} size={'sm'} name='লিমন লস্কর' /> */}
                                লিখেছেন <Text as='span' fontWeight={'semibold'}>
                                    <a href='#'>{author.name}</a></Text>, <Text as='span' fontSize={'13px'}>
                                    {createdAt}
                                </Text>
                            </Text>
                        </Box>
                    </Flex>

                </Box>

            </Box>

            <Divider borderColor={'blackAlpha.100'} mb={2} />

            <Box py={2} px={4}>
                <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>
                        <Title order={4}><Text color='gray.900'>{title}</Text></Title>
                    </a>
                </Link>


                {image ? <Center py={5}>
                    <Image maxW='full' maxH='300px' shadow='sm' src={image} />
                </Center> : <Spacer h={2} />}


                <Box>{content}    <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                </Link>

                </Box>

            </Box>

            <Divider borderColor={'blackAlpha.100'} mt={2} />

            <Box w='full' bg='blackAlpha' py={1} px={3} fontSize='12px' fontWeight={'semibold'}>
                <Flex gap={2} justify='flex-end' alignItems={'center'}>
                    <Text>{states.read} বার পড়া হয়েছে</Text>
                    <Divider orientation='vertical' borderColor={'gray.300'} h='10px' />
                    <Text>{states.comment} টি মন্তব্য</Text>
                    <Divider orientation='vertical' borderColor={'gray.300'} h='10px' />
                    <Flex alignItems={'center'} gap={1}>
                        <Text fontSize={'15px'}>{states.like}</Text><IconThumbUp size={16} />
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}
