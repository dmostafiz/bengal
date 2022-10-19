import { Button } from '@chakra-ui/react'
import React from 'react'

export default function CustomButton(props) {
  return (
    <Button {...props} loadingText='অপেক্ষা করুন...'>{props.children}</Button>
  )
}
