import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getAccessToken } from '../Helpers/cookieHelper'

export default function useSerialPostWriting() {

    const router = useRouter()
    const [editingPost, setEditingPost] = useState(null)
    const [editingPostLoading, setLoading] = useState(true)

    useEffect(() => {

        if (router?.query?.id) {

            (
                async () => {
                    const res = await Axios.post('/auth/check_post_author', { postId: router.query.id })

                    if (res?.data?.ok == true) {
                        setEditingPost(res.data.post)
                    }

                    console.log('check_post_author ', res)
                    setLoading(false)
                }
            )()
        }
    }, [router])


    const generateNewSerialPostId = async () => {
        const res = await Axios.post('/post', {

        }, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        // console.log('Post has created ', post)

        return res?.data?.post?.id || null
    }


    return (
        <div>useSerialPostWriting</div>
    )
}
