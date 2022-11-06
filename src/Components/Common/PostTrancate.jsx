import { Box, Text } from '@chakra-ui/react'
import { Wrap } from '@chakra-ui/react'
// import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import truncate from 'truncate-html';

export default function PostTrancate({ content, slug, char = 270 }) {
    return (
        <Box w='full'>
            <Text as='div' w='full' align={'justify'} noOfLines={{base:5, xl:8}} fontSize={'17px'} dangerouslySetInnerHTML={{
                __html: truncate(content, char, {
                    ellipsis: `...`,
                    byWords: true,
                    //    keepWhitespaces: true,
                    stripTags: false,
                    excludes: ['img', 'video', 'script'],
                    decodeEntities: true,
                    reserveLastWord: true
                })
            }} />
        </Box>
    )
}
