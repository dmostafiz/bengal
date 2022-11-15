import React, { useEffect, useState } from 'react'
import { Avatar, Box, Center, Divider, Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { ThumbUp } from 'tabler-icons-react'
import SectionContainer from '../../Components/Common/SectionContainer'
import TabContainer from '../../Components/HomePage/TabContainer'
import MainLeftSidebar from '../../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../../Layouts/Common/MainRightSidebar'
import SelectedPostsCarousel from '../../Components/HomePage/SelectedPostsCarousel'
import HomeLayout from '../../Layouts/HomeLayout'
import ImageBanner from '../../Layouts/HomeLayout/inc/ImageBanner'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import { useRouter } from 'next/router'
import PostCard from '../../Components/Common/PostCard'
import PostCardSkeleton from '../../Components/Common/Skeletons/PostCardSkeleton'
import IconText from '../../Components/Common/IconText'
import usePaginatingQuery from '../../Hooks/usePaginatingQuery'
import Axios from '../../Helpers/axiosHelper'
import { siteName } from '../../Helpers/config'

const categoryPosts = ({ category, ok }) => {

    // const router = useRouter()
    // console.log('category ssr', category)

    const { items, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, ref, loadMoreButton, loadMoreInfinite, loadMore } = usePaginatingQuery(`/category/posts/${category?.id}`, 20)

    return (
        <HomeLayout
            title={category ? `${category.id ? category.name + ' - ' : ''}${siteName} - Shamantorik Bangla blog` : `${siteName} - Shamantorik Bangla blog`}
        >

            {category ? <LayoutColumn

                leftSide={<MainLeftSidebar />}

                rightSide={<MainRightSidebar />}

            >
                <Box mb={8}>
                    <Box py={3} mb='5' bg={''} fontWeight='bold' borderBottom={'1px'} borderColor='blackAlpha.100' rounded='sm'>
                        <Title order={3}>ক্যাটাগরি - {category?.name}</Title>
                    </Box>

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
                                            title={post?.title}
                                            slug={post?.id}
                                            image={post?.image}
                                            content={post?.content}
                                            createdAt={post?.publishedAt}
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
                            <PostCardSkeleton />
                            <PostCardSkeleton />

                        </>}

                        {loadMore()}

                    </>

                </Box>


            </LayoutColumn>
                : <IconText height={'75vh'} py='200' text='ক্যাটাগরি পাওয়া যায়নি' />
            }

        </HomeLayout>
    )
}

categoryPosts.getInitialProps = async (ctx) => {

    const response = await Axios.get(`/category/single/${ctx.query.slug}`)
    return {
        category: response?.data?.category,
        ok: response?.data?.ok
    }
}

export default categoryPosts