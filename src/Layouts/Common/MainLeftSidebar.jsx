import { Box, Center, Divider, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function MainLeftSidebar() {
    return (
        <Box w='full' bg='yellow.100' shadow={'sm'} rounded='lg' overflow={'hidden'}>
            <Center p={3} bg='yellow.200'>
                <Title order={3}>নোটিস বোর্ড</Title>
            </Center>

            <Divider color={'yellow.500'} />

            <Box p={3} color={'yellow.900'} fontWeight='normal'>
                <Text>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
            </Box>
        </Box>
    )
}
