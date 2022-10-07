import { Box, Button, Center, Divider, FormControl, FormHelperText, FormLabel, Input, Spacer, Text } from '@chakra-ui/react'
import { NavLink, Title } from '@mantine/core'
import { IconActivity, IconChevronRight, IconListCheck, IconListDetails } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { FaBlog, FaMicroblog } from 'react-icons/fa'
import { MdOutlineForum } from 'react-icons/md'
import { ListDetails } from 'tabler-icons-react'

export default function MainLeftSidebar() {
    return (
        <Box>

            <Box mb={5} bg=''>

                <Box bg={'blackAlpha.100'}>
                    <Link href='/'>
                        <NavLink
                            label={<Text fontSize={'16px'}>ব্লগ প্রথম পাতা</Text>}
                            // description={'সকল পোস্ট দেখুন'}
                            icon={<IconListDetails size={32} stroke={2} />}
                            // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                            active
                            variant="subtle"
                            color={'dark'}
                        />
                    </Link>

                </Box>

                <Box>
                    <Link href='/selected_posts'>
                        <NavLink
                            label={<Text fontSize={'16px'}>বাছাইকৃত পোস্ট সমূহ</Text>}
                            // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                            icon={<IconListCheck size={32} stroke={2} />}
                            // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                            active
                            variant="subtle"
                            color={'dark'}
                        />
                    </Link>

                </Box>

                <Box>
                    <NavLink

                        label={<Text fontSize={'16px'} fontWeight={700}>কমিউনিটি ফোরাম</Text>}
                        description={'ব্লগ এর যেকোনো সমস্যা পোস্ট করুন এবং অন্যদের সমস্যা সমাধান করতে সাহায্য করুন'}
                        icon={<MdOutlineForum size={32} color='orange' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        active
                        variant="subtle"
                        color={'dark'}
                    />
                </Box>
            </Box>


            <Box mb={5} bg='blue.100'>
                {/* <Center p={3} bg='blackAlpha.50'>
                    <Title order={5}>ব্লগে প্রবেশ করুন</Title>
                </Center> */}

                <Box p={3}>
                    <Input border={'none'} _focus={{ ring: '0', border: 'none' }} _hover={{ ring: '0', border: 'none' }} bg={'whiteAlpha.700'} size={'sm'} placeholder='ইমেইল এড্রেস / ইউগারনেম' type='email' />
                    <Spacer h={2} />
                    <Input border={'none'} _focus={{ ring: '0', border: 'none' }} _hover={{ ring: '0', border: 'none' }} _autofill={false} bg={'whiteAlpha.700'} size={'sm'} placeholder='পাসওয়ার্ড' type='password' />
                    <Spacer h={2} />
                    <a href='#'><Text fontSize={'13px'} color='blue.800'>পাসওয়ার্ড মনে নেই ?</Text></a>
                    <Spacer h={2} />
                    <Button color='black' colorScheme={'whiteAlpha'} shadow='sm' size={'sm'}>প্রবেশ করুন</Button>
                </Box>
            </Box>



            <Box mb={5} w='full' bg='yellow.100' shadow={'sm'} rounded='sm' overflow={'hidden'}>
                <Center p={3} bg='yellow.200'>
                    <Title order={5}>নোটিস বোর্ড</Title>
                </Center>

                <Divider color={'yellow.500'} />

                <Box p={3} color={'yellow.900'} fontWeight='normal'>
                    <Text>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
                </Box>
            </Box>




        </Box>
    )
}
