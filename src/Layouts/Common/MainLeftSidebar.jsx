import { Box, Button, Center, Divider, Flex, FormControl, FormHelperText, FormLabel, Input, Spacer, Text } from '@chakra-ui/react'
import { NavLink, Title } from '@mantine/core'
import { IconActivity, IconChevronRight, IconListCheck, IconListDetails } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { FaBlog, FaMicroblog } from 'react-icons/fa'
import { MdOutlineForum } from 'react-icons/md'
import { ListDetails } from 'tabler-icons-react'
import AuthComponent from '../../Components/Common/AuthComponent'

export default function MainLeftSidebar() {
    return (
        <Box>

            <Box mb={5} bg=''>

                <Box bg={'blackAlpha.100'}>
                    <Link href='/'>
                        <NavLink
                            label={<Text fontSize={'17px'} fontWeight={500}>ব্লগ প্রথম পাতা</Text>}
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
                            label={<Text fontSize={'17px'} fontWeight={500}>বাছাইকৃত সকল পোস্ট</Text>}
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

                        label={<Flex gap={1} alignItems='center'>
                            <Text fontSize={'17px'} fontWeight={700}>ডিসকাশন ডেস্ক</Text>
                            (<Text fontSize={'15px'} fontWeight='900' color='red.300'>৮ জন</Text>)
                        </Flex>}
                        description={'কমিউনিটি ডিসকাশন ডেস্ক এ অন্যান্য ব্লগারদের যেকোনো বিষয়ে আলোচনা করুন...'}
                        icon={<MdOutlineForum size={32} color='#ecc94b' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        active
                        variant="subtle"
                        color={'dark'}
                    />
                </Box>
            </Box>

            <Box mb={5} shadow='sm'>
                <Box bg='gray.100' py={2} px={2} mb={1}>
                    <Text order={5}>একাউন্ট এ প্রবেশ করুন</Text>
                </Box>
                <AuthComponent px={5} />
            </Box>

            <Box mb={5} w='full' bg='yellow.100' shadow={'sm'} rounded='sm' overflow={'hidden'}>
                <Center p={3} bg='yellow.200'>
                    <Title order={5}>নোটিস বোর্ড</Title>
                </Center>

                <Divider color={'yellow.500'} />

                <Box p={3} color={'yellow.900'} fontWeight='normal'>
                    <Text textAlign={'justify'}>সরকারি চাকরিতে আবেদন ফি বাড়ানো হইছে আজ থেকে সাত দিন পূর্বে । তেরো এবং ষোল গ্রেডের আবেদন ফি দ্বিগুণ করা হয়েছে । এগারো ও বারো গ্রেডে পূর্বে আবেদন ফি নির্ধারণ করা না থাকলে সেটা এখন তিনশো টাকা করা হয়েছে... <a href='#'>বিস্তারিত পড়ুন</a> </Text>
                </Box>
            </Box>




        </Box>
    )
}
