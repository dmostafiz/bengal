import { Box } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'
import BloggerRightSidebar from '../../Components/blogger/BloggerRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'

export default function write() {
  return (
    <HomeLayout>

      <LayoutColumn

        rightSide={<></>}
        rightColumnWidth={30}
      // rightSide={<MainRightSidebar />}

      >

        <Box mb={8}>

          <Box mb={5} py={3} px={4} bg='blackAlpha.50'>
            <Title order={4}>ব্লগে লিখুন</Title>
          </Box>


          <Box>



          </Box>

        </Box>


      </LayoutColumn>

    </HomeLayout>
  )
}
