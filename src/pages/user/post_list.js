import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import SectionTitle from '../../Components/Common/SectionTitle'
import AccountWrapper from './AccountWrapper'

export default function post_list() {

    const [user, setUser] = useState(null)

    return (
        <AccountWrapper
            title='আমার ব্লগিং'
            getUser={setUser}
        >
            <Box my={10}>
                {/* <SectionTitle title={'আমার ব্লগিং'} /> */}
                <Tabs size={'sm'} variant='enclosed'>
                    <TabList>
                        <Tab>সকল প্রকাশিত পোস্ট</Tab>
                        <Tab>খসড়া পোস্ট</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </AccountWrapper>
    )
}
