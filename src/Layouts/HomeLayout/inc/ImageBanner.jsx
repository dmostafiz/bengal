import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import SectionContainer from '../../../Components/Common/SectionContainer'

export default function ImageBanner({src}) {
  return (
    <SectionContainer px={0}>
        <Image w='full' src={src} roundedTop='2xl'/>
    </SectionContainer>
  )
}
