import { Box, Text } from '@chakra-ui/react'
import { Wrap } from '@chakra-ui/react'
// import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import Truncate from '@nosferatu500/react-truncate'


export default function PostTrancate({ content, slug }) {
    return (
        <Truncate lines={3} ellipsis={slug} >
            <div noOfLines={2} dangerouslySetInnerHTML={{__html:content}}></div>
        </Truncate>
    )
}
