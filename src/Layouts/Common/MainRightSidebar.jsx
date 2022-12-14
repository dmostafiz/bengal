import { Box, Button, Center, Divider, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import LatestComments from '../../Components/Common/LatestComments'
import TopCategories from '../../Components/Common/TopCategories'

export default function MainRightSidebar() {
    return (

        <Box>
            {/* <Box w='full' bg='' mb={5}>

                <Box bg='blackAlpha.50' p={2}>
                    <Title order={5}>ব্লগার কথন</Title>
                </Box>


                <Box p={2} color={'gray.700'} fontWeight='normal'>
                    <Text fontSize={'14px'} fontWeight='' color='blackAlpha.500' textAlign={''}>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
                </Box>
            </Box> */}


            <Box w='full' bg='' mb={5}>

                <Box bg='blackAlpha.50' p={2}>
                    <Title order={6}>জনপ্রিয় ক্যাটাগরি</Title>
                </Box>


                <TopCategories />
            </Box>


            <Box w='full' bg='' mb={5}>

                <Box bg='blackAlpha.50' p={2}>
                    <Title order={5}>সাম্প্রতিক মন্তব্য</Title>
                </Box>

                <LatestComments />
            </Box>
        </Box>
    )
}
