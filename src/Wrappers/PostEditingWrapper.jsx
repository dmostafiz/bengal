import { Center, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react"
import ComponentLoader from '../Components/Common/ComponentLoader'
import Axios from '../Helpers/axiosHelper'
import useInitialBlogWriting from '../Hooks/useInitialBlogWriting'

export default function PostEditingWrapper({ children }) {

    const {post, loading} = useInitialBlogWriting()

    return (
        <>
            {loading ? <ComponentLoader py='100' size='xl' /> : post ? children : <Center py={20}>
                <Text>দুঃখিত! কোন পোস্ট পাওয়া যায়নি।</Text>
            </Center>}
        </>
    )
}
