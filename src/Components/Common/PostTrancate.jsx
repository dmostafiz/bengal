import { Box, Text } from '@chakra-ui/react'
import { Wrap } from '@chakra-ui/react'
// import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
// import Truncate from '@nosferatu500/react-truncate'
import { stripHtml } from 'string-strip-html'
import TextTruncate from 'react-text-truncate';

export default function PostTrancate({ content, slug, lines = 3 }) {
    return (
        <Box color={'blackAlpha.900'}>
            <TextTruncate
                line={lines}
                element="span"
                truncateText="…"
                text={stripHtml(content).result}
                textTruncateChild={slug}
            />
        </Box>
    )
}
