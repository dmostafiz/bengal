import { Box, Button, Center, Show } from '@chakra-ui/react'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import Axios from '../Helpers/axiosHelper'

export default function usePaginatingQuery(url, limit = 20, type = 'posts') {

    const router = useRouter()

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({

        queryKey: [url, router.pathname],

        queryFn: async ({ pageParam = 0 }) => {
            console.log('pageParam', pageParam)
            const response = await Axios.get(`${url}?cursor=${pageParam}&limit=${limit}`)
            return type == 'users'
                ? response?.data?.users
                : type == 'categories'
                    ? response?.data?.categories

                    : response?.data?.posts || []
        },

        getNextPageParam: (lastPage, allPages) => {
            return allPages[allPages.length - 1]?.length < limit ? false : allPages.flat().length
        }

    })

    const containerRef = useRef();

    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    });

    useEffect(() => {

        if (hasNextPage && entry?.isIntersecting) {
            // console.log('loading more')
            fetchNextPage(data?.pages.flat().length)
        }

    }, [entry?.isIntersecting])


    const loadMoreButton = () => {
        return <Center w='full' mt={{ base: 2, md: 10 }}>
            {hasNextPage && <Button
                onClick={() => fetchNextPage(data?.pages.flat().length)}
                isLoading={isFetchingNextPage}
            >
                আরও পোস্ট দেখুন
            </Button>}
        </Center>
    }

    const loadMoreInfinite = () => {
        return <Center w='full' mt={{ base: 2, md: 10 }}>
            <Box ref={ref}></Box>
        </Center>
    }

    const loadMore = () => {
        return <Center w='full' mt={{ base: 2, md: 10 }}>

            <Show below='md'>

                {loadMoreButton()}
            </Show>

            <Show above='md'>
                {loadMoreInfinite()}
            </Show>

        </Center>
    }


    return { items: data?.pages?.flat() || [], fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, ref, loadMoreButton, loadMoreInfinite, loadMore }
}
