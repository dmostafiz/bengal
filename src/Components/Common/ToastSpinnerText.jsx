import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

export default function ToastSpinnerText({text=null}) {
  return (
    <Box pos='fixed' p={2} right='30px' style={{position: 'fixed'}} top='355px' rounded='full' bg={'white'} shadow='md'>
       <Flex color={'blackAlpha.600'} alignItems={'center'} gap='1'>
          <Spinner size={'sm'} />
           {text && <Text fontSize={'12px'}>{text}</Text>}
       </Flex>
    </Box>
  )
}
