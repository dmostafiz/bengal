import { Box, Center, Divider, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function MainRightSidebar() {
    return (

        <Box>
            <Box w='full' bg='' mb={5}>

                <Center bg='blackAlpha.50' p={2}>
                    <Title order={4}>ব্লগারদের কথন</Title>
                </Center>


                <Box p={2} color={'gray.700'} fontWeight='normal'>
                    <Text>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
                </Box>
            </Box>


            <Box w='full' bg='' mb={5}>

                <Center bg='blackAlpha.50' p={2}>
                    <Title order={4}>জনপ্রিয় ক্যাটাগরি</Title>
                </Center>


                <Box p={2} color={'gray.700'} fontWeight='normal'>
                    <Wrap gap={0}>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>গল্প</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>উপন্যাস</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>কবিতা</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>চিন্তাধারা</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>বিজ্ঞান-প্রজুক্তি</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>ছবি ব্লগ</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>ভ্রমণ</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>সমসাময়িক</TagLabel>
                        </Tag>
                        <Tag size={'sm'} variant='outline' colorScheme='gray' rounded={'full'}>
                            <TagLabel>বই রিভিউ</TagLabel>
                        </Tag>
                    </Wrap>
                </Box>
            </Box>

        </Box>
    )
}
