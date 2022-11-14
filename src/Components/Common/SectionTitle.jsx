import { Box, Flex, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function SectionTitle({component='', color='blackAlpha.800', icon = null, title, px = 0, py = 2, mb = 6, order = 4, showBorder = true, bg = 'transparent' }) {
    return (
        <Box py={py} px={px} borderBottom={showBorder ? '2px' : '0px'} borderColor={'blackAlpha.200'} bg={bg} mb={mb} fontWeight='bold' rounded='lg'>
          <Flex gap={3} direction={{base: 'column', xl: 'row'}} alignItems={{base: 'start', xl: 'center'}} justify='space-between'>
            <Title order={order}>
                <Flex alignItems={'center'} gap={1}>
                    {icon && icon}
                    <Text color={color}>{title}</Text>
                </Flex>
            </Title>

            {component && component}

          </Flex>
        </Box>

    )
}
