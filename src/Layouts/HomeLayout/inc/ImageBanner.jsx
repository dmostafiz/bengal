import { Image } from '@chakra-ui/react'
import React from 'react'

export default function ImageBanner({src}) {
  return (
    <>
        <Image shadow={''} w='full' src={src} />
    </>
  )
}
