import { Box, Center, Divider, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function MainRightSidebar() {
    return (
        <Box w='full' shadow={'sm'} bg='blackAlpha.100'>

            <Box bg='blackAlpha.100' p={2}>
                <Title order={4}>কিছু কথা</Title>
            </Box>


            <Box p={2} color={'gray.700'} fontWeight='normal'>
                <Text>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
            </Box>
        </Box>
    )
}
