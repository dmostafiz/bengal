import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import LoginComponent from './LoginComponent'
import RegistrationComponent from './RegistrationComponent'

export default function AuthComponent({px = 2, bg='gray.100'}) {
    return (

        <Tabs isFitted variant='unstyled' overflow='hidden'>

            <TabList border={'none'} bg='gray.200'>
                <Tab _selected={{ bg: 'gray.300', color: 'blackAlpha.900', rounded: 'none', fontWeight: 'normal' }} px={{ base: 2, md: 3 }}>
                    <Text as={'h6'} fontSize={{ base: '14px', md: '16px' }}>লগইন করুন</Text>
                </Tab>

                <Tab role="group"  _selected={{ bg: 'gray.300', color: 'blackAlpha.900', rounded: 'none', fontWeight: 'normal' }} px={{ base: 2, md: 3 }}>
                    <Text as={'h6'} fontSize={{ base: '14px', md: '16px' }}>নিবন্ধন করুন</Text>
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
