import React from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { NavLink } from '@mantine/core'
import {  IconListCheck, IconListDetails } from '@tabler/icons'
import { BsArrowRight } from 'react-icons/bs'
import useUser from '../../Hooks/useUser'
import { ArrowRight, ArrowsExchange2, Heart, Logout, Pencil, Power, User } from 'tabler-icons-react'
import Link from 'next/link'
import UserPanel from './UserPanel'
import TranslatorWidget from 'react-translate-widget';


export default function BlogPanel() {

    const { isLoading, authUser, logoutUser } = useUser()

    return (
        <Box mb={5} bg=''>

            {/* <TranslatorWidget sourceLanguageCode="bn" className="translator" /> */}

            <UserPanel />

            <Box bg={'blackAlpha.50'} _hover={{ bg: 'blackAlpha.200' }}>
                <Link href='/'>
                    <NavLink
                        label={<Text fontSize={'17px'} fontWeight={500}>বেঙ্গলরিড প্রচ্ছদ</Text>}
                        // description={'সকল পোস্ট দেখুন'}
                        icon={<IconListDetails size={28} stroke={2} color='#385898' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        // active
                        variant="subtle"
                        color={'light'}
                    />
                </Link>

            </Box>


            {/* 
            <Box>
                <Link href='/selected_posts'>
                    <NavLink
                        label={<Text fontSize={'17px'} fontWeight={500}>অনলাইন পিডিএফ বই</Text>}
                        // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                        icon={<IconBook size={32} stroke={2} color='#385898' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        // active
                        variant="subtle"
                        color={'light'}
                    />
                </Link>

            </Box> */}



            <Box>
                <NavLink

                    label={<Flex gap={1} alignItems='center'>
                        <Text fontSize={'17px'}>প্লাটফর্ম পরিচিতি</Text>
                    </Flex>}
                    // description={'কমিউনিটি ডিসকাশন প্যানেল এ অন্যান্য ব্লগারদের সাথে বিষয় ভিত্তিক আলোচনা করুন...'}
                    icon={<IconListCheck size={28} color='#385898' />}
                    // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    // active
                    variant="subtle"
                    color={'dark'}
                    childrenOffset={40}
                >
                    <NavLink py={2} icon={<BsArrowRight />} label="নীতিমালা" />
                    <NavLink py={2} icon={<BsArrowRight />} label="পোস্ট র‍্যাঙ্কিং পদ্ধতি" />
                    <NavLink py={2} icon={<BsArrowRight />} label="ব্লগার র‍্যাঙ্কিং পদ্ধতি" />
                </NavLink>
            </Box>


            {/* <Box>
                <NavLink

                    label={<Flex gap={1} alignItems='center'>
                        <Text fontSize={'17px'} fontWeight={700}>ডিসকাশন প্যানেল</Text>
                        (<Text fontSize={'15px'} fontWeight='900' color='red.300'>৮ জন</Text>)
                    </Flex>}
                    description={'কমিউনিটি ডিসকাশন প্যানেল এ অন্যান্য ব্লগারদের সাথে বিষয় ভিত্তিক আলোচনা করুন...'}
                    icon={<MdOutlineForum size={32} color='#385898' />}
                    // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    // active
                    variant="subtle"
                    color={'dark'}
                />
            </Box> */}
        </Box>
    )
}
