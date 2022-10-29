import { VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useSWR from 'swr'
import Axios from '../../Helpers/axiosHelper'
import ComponentLoader from '../Common/ComponentLoader'
import PostCard from '../Common/PostCard'
import PostCardSkeleton from '../Common/PostCardSkeleton'

export default function LatestBlogPost() {

    const { data, error} = useSWR('/post', async (url) => {

        const response = await Axios.get(url)
        // console.log('Response posts ', response?.data)
        return response?.data?.posts || []

    })


    return (
        <>
            {!data

                ? <>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />

                </>

                : data && <VStack gap={5}>
                    {data.map((post, index) => <PostCard
                        key={index}
                        title={post?.title}
                        slug={post?.id}
                        image={post?.image}
                        content={post?.content}
                        createdAt={post?.createdAt}
                        states={{
                            read: post?.views?.length ?? 0,
                            comment: post?.comments?.length ?? 0,
                            like: post?.likes?.length ?? 0,
                        }}
                        author={post?.author}
                    />)}
                </VStack>
            }
        </>
    )
}
