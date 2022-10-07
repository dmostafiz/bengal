import { Avatar, Box, Button, Center, Divider, Flex, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function BlogRightSidebar() {
    return (

        <Box>
            <Box w='full' bg='' mb={5}>

                <Center bg='blackAlpha.50' p={2}>
                    <Title order={5}>লেখক পরিচিতি</Title>
                </Center>

                <Box p={3}>
                    <Flex direction={{ base: 'column', md: 'row' }} gap={3}>
                        <Box>
                            <Avatar size='md' rounded={'md'} shadow name='লিমন লস্কর' />
                        </Box>
                        <Box>
                            <Title order={4}><Text noOfLines={1}>লিমন লস্কর </Text></Title>
                            <Text fontSize={'12px'}>@limon_lashkar</Text>
                        </Box>
                    </Flex>

                    <Box py='2'>
                        <Box px={0}>
                            <Text noOfLines={4}>রূপালী রাতে, স্বপ্নের ও নীল চাদর বিছিয়ে, কষ্টের শীতল আবরন জড়িয়ে আমি আছি, আছি, তোমার স্মৃতিতে ভালবাসার সরল বাধন ছিড়ে, চলে গেছ এই হৃদয়টাকে ভেঙ্গে তুমি আমি একই শহরে তবুও একাকী ভিন্ন গ্রহে</Text>
                        </Box>

                        <Divider my={1} />

                        <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                            <Wrap spacing={2} alignItems='flex-end'>
                                <Text><Text as='span' fontSize={'16px'} fontWeight='bold'>১৪</Text> জন অনুসরন করছে</Text>
                                <Button size='xs' rounded={'none'} colorScheme={'blackAlpha'}>অনুসরণ করুন</Button>
                            </Wrap>
                        </Box>
                    </Box>
                    {/* <Divider my={1} /> */}
                </Box>
            </Box>


            <Box w='full' bg='' mb={5}>

                <Box bg='blackAlpha.50' p={2}>
                    <Title order={5}>সাম্প্রতিক মন্তব্য</Title>
                </Box>
            </Box>
        </Box>
    )
}
