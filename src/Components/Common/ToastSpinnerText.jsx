import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export default function ToastSpinnerText({text=null}) {
  return (
    <Box zIndex={999999999} pos='fixed' p={2} right='10px' style={{position: 'fixed'}} top={{base: '90', md: '105px'}} rounded='full' bg={'white'} shadow='md'>
       <Flex color={'blackAlpha.600'} alignItems={'center'} gap='1'>
          <Spinner size={'sm'} />
           {text && <Text fontSize={'12px'}>{text}</Text>}
       </Flex>
    </Box>
  )
}
