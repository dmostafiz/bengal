import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { AuthModalContext } from '../Contexts/AuthModalContext'
import Axios from '../Helpers/axiosHelper'
import { setRedirectUrl } from '../Helpers/cookieHelper'
import useUser from './useUser'

export default function useFollowing() {

    const router = useRouter()

    const queryClient = useQueryClient()

    const { authUser } = useUser()

    const authModal = useContext(AuthModalContext)

    const { data } = useQuery(['getFollowings'], async () => {
        const res = await Axios.get('/user/get_followings')

        console.log('My following list', res)
        return res.data.followings || []
    })

    const [isLoading, setIsLoading] = useState(false)

    const followUser = async (userId) => {

        if (!authUser) {
            setRedirectUrl(router.asPath)
            authModal?.seTitle('অনুসরন করতে করতে নিবন্ধিত সদস্য হতে হবে')
            return authModal?.onOpen()
        }


        setIsLoading(true)
        const follow = await Axios.post('/user/follow', {
            id: userId
        })

        if (follow?.data?.ok) {
            // alert('follow done!')
        }

        await queryClient.refetchQueries({ queryKey: ['getFollowings'] })
        setIsLoading(false)

    }

    const unFollowUser = async (userId) => {

        if (!authUser) {
            setRedirectUrl(router.asPath)
            authModal?.seTitle('আনফলো করতে নিবন্ধিত সদস্য হতে হবে')
            return authModal?.onOpen()
        }

        setIsLoading(true)

        const unFollow = await Axios.post('/user/unfollow', {
            id: userId
        })

        if (unFollow?.data?.ok) {

        }

        await queryClient.refetchQueries({ queryKey: ['getFollowings'] })

        setIsLoading(false)
    }

    const isFollowing = (userId) => {

        console.log('following id ******* ', userId)


        const following = data?.find(flw => flw == userId)

        console.log('following ###### ', following)

        if (following && following != undefined) return true

        return false
    }

    return { followUser, unFollowUser, isFollowing, isLoading }
}
