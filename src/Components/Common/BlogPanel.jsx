import React from 'react'
import {Box, Flex, Text } from '@chakra-ui/react'
import { NavLink } from '@mantine/core'
import { IconListCheck, IconListDetails } from '@tabler/icons'
import { BsArrowRightSquare } from 'react-icons/bs'
import Link from 'next/link'
import UserPanel from './UserPanel'

export default function BlogPanel({ userPanel = true }) {

    return (
        <Box mb={5} bg=''>

            {/* <TranslatorWidget sourceLanguageCode="bn" className="translator" /> */}

            <Box borderBottom={'1px'} borderColor='blackAlpha.200' _hover={{ bg: 'blackAlpha.200' }}>
                <Link href='/'>
                    <NavLink
                        label={<Text fontSize={'17px'} fontWeight={500}>সামন্তরিক প্রচ্ছদ</Text>}
                        // description={'সকল পোস্ট দেখুন'}
                        icon={<IconListDetails size={24} stroke={2} color='#44578D' />}
                        // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                        // active
                        variant="subtle"
                        color={'light'}
                    />
                </Link>

            </Box>


            {userPanel && <UserPanel />}



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



            <Box borderBottom={'1px'} borderColor='blackAlpha.200' pb={1}>
                <NavLink

                    label={<Flex gap={1} alignItems='center'>
                        <Text fontSize={'17px'}>প্লাটফর্ম পরিচিতি</Text>
                    </Flex>}
                    // description={'কমিউনিটি ডিসকাশন প্যানেল এ অন্যান্য ব্লগারদের সাথে বিষয় ভিত্তিক আলোচনা করুন...'}
                    icon={<IconListCheck size={24} color='#44578D' />}
                    // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    // active
                    variant="subtle"
                    color={'dark'}
                    childrenOffset={35}
                    defaultOpened
                >
                    <Link href='/tos'>
                        <NavLink py={2} icon={<BsArrowRightSquare />} label="সামান্তরিক নীতিমালা" />
                    </Link>
                    <NavLink py={2} icon={<BsArrowRightSquare />} label="র‍্যাঙ্কিং এলগরিদম" />
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
