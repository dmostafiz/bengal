import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function SectionTitle({component='', color='gray.500', icon = null, title, px = 0, py = 2, mb = 6, order = 4, showBorder = true, bg = 'transparent' }) {
    return (
        <Box py={py} px={px} borderBottom={showBorder ? '1px' : '0px'} borderColor={'blackAlpha.200'} bg={bg} mb={mb} fontWeight='bold' rounded='none'>
          <Flex gap={3} direction={{base: 'column', xl: 'row'}} alignItems={{base: 'start', xl: 'center'}} justify='space-between'>
            <Heading as={'h2'} size='sm'>
                <Flex alignItems={'center'} gap={1}>
                    {icon && icon}
                    <Text fontWeight={'bold'} color={color}>{title}</Text>
                </Flex>
            </Heading>

            {component && component}

          </Flex>
        </Box>

    )
}
