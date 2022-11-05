import { Avatar, Box, Center, Divider, Flex, Image, Show, Spacer, Text, VStack } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import { ThumbUp } from 'tabler-icons-react'
import PostCard from '../Components/Common/PostCard'
import SectionContainer from '../Components/Common/SectionContainer'
import TabContainer from '../Components/HomePage/TabContainer'
import MainLeftSidebar from '../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../Layouts/Common/MainRightSidebar'
import SelectedPostsCarousel from '../Components/HomePage/SelectedPostsCarousel'
import HomeLayout from '../Layouts/HomeLayout'
import ImageBanner from '../Layouts/HomeLayout/inc/ImageBanner'
import LayoutColumn from '../Layouts/HomeLayout/LayoutColumn'
import TopBloggers from '../Components/HomePage/TopBloggers'
import StepPostsCarousel from '../Components/HomePage/StepPostsCarousel'
import { useEffect } from 'react'
import req from '../Helpers/axiosHelper'
import BlogPanel from '../Components/Common/BlogPanel'
import LatestBlogPost from '../Components/HomePage/LatestBlogPost'
import SectionTitle from '../Components/Common/SectionTitle'

export default function Home() {


  // useEffect(() => {

  //   (
  //     async () => {

  //       const  {data} = await req.get('/auth')
  //       console.log('Requested User: ', data)
  //     }
  //   )()

  // }, [])

  return (
    <HomeLayout>

      <LayoutColumn

        leftSide={<MainLeftSidebar />}

        rightSide={<MainRightSidebar />}

        pageTopSection={<></>}

      >

        {/* <ImageBanner src='/banner.png' /> */}

        {/* <Box mb={8}></Box> */}


        <Show below='md'>
          <BlogPanel />
        </Show>

        <Box mb={8} w='full' overflow={'hidden'}>

          <TabContainer childrens={[
            {
              title: 'বাছাইকৃত পোস্ট',
              component: <SelectedPostsCarousel />
            },

            {
              title: 'ধারাবাহিক',
              component: <StepPostsCarousel />
            },

            {
              title: 'সেরা ব্লগার',
              component: <TopBloggers />
            },

          ]} />


        </Box>


        <Box mb={8}>

          <SectionTitle title='সাম্প্রতিক পোস্ট (ক্রমানুসারে)' />
          
          <LatestBlogPost />

        </Box>


      </LayoutColumn>

    </HomeLayout>
  )
}
