import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'

export default function ImageBanner({src}) {
  return (
    <>
        <Image shadow={''} w='full' src={src} />
    </>
  )
}
