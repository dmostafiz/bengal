import { VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Axios from '../../Helpers/axiosHelper'
import ComponentLoader from '../Common/ComponentLoader'
import PostCard from '../Common/PostCard'
import PostCardSkeleton from '../Common/PostCardSkeleton'

export default function LatestBlogPost() {

    const { data, isLoading, isError, error } = useQuery(['latestPosts'], async () => {

        const response = await Axios.get('/post')
        console.log('Response posts ', response?.data)

        return response?.data?.posts || []


    }, {
        // refetchOnWindowFocus: false,
        // retry: false,
    })


    return (
        <>
            {isLoading && !data

                ? <>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />

                </>

                : !isLoading && data && <VStack gap={5}>
                    {data.map((post, index) => <PostCard
                        key={index}
                        title={post?.title}
                        slug={post?.id}
                        image={post?.image}
                        content={post?.content}
                        createdAt={post?.createdAt}
                        states={{
                            read: 5,
                            comment: 3,
                            like: 3
                        }}
                        author={post?.author}
                    />)}
                </VStack>
            }
        </>
    )
}
