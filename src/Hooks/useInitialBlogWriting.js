import React from 'react'
import Router from 'next/router'

export default function useInitialBlogWriting() {

    const hasDraftedPosts = async () => {

        return true

    }

    const generateNewBlogId = async () => {
          return  'sdfmdfg4tger5gergerg3'
    }

    const redirectToNewPostEditor = async () => {
        const postId = await generateNewBlogId()
        return Router.push(`/write/${postId}`)

    }

    const getRedirectingUrl = async () => {

        if(await hasDraftedPosts()) return '/write/drafted_posts'

        const postId = await generateNewBlogId()
        return `/write/${postId}`
    }

    return {hasDraftedPosts, generateNewBlogId, redirectToNewPostEditor, getRedirectingUrl}
}
