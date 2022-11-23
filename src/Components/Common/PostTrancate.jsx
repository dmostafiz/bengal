import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import truncate from 'truncate-html';

export default function PostTrancate({image='', content, slug, char = 270 }) {
    return (
        <Box w='full'>
            <Text as='div' w='full' align={'justify'} noOfLines={{base:6, xl: image ? 10 : 8 }} dangerouslySetInnerHTML={{
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
