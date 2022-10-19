import React from 'react'
import { Box, Flex, Link, Text } from '@chakra-ui/react'
import { NavLink } from '@mantine/core'
import { IconBook, IconListCheck, IconListDetails } from '@tabler/icons'
import { MdOutlineForum } from 'react-icons/md'

export default function BlogPanel() {
    return (
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
                        label={<Text fontSize={'17px'} fontWeight={500}>বাছাইকৃত পোস্ট</Text>}
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
                <Link href='/selected_posts'>
                    <NavLink
                        label={<Text fontSize={'17px'} fontWeight={500}>পিডিএফ বই সামগ্রী</Text>}
                        // description={'নির্বাচিত পোস্ট গুলো দেখুন'}
                        icon={<IconBook size={32} stroke={2} />}
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
                        <Text fontSize={'17px'} fontWeight={0}>ডিসকাশন প্যানেল</Text>
                        (<Text fontSize={'15px'} fontWeight='900' color='red.300'>৮ জন</Text>)
                    </Flex>}
                    description={'কমিউনিটি ডিসকাশন প্যানেল এ অন্যান্য ব্লগারদের সাথে বিষয় ভিত্তিক আলোচনা করুন...'}
                    icon={<MdOutlineForum size={32} color='#ecc94b' />}
                    // rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    active
                    variant="subtle"
                    color={'dark'}
                />
            </Box>
        </Box>
    )
}
