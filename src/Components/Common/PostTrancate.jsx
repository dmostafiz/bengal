import { Box, Text } from '@chakra-ui/react'
import { Wrap } from '@chakra-ui/react'
// import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import truncate from 'truncate-html';

export default function PostTrancate({ content, slug, lines = 3 }) {
    return (

        <Box as='div' w='full' fontSize={'17px'} dangerouslySetInnerHTML={{
            __html: truncate(content, 270, {
                ellipsis: `...`,
                // byWords: true,
                keepWhitespaces: true,
                stripTags: false,
                excludes: ['img', 'video'],
                decodeEntities: true,
                reserveLastWord: true
            })
        }} />
    )
}
