import { Box, Button, Wrap } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import Axios from '../../Helpers/axiosHelper'
import banglaNumber from '../../Helpers/banglaNumber'

export default function TopCategories() {

    const { data, isLoading, isError, error } = useQuery(['topCategories'], async () => {
        const response = await Axios.get('/category/top_categories')
        return response?.data?.categories || []
    })


    return (
        <Box p={2} color={'gray.700'} fontWeight='normal'>
            <Wrap spacing={1}>

                {data?.length > 0 ? data.map((cat, index) => {
                    if (cat?.posts?.length) {
                        return <Link key={index} href={`/category/${cat.id}`}>
                            <Button size={'xs'} variant='solid' colorScheme='gray' rounded={'full'}>
                                {cat.name} 
                            </Button>
                        </Link>
                    }
                }) : <></>}


            </Wrap>
        </Box>
    )
}
