import { Avatar, Box, Center, Divider, Flex, Image, Spacer, Text, Tooltip } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
// import { ThumbUpOff } from 'tableicons-react'

export default function SidebarPostCard({ title, image, content, createdAt, states, author, slug = 'বান্দুরা-রানী-পবিত্র-জপমালা-গীর্জা' }) {
    return (
        <Box my={2} bg={'gray.50'} border='0px' borderColor={'blackAlpha.50'} rounded='sm' shadow='sm' overflow={'hidden'}>

            <Box py={2} px={4}>

                <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>
                        <Tooltip hasArrow label={title} bg='gray.800'>
                            <Title order={6}><Text noOfLines={1} color='gray.900'>{title}</Text></Title>
                        </Tooltip>
                    </a>
                </Link>

                <Text as='span' color={'blackAlpha.600'} fontSize={'12px'}>
                    {createdAt}
                </Text>

                <Flex gap={2}>
                    {image && <Box w={'30%'}>
                        <Image maxW='full' maxH='100px' shadow='sm' src={image} alt='image' />
                    </Box>}


                    <Box flex='1' fontSize={'13px'}><Text noOfLines={2}>{content}</Text>
                        <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                        </Link>
                    </Box>

                </Flex>


            </Box>

        </Box>
    )
}
