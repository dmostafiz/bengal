import { Avatar, Box, Button, Divider, Flex, Heading, Text, Wrap } from '@chakra-ui/react'
import { HoverCard, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import banglaNumber from '../../Helpers/banglaNumber'

export default function AuthorHoverCard({author}) {
    return (
        <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={400}>
            <HoverCard.Target>
                <Heading as='h6' size='xs' color={'gray.600'}>
                    {author.displayName}
                </Heading>
            </HoverCard.Target>
            <HoverCard.Dropdown p={10}>

                <Box bg='blackAlpha.5'>
                    <Flex direction={{ base: 'row', md: 'row' }} gap={3}>
                        <Box>
                            <Avatar size='md' shadow src={author.avatar} name={author.displayName} />
                        </Box>
                        <Box>
                            <Title order={4}><Text noOfLines={1}>{author.displayName}</Text></Title>
                            <Text fontSize={'12px'}>{banglaNumber(author?.posts?.length)} টি পোস্ট লিখেছেন</Text>
                        </Box>
                    </Flex>

                    <Box>
                        <Box px={0} pt={3}>
                            <Text noOfLines={2} fontSize='13px'>{author.bio}</Text>
                        </Box>

                        <Divider my={1} />

                        <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                            <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>
                                {banglaNumber(author?.followers?.length)}
                            </Text> জন অনুসরন করছে</Text>
                            <Wrap spacing={2} alignItems='flex-end'>
                                <Link href={`/blogger/${author.id}`}>
                                    <Button size='xs' rounded={'none'} colorScheme={'yellow'}>সকল পোস্ট দেখুন</Button>
                                </Link>
                                <Button size='xs' rounded={'none'} colorScheme={'blackAlpha'}>অনুসরণ করুন</Button>
                            </Wrap>
                        </Box>
                    </Box>
                    {/* <Divider my={1} /> */}
                </Box>

            </HoverCard.Dropdown>
        </HoverCard>
    )
}