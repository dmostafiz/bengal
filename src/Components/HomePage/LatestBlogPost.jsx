import { Box, Button, Center, Show, VStack } from '@chakra-ui/react'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import useSWR from 'swr'
import Axios from '../../Helpers/axiosHelper'
import ComponentLoader from '../Common/ComponentLoader'
import PostCard from '../Common/PostCard'
import PostCardSkeleton from '../Common/Skeletons/PostCardSkeleton'
import { useIntersection } from '@mantine/hooks';
import usePaginatingQuery from '../../Hooks/usePaginatingQuery'
import IconText from '../Common/IconText'

export default function LatestBlogPost() {

    // const postLimit = 3

    // const {
    //     data,
    //     error,
    //     fetchNextPage,
    //     hasNextPage,
    //     isFetching,
    //     isFetchingNextPage,
    //     status,
    // } = useInfiniteQuery({

    //     queryKey: ['latestPosts'],

    //     queryFn: async ({ pageParam = 0 }) => {
    //         console.log('pageParam', pageParam)
    //         const response = await Axios.get(`/post?cursor=${pageParam}&limit=${postLimit}`)
    //         return response?.data?.posts || []
    //     },

    //     getNextPageParam: (lastPage, allPages) => {
    //         return allPages[allPages.length - 1]?.length < postLimit ? false : allPages.flat().length
    //     }

    // })

    // const containerRef = useRef();
    // const { ref, entry } = useIntersection({
    //     root: containerRef.current,
    //     threshold: 1,
    // });

    // useEffect(() => {

    //     if (hasNextPage && entry?.isIntersecting) {
    //         // console.log('loading more')
    //         fetchNextPage(data?.pages.flat().length)
    //     }

    // }, [entry?.isIntersecting])

    const { items, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, ref, loadMoreButton, loadMoreInfinite, loadMore } = usePaginatingQuery('/post', 20)

    // useEffect(() => {
    //     console.log('data', data)
    // }, [data])

    return (
        <>
            {isFetching && !items.length

                ? <>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />

                </>

                : !isFetching && !items.length ?

                    <>
                        <IconText text='পোস্ট পাওয়া যায়নি' />
                    </>

                    : items.length && <VStack gap={0}>
                        {items.map((post, index) => <Box w='full' key={index}>
                            <PostCard
                                id={post?.id}
                                title={post?.title}
                                slug={post?.id}
                                image={post?.image}
                                content={post?.content}
                                createdAt={post?.publishedAt}
                                postType={post?.postType}
                                parent={post?.parent}
                                childs={post?.childs}
                                postPart={post?.part}
                                states={{
                                    read: post?.views?.length ?? 0,
                                    comment: post?.comments?.length ?? 0,
                                    like: post?.likes?.length ?? 0,
                                }}
                                categories={post?.categories}
                                author={post?.author}
                            />
                        </Box>)}

                    </VStack>

            }

            {isFetchingNextPage && <>
                <PostCardSkeleton />
                <PostCardSkeleton />
            </>}

            {loadMore()}

        </>
    )
}
