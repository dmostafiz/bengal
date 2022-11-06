import { Box, Button, Center, Divider, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import LatestComments from '../../Components/Common/LatestComments'

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


                <Box p={2} color={'gray.700'} fontWeight='normal'>
                    <Wrap spacing={1}>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            গল্প
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            উপন্যাস
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            কবিতা
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            চিন্তাধারা
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            বিজ্ঞান-প্রজুক্তি
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            ছবি ব্লগ
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            ভ্রমণ
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            সমসাময়িক
                        </Button>
                        <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                            বই রিভিউ
                        </Button>

                    </Wrap>
                </Box>
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
