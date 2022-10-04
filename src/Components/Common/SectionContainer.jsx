import { Container } from '@chakra-ui/react'
import React from 'react'

export default function SectionContainer({children, as='section', maxW='container.xl', bg='', px=3 }) {
  return (
    <Container as={as} maxW={maxW} bg={bg} px={px}>
        {children}
    </Container>
  )
}
