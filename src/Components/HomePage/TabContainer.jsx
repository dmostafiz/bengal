import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React from 'react'

export default function TabContainer({ childrens }) {
    return (
        <Tabs variant='enclosed' rounded={{base: 'sm', md:'lg'}} overflow='hidden' shadow='sm'>
          
            <TabList border={'none'}>
                {childrens.map((item, index) => <Tab role="group" _selected={{ bg: 'gray.100', rounded: 'none', fontWeight: 'semibold' }} px={{base: 2, md: 3}} key={index}>
                   <Text as={'h6'} _groupActive={{}} fontSize={{base:'14px', md: '17px'}}>{item.title}</Text>  
                </Tab>)}
            </TabList> 

            <TabPanels bg='gray.100' w='full'>
                {childrens.map((item, index) => <TabPanel key={index}>
                    {item.component}
                </TabPanel>)} 
            </TabPanels>

        </Tabs>
    )
}
