import { Avatar, Box, Text } from '@chakra-ui/react'
import { NavLink } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { Heart, Pencil, Power, User } from 'tabler-icons-react'
import banglaNumber from '../../Helpers/banglaNumber'
import useUser from '../../Hooks/useUser'

export default function UserPanel({ isMobile = false, logout = false }) {

    const { isLoading, authUser, logoutUser } = useUser()

    return (
        <>
            {(!isLoading && authUser) && <Box mb={2} pb={1} borderBottom={'1px'} borderColor='blackAlpha.200'>
                <NavLink
                    label={<Text fontSize={'17px'} fontWeight={500}>{authUser.displayName}</Text>}
                    description={<Text as='' fontSize={'12px'} color='blackAlpha.600'><strong>{banglaNumber(authUser.followers.length)} জন অনুসারন করছে </strong></Text>}
                    icon={<Avatar rounded={'md'} bg='transparent' size={'md'} src={authUser.avatar} />}
                    rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    variant="light"
                    color={'light'}
                    childrenOffset={35}
                    defaultOpened={isMobile ? false : true}
                >
                    <Link href='/user/profile'>
                        <NavLink py={2} icon={<User size={16} />} label="প্রোফাইল" />
                    </Link>
                    <Link href='/user/post_list'>
                        <NavLink py={2} icon={<Pencil size={16} />} label="আমার ব্লগিং" />
                    </Link>
                    <Link href='/user/saved_posts'>
                        <NavLink py={2} icon={<Heart size={16} />} label="সংরক্ষিত পোস্ট" />
                    </Link>
                    {logout && <NavLink py={2} onClick={logoutUser} icon={<Power />} label="লগ-আউট" />}
                </NavLink>
            </Box>
            }
        </>
    )
}
