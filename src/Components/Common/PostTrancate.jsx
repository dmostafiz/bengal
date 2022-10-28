import { Box, Text } from '@chakra-ui/react'
import { Wrap } from '@chakra-ui/react'
// import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import Truncate from '@nosferatu500/react-truncate'
import { stripHtml } from 'string-strip-html'


export default function PostTrancate({ content, slug, lines=3 }) {
    return (
        <Truncate lines={lines} ellipsis={slug && slug} >
            <Box textAlign={'justify'} noOfLines={2} dangerouslySetInnerHTML={{__html:stripHtml(content).result}}></Box>
        </Truncate>
    )
}
