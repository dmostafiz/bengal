import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Axios from '../Helpers/axiosHelper'
import { getAccessToken } from '../Helpers/cookieHelper'

export default function useInitialBlogWriting() {

    const router = useRouter()
    const [editingPost, setEditingPost] = useState(null)
    const [editingPostLoading, setLoading] = useState(true)

    useEffect(() => {

        if (router?.query?.id) {

            (
                async () => {
                    const post = await Axios.post('/auth/check_post_author', { postId: router.query.id })

                    if (post?.data?.ok == true) {
                        setEditingPost(post.data.post)
                    }

                    console.log('check_post_author ', post)
                    setLoading(false)
                }
            )()
        }
    }, [router])


    const draftedPosts = async () => {

        const response = await Axios.get('/user/author_drafted_posts', {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        console.log('Author drafted posts ase', response?.data?.posts)

        if (response?.data?.ok == true && response?.data?.posts?.length) return response.data.posts

        return []

    }

    const generateNewBlogId = async () => {
        const post = await Axios.post('/post', {}, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })

        console.log('Post has created ', post)

        return post?.data?.post?.id || null
    }

    const redirectToNewPostEditor = async () => {

        const postId = await generateNewBlogId()

        console.log('Redirecting to post id', postId)

        return Router.push(`/editor/${postId}`)

    }

    const getRedirectingUrl = async () => {

        // console.log(draftedPosts().length)
        const checkDraftedPosts = await draftedPosts()

        console.log('checkDraftedPosts', checkDraftedPosts)

        if (checkDraftedPosts.length) return '/editor/drafted_posts'

        const postId = await generateNewBlogId()

        return `/editor/${postId}`
    }

    return { draftedPosts, generateNewBlogId, redirectToNewPostEditor, getRedirectingUrl, editingPost, editingPostLoading }
}
