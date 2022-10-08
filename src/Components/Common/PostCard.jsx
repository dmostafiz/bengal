import { Avatar, Box, Button, Center, Divider, Flex, Image, Spacer, Text, Wrap } from '@chakra-ui/react'
import { HoverCard, Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ title, image, content, createdAt, states, author, slug = 'বান্দুরা-রানী-পবিত্র-জপমালা-গীর্জা' }) {
    return (
        <Box bg={'gray.50'} border='0px' borderColor={'blackAlpha.50'} rounded='sm' shadow='md' overflow={'hidden'}>

            <Box w='full' bg='.50' py={2} px={4}>
                <Box fontSize={'15px'}>
                    <Flex alignItems={'center'} gap={2}>
                        {/* <Avatar shadow={'sm'} src={author.image} size={'md'} name='লিমন লস্কর' /> */}
                        <Box>
                            <Text>
                                {/* <Avatar shadow={'sm'} src={author.image} size={'sm'} name='লিমন লস্কর' /> */}
                                লিখেছেন <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={400}>
                                    <HoverCard.Target>
                                        <Text as='span' fontWeight={'semibold'}>
                                            <a >{author.name}</a></Text>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown p={10}>

                                        <Box bg='blackAlpha.5'>
                                            <Flex direction={{ base: 'row', md: 'row' }} gap={3}>
                                                <Box>
                                                    <Avatar size='md' rounded={'md'} shadow name='লিমন লস্কর' />
                                                </Box>
                                                <Box>
                                                    <Title order={4}><Text noOfLines={1}>লিমন লস্কর</Text></Title>
                                                    <Text fontSize={'12px'}>@limon_lashkar</Text>
                                                </Box>
                                            </Flex>

                                            <Box>
                                                <Box px={0}>
                                                    <Text noOfLines={2} fontSize='13px'>রূপালী রাতে, স্বপ্নের ও নীল চাদর বিছিয়ে, কষ্টের শীতল আবরন জড়িয়ে আমি আছি, আছি, তোমার স্মৃতিতে ভালবাসার সরল বাধন ছিড়ে, চলে গেছ এই হৃদয়টাকে ভেঙ্গে তুমি আমি একই শহরে তবুও একাকী ভিন্ন গ্রহে</Text>
                                                </Box>

                                                <Divider my={1} />

                                                <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                                    <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>১৪</Text> জন অনুসরন করছে</Text>
                                                    <Wrap spacing={2} alignItems='flex-end'>
                                                        <Link href={'/blogger/limon_lashkar'}>
                                                            <Button size='xs' rounded={'none'} colorScheme={'yellow'}>সকল পোস্ট দেখুন</Button>
                                                        </Link>
                                                        <Button size='xs' rounded={'none'} colorScheme={'blackAlpha'}>অনুসরণ করুন</Button>
                                                    </Wrap>
                                                </Box>
                                            </Box>
                                            {/* <Divider my={1} /> */}
                                        </Box>

                                    </HoverCard.Dropdown>
                                </HoverCard>, <Text as='span' fontSize={'13px'}>
                                    {createdAt}
                                </Text>
                            </Text>
                        </Box>
                    </Flex>

                </Box>

            </Box>

            <Divider borderColor={'blackAlpha.100'} mb={2} />

            <Box py={1} px={4}>

                <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>
                        <Title order={3}><Text color='gray.900'>{title}</Text></Title>
                    </a>
                </Link>


                {image ? <Center py={5}>
                    <Image maxW='full' maxH='300px' shadow='sm' src={image} alt='image' />
                </Center> : <Spacer h={2} />}


                <Box textAlign={'justify'}>{content}    <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                </Link>

                </Box>

            </Box>

            <Divider borderColor={'blackAlpha.100'} mt={2} />

            <Box w='full' bg='blackAlpha' py={1} px={4} fontSize='12px' fontWeight={'normal'}>
                <Flex gap={2} justify='space-between' alignItems={'center'}>
                    <Flex gap={2} justify='flex-start' alignItems={'center'}>
                        <Text>{states.read} বার পড়া হয়েছে</Text>
                        <Divider orientation='vertical' borderColor={'blackAlpha.50'} h='10px' />
                        <Text>{states.comment} টি মন্তব্য</Text>
                    </Flex>

                    <Flex alignItems={'center'} gap={1}>
                        <Text fontSize={'15px'}>{states.like}</Text><IconThumbUp size={16} />
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}
