import { Box, Heading, Text, VisuallyHidden } from '@chakra-ui/react'
import TabContainer from '../Components/HomePage/TabContainer'
import MainLeftSidebar from '../Layouts/Common/MainLeftSidebar'
import MainRightSidebar from '../Layouts/Common/MainRightSidebar'
import HomeLayout from '../Layouts/HomeLayout'
import LayoutColumn from '../Layouts/HomeLayout/LayoutColumn'
import TopBloggers from '../Components/HomePage/TopBloggers'
import LatestBlogPost from '../Components/HomePage/LatestBlogPost'
import SectionTitle from '../Components/Common/SectionTitle'
import TopPostsCarousel from '../Components/HomePage/TopPostsCarousel'
import TopCommenters from '../Components/HomePage/TopCommenters'
import { siteDesc } from '../Helpers/config'

const Home = () => {


  return (
    <HomeLayout>

      <LayoutColumn

        leftSide={<MainLeftSidebar />}

        rightSide={<MainRightSidebar />}

        pageTopSection={<></>}

      >

        <VisuallyHidden>
          <Heading as='h1'>সামান্তরিক বাংলা ব্লগ</Heading>
          <Text>{siteDesc}</Text>
        </VisuallyHidden>

        <Box mb={8} w='full' overflow={'hidden'}>
          <TabContainer childrens={[
            {
              title: 'জনপ্রিয় পোস্ট',
              component: <TopPostsCarousel />
            },

            // {
            //   title: 'বাছাইকৃত পোস্ট',
            //   component: <SelectedPostsCarousel />
            // },

            // {
            //   title: 'ধারাবাহিক পোস্ট',
            //   component: <StepPostsCarousel />
            // },

            {
              title: 'টপ ব্লগার',
              component: <TopBloggers />
            },

          ]} />


        </Box>

        <TopCommenters />

        <Box mb={8}>
          <SectionTitle showBorder={false} mb={2} title='সাম্প্রতিক পোস্ট (ক্রমানুসারে)' />
          <LatestBlogPost />
        </Box>

      </LayoutColumn>

    </HomeLayout>
  )
}

Home.getInitialProps = async (ctx) => {

  return {}
}

export default Home