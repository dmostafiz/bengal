import { Avatar, Box, Text } from '@chakra-ui/react'
import { NavLink } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import React from 'react'
import { Heart, Pencil, Power, User } from 'tabler-icons-react'
import useUser from '../../Hooks/useUser'

export default function UserPanel({ logout = false }) {

    const { isLoading, authUser, logoutUser } = useUser()

    return (
        <>
            {(!isLoading && authUser) && <Box>
                <NavLink
                    label={<Text fontSize={'17px'} fontWeight={500}>{authUser.displayName}</Text>}
                    description={<Text as='' fontSize={'12px'} color='blackAlpha.600'><strong>@{authUser.userName}</strong> ( {authUser.followers.length} জন অনুসারন করছে )</Text>}
                    icon={<Avatar size={'md'} src={authUser.avatar} />}
                    rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    // active
                    // variant="filled"
                    
                    variant="light"
                    color={'light'}
                >
                    <NavLink icon={<User />} label="প্রোফাইল" />
                    <NavLink icon={<Pencil />} label="আমার লিখাসমূহ" />
                    <NavLink icon={<Heart />} label="আমার পছন্দ তালিকা" />
                    {logout && <NavLink onClick={logoutUser} icon={<Power />} label="লগ-আউট" />}
                </NavLink>
            </Box>
            }
        </>
    )
}
