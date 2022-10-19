import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import LoginComponent from './LoginComponent'
import RegistrationComponent from './RegistrationComponent'

export default function AuthComponent({px = 2, bg='gray.100'}) {
    return (

        <Tabs variant='unstyled' overflow='hidden'>

            <TabList border={'none'} bg='gray.200' px={3}>
                <Tab role={'group'} _selected={{ rounded: 'none', fontWeight:'bold'  }} px={{ base: 2 }}>
                    <Text _groupHover={{color: 'red'}} as={'h6'} fontSize={{ base: '14px', md: '15px' }}>লগইন করুন</Text>
                </Tab>

                <Tab role="group"  _selected={{ color: 'blackAlpha.900', rounded: 'none', fontWeight:'bold' }} px={{ base: 2 }}>
                    <Text as={'h6'} fontSize={{ base: '14px', md: '15px' }}>নিবন্ধন করুন</Text>
                </Tab>

    
            </TabList>

            <TabPanels bg={bg} w='full'>

                <TabPanel pt={5} px={px}>
                    <LoginComponent />
                </TabPanel>

                <TabPanel pt={5}  px={px}>
                    <RegistrationComponent />
                </TabPanel>

            </TabPanels>

        </Tabs>
    )
}
