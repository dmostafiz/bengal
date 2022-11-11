import { Box, Button, Center, Divider, Flex, FormControl, FormErrorMessage, Image, Input, InputGroup, InputRightElement, Text, Tooltip, useToast, VStack } from '@chakra-ui/react'
import { MultiSelect, SegmentedControl, Title } from '@mantine/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import BloggerRightSidebar from '../../Components/blogger/BloggerRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import { Editor } from '@tinymce/tinymce-react';
import { AuthModalContext } from '../../Contexts/AuthModalContext'
import { FileButton } from '@mantine/core';
import { Check, Search, X } from 'tabler-icons-react'
import { FaCheck } from 'react-icons/fa'
import BlogPanel from '../../Components/Common/BlogPanel'
import AuthWrapperLoginFrom from '../../Components/Auth/AuthWrapperLoginFrom'
import AuthWrapper from '../../Wrappers/AuthWrapper'
import { useRouter } from 'next/router'
import useInitialBlogWriting from '../../Hooks/useInitialBlogWriting'
import ComponentLoader from '../../Components/Common/ComponentLoader'
import usePostImageUpload from '../../Hooks/usePostImageUpload'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDebouncedState } from '@mantine/hooks'
import Axios from '../../Helpers/axiosHelper'
import ToastSpinnerText from '../../Components/Common/ToastSpinnerText'
// import banglaNumber from '../../Helpers/banglaNumber'
import banglaNumber from '../../Helpers/banglaNumber'
import categories from '../../Hooks/categories'

const schema = yup.object({

  title: yup.string()
    .min(5, 'সর্বনিম্ন ৫ টি ক্যারেক্টার লিখতে পারবেন।')
    .max(100, 'সর্বোচ্চ ১০০ টি ক্যারেক্টার লিখতে পারবেন।')
    .required('শিরোনাম লিখতে হবে'),

  category: yup.array()
    .min(1, 'সর্বনিম্ন ১টি ক্যাটাগরি সিলেক্ট করতে হবে।')
    .max(3, 'সর্বোচ্চ ৩টি ক্যাটাগরি সিলেক্ট করতে পারবেন')
    .required('ক্যাটাগরি সিলেক্ট করতে হবে।'),

  content: yup.string()
    // .min(10, 'কমপক্ষে ১০ টি বাক্য লিখুন।')
    .test('len', 'কমপক্ষে ৫০ টি বাক্য লিখতে হবে।', val => {
      const wordsArr = val?.split(' ')
      return wordsArr?.length >= 50
      //    console.log(wordsArr)
    })
    .required('বিস্তারিত লিখতে হবে')

}).required();


export default function write() {

  const router = useRouter()

  const toast = useToast()

  const { editingPost, editingPostLoading } = useInitialBlogWriting()
  // console.log('Post from writing page', editingPost)

  // const [post, setPost] = useState(null)

  // useEffect(() => {
  //   console.log('Get the editing post after request ', post)
  // }, [post])

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })


  const [currPost, setCurrentPost] = useState(null)

  const { setFile, preview, setPreview, image, tinny_mce_image_handler } = usePostImageUpload()

  const [title, setTitle] = useState('')
  const [titleDebounce, setTitleDebounce] = useDebouncedState('', 2000)

  const [content, setContent] = useState('')
  const [contentDebounce, setContentDebounce] = useDebouncedState('', 2000)

  const [blogType, setBlogTyple] = useState('normal')
  const [stepStatus, setStepStatus] = useState('new')

  const [selectedStepPost, setSelectedStepPost] = useState(null)

  const [postPart, setPostPart] = useState(1)

  const [cats, setCategories] = useState([])

  const [selectedCategories, setSelectedCategories] = useState([]);

  const getCategories = categories()

  useEffect(() => {
    console.log('TinnyMCE content ################', content)
  }, [content])


  useEffect(() => {

    const postCats = getCategories?.length ? getCategories.map((cat) => {
      return {
        value: cat.id,
        label: cat.name
      }
    }) : []

    // console.log('postCats', postCats)

    setCategories(postCats)

  }, [getCategories])



  useEffect(() => {
    (
      async () => {

        if (router.query?.id) {

          const res = await Axios.get(`/post/editing_post/${router.query.id}`)

          console.log('Editing post.... : ', res?.data?.post)

          if (res?.data?.ok) {

            const post = res?.data?.post

            reset({
              title: post?.title,
              content: post?.content,
              category: post?.categoryIDs
            })

            setTitle(post?.title)
            setContent(post?.content)
            setPreview(post?.image)
            setBlogTyple(post?.postType)
            setStepStatus(post?.part < 2 ? 'new' : 'old')
            setPostPart(post?.part || 1)
            setSelectedCategories(post?.categoryIDs)

            setCurrentPost(post)
          }

        }

      }
    )()

  }, [router])


  const { onOpen } = useContext(AuthModalContext)

  const editorRef = useRef(null)


  const stepPosts = [
    {
      title: "ফলের নাম না বলায় পুরো বাজারের ফল ট্রাক ভরে মায়ের জন্য নিয়ে এলেন ডিপজল",
      image: 'https://s3.amazonaws.com/somewherein/pictures/balchirabongal/balchirabongal-1664883109-9202d32_xlarge.jpg'
    },

    {
      title: "বান্দুরা রানী পবিত্র জপমালা গীর্জা",
      image: 'https://s3.amazonaws.com/somewherein/pictures/ayena/ayena-1664876247-6f7b737_xlarge.jpg'
    },
    {
      title: "রাম ও কৃষ্ণ - মানুষের কাছে পাঠানো নবী ছিলেন?",
      image: 'https://s3.amazonaws.com/somewherein/pictures/sherzatapon/sherzatapon-1665287090-be03f99_xlarge.jpg'
    },
    {
      title: "জনপ্রতিনিধিদের জবাবদিহিতাহীন এই সংস্কৃতি আরও কত বছর চলবে?",
      image: 'https://s3.amazonaws.com/somewherein/pictures/SabbirShakil666/SabbirShakil666-1664873600-089caf6_xlarge.jpg'
    },
  ];


  useEffect(() => {

    if (blogType == 'normal' || stepStatus == 'new') {
      setSelectedStepPost(null)
    }

  }, [blogType, stepStatus])


  const [postSaving, setSaving] = useState(false)

  useEffect(() => {

    if (currPost) {

      setSaving(true)
      savePost({
        title: title,
        content: content,
        status: 'drafted'
      })

    }

  }, [titleDebounce, contentDebounce])

  const [drafting, setDrafting] = useState(false)
  const handleDraftSave = () => {
    setDrafting(true)
    savePost({
      title: title,
      content: content,
      image: image,
      postType: blogType,
      part: blogType == 'multiStep' && stepStatus == 'new' ? 1 : blogType == 'multiStep' && stepStatus == 'old' ? 2 : null,
      categories: selectedCategories,
      status: 'drafted'
    })
  }

  const [publishing, setPublishing] = useState(false)
  const handlePublishBlog = () => {
    setPublishing(true)
    savePost({
      title: title,
      content: content,
      image: image,
      postType: blogType,
      part: blogType == 'multiStep' && stepStatus == 'new' ? 1 : blogType == 'multiStep' && stepStatus == 'old' ? 2 : null,
      categories: selectedCategories,
      status: 'published'
    })
  }

  const savePost = async (data) => {
    console.log(titleDebounce, contentDebounce)

    const res = await Axios.post('/post/update', {
      id: router.query.id,
      ...data,
    })

    if (res?.data?.ok) {
      toast({
        title: data.status == 'published' ? 'ব্লগটি সফলভাবে পাবলিশ হয়েছে!' : 'ব্লগটি খসড়াই সংরক্ষিত হয়েছে!',
        // description: "ব্লগে আপনাকে স্বাগতম।",
        status: data.status == 'published' ? 'success' : 'info',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      })

      if(data.status == 'published'){
        router.push(`/blog/${res?.data?.post?.id}`)
      }
    }

    setFile(null)

    setSaving(false)
    setDrafting(false)
    setPublishing(false)

  }

  return (
    <HomeLayout>

      <LayoutColumn

        // leftColumnWidth={32}
        leftSide={<><BlogPanel /> </>}
        rightSide={<>
          {(postSaving && (title || content)) && <ToastSpinnerText text='সেভ হচ্ছে...' />}
        </>}

      >



        <AuthWrapper loading={true} component={<AuthWrapperLoginFrom redirectUrl={router.asPath} />}>

          {

            editingPostLoading

              ? <ComponentLoader py='100' size='xl' />

              : editingPost

                ? <Box mb={8}>


                  <Box py={2}>
                    <Title order={3}>{router?.query?.editorStatus == 'update' ? 'ব্লগ পোস্ট আপডেট' : 'ব্লগ লিখুন'} </Title>
                  </Box>

                  <Divider mb={4} />

                  <Flex mb={10} direction={{ base: 'column', md: 'row' }} gap={5}>
                    <Box>
                      <Box mb={1} px={0}>
                        <Title order={5}>পোস্ট এর ধরন</Title>
                        {/* <Text fontSize={'13px'} color='blackAlpha.700'>সর্বনিম্ন ১টি এবং সর্বোচ্চ ৩ টি ক্যাটাগরি নির্বাচন করতে পারবেন</Text> */}
                      </Box>


                      <SegmentedControl
                        value={blogType}
                        onChange={setBlogTyple}
                        data={[
                          { label: 'সাধারণ', value: 'normal' },
                          { label: 'ধারাবাহিক', value: 'multiStep' }
                        ]}
                      />

                    </Box>


                    {blogType == 'multiStep' && <Box>

                      <Box mb={1} px={0}>
                        <Title order={5}>স্ট্যাটাস</Title>
                        {/* <Text fontSize={'13px'} color='blackAlpha.700'>সর্বনিম্ন ১টি এবং সর্বোচ্চ ৩ টি ক্যাটাগরি নির্বাচন করতে পারবেন</Text> */}
                      </Box>


                      <SegmentedControl
                        value={stepPosts.length ? stepStatus : 'new'}
                        onChange={setStepStatus}
                        data={[
                          { label: 'প্রথম পর্ব', value: 'new' },
                          { label: 'চলমান পোস্ট', value: 'old' }
                        ]}
                      />
                    </Box>}

                  </Flex>



                  {(blogType == 'multiStep' && stepStatus == 'old' && !selectedStepPost) && <Box mb={10}>
                    <Box w='full' py={{ base: 2, md: 2 }} px={{ base: 2, md: 3 }} bg='blackAlpha.50'>
                      <Box py={2}>
                        <Title order={5}>যে পোস্ট টি চলমান থাকবে <Text as={'span'} fontSize={'12px'}>(সিলেক্ট করুন)</Text></Title>
                      </Box>
                      <InputGroup>
                        <Input
                          border={'1px'}
                          borderColor='blackAlpha.200'
                          _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                          _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                          bg={'whiteAlpha.700'}
                          size={'md'}
                          placeholder='অনুসন্ধান করুন'
                          rightSide='dfd'
                          type='email'
                        />

                        <InputRightElement>
                          <Search />
                        </InputRightElement>

                      </InputGroup>

                      <Box py={3}>
                        <Box maxH={'250px'} overflowY={'auto'}>

                          {stepPosts.length ? stepPosts.map((post, index) => <Flex
                            key={index}
                            cursor='pointer'
                            onClick={() => setSelectedStepPost(post)}
                            _hover={{
                              bg: 'gray.100'
                            }}

                            p={2}
                            mb={1}
                            alignItems={'center'}
                            gap={2}
                            bg='white'
                          >
                            <Box w='70px'>
                              <Image src={post.image} />
                            </Box>
                            <Box flex={1}>
                              <Title order={6}><Text noOfLines={1}>{post.title}</Text></Title>
                              <Text as='span' fontSize={{ base: '11px', md: '14px' }}>৭ পর্ব লেখা হয়েছে</Text>
                            </Box>

                          </Flex>
                          ) : <Center py={5}>
                            <VStack>
                              <Text>কোন ধারাবাহিক পোস্ট পাওয়া যায়নি</Text>
                            </VStack>
                          </Center>}
                        </Box>


                      </Box>


                    </Box>
                  </Box>
                  }


                  {selectedStepPost && <Box mb={10}>

                    <Box py={2}>
                      <Title order={5}>যে পোস্ট টি চলমান থাকবে</Title>
                    </Box>

                    <Flex
                      p={2}
                      mb={2}
                      alignItems={'center'}
                      gap={2}
                      bg='blackAlpha.50'
                    >
                      <Box w='70px' h='70px' bgImage={selectedStepPost.image} bgSize='cover' bgRepeat={'no-repeat'} bgPos='center'>
                      </Box>

                      <Box flex={1}>
                        <Title order={6}><Text noOfLines={1}>{selectedStepPost.title}</Text></Title>
                        <Text as='span' fontSize={{ base: '11px', md: '14px' }}>৭ পর্ব লেখা হয়েছে | সর্বশেষ আপডেট ~ ১২ ই অক্টোবর</Text>
                      </Box>
                      <Box w={{ base: 5, md: 10 }}>
                        <X cursor={'pointer'} onClick={() => setSelectedStepPost(null)} color='red' fontSize={{ base: '16px', md: '24px' }} />
                      </Box>
                    </Flex>
                  </Box>}


                  <Box mb={10}>
                    <Box mb={1} px={0}>
                      <Title order={5}>শিরোনাম</Title>
                    </Box>
                    <FormControl isInvalid={errors.title}>
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value, ref } }) => <InputGroup>
                          <Input
                            key={selectedStepPost}
                            border={'1px'}
                            borderColor='blackAlpha.200'
                            _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
                            _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
                            bg={'whiteAlpha.700'}
                            size={'md'}
                            placeholder='এখানে শিরোনাম লিখুন'
                            rightSide='dfd'
                            // onChange={(e) => setTitle(e.target.value)}
                            readOnly={selectedStepPost && blogType == 'multiStep'}
                            value={selectedStepPost ? selectedStepPost.title : value}
                            type='text'
                            onChange={e => {
                              setTitle(e.target.value)
                              setTitleDebounce(e.target.value)
                              onChange(e.target.value)
                            }
                            }
                          // value={selectedStepPost ? selectedStepPost.title : value}
                          // {...register('title')}
                          />
                          {blogType == 'multiStep' && <InputRightElement width={'100px'} >
                            <Text fontWeight={'bold'} whiteSpace={'nowrap'}>পর্ব - {stepStatus == 'new' ? banglaNumber(postPart) : banglaNumber(24)}</Text>
                          </InputRightElement>}
                        </InputGroup>}
                      />


                      <FormErrorMessage>
                        {errors.title && errors.title.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>


                  <Box mb={10}>
                    <Box mb={1} px={1}>
                      <Title order={6}>বিস্তারিত পোস্ট</Title>
                    </Box>

                    <FormControl isInvalid={errors.content}>
                      <Controller
                        name="content"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value, ref } }) => <Editor
                          apiKey='n07kqhwmimi936tsx8nh222m7jrwbweyy7yowcwx8gjtmyol'
                          onInit={(evt, editor) => editorRef.current = editor}
                          value={value}
                          onEditorChange={val => {
                            setContent(val)
                            setContentDebounce(val)
                            onChange(val)
                          }}
                          init={{
                            placeholder: 'এখানে বিস্তারিত পোস্ট লিখুন...',
                            height: 500,
                            menubar: false,
                            language: 'bn_BD',
                            skin: 'snow',
                            icons: 'small  ',
                            language_url: '/lang/tinny/bn_BD.js',
                            statusbar: false,
                            // plugins: [
                            //   'preview', 'image', 'media', 'link', 'code', 'bullist', 'numlist'
                            // ],
                            // toolbar: 'bold italic underline alignleft aligncenter bullist numlist link image media ',
                            plugins: [
                              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'emoticons'
                            ],
                            toolbar: 'blocks bold underline image media link emoticons',
                            block_formats: 'Paragraph=p; প্যারাগ্রাফ হেডিং=h3',
                            images_upload_handler: tinny_mce_image_handler,
                            file_picker_types: 'image',
                            block_unsupported_drop: true,
                            images_file_types: 'jpg,svg,webp,png,jpeg,gif',
                            content_style: 'img { width: 100%; height: auto }',
                            image_caption: true,

                            br_in_pre: true,
                            forced_root_block: 'div',
                            force_br_newlines: true,
                            force_p_newlines: false,
                            convert_newlines_to_brs: true,

                            setup: (editor) => {
                              editor.on('click', () => {
                                //  onOpen()
                              });
                            }
                          }}
                        />}
                      />

                      <FormErrorMessage>
                        {errors.content && errors.content.message}
                      </FormErrorMessage>

                    </FormControl>

                  </Box>


                  <Box width={{ base: 'full', md: '50%' }} mb={10}>

                    <Box mb={1} px={0}>
                      <Title order={5}>প্রচ্ছদ ছবি</Title>
                      <Text fontSize={'13px'} color='blackAlpha.700'>পোস্টটি আকর্ষণীয় করতে একটি প্রচ্ছদ ছবি আপলোড করুন</Text>
                    </Box>

                    <FileButton onChange={setFile} accept="image/png,image/jpeg">
                      {(props) => <Center bg={preview ? 'gray.800' : 'gray.50'} bgImage={preview} bgSize='contain' bgPosition={'center'} bgRepeat='no-repeat' border={'2px'} borderColor='blackAlpha.100' cursor={'pointer'} {...props} w='full' h={preview ? { base: 200, md: 200 } : 150}>
                        <Button size='sm' bg={'whiteAlpha.600'} variant='outline'>{preview ? 'প্রচ্ছদ ছবি পরিবর্তন করুন' : 'প্রচ্ছদ ছবি আপলোড করুন'}</Button>
                      </Center>}
                    </FileButton>

                  </Box>

                  <Box mb={10}>

                    <Box mb={1} px={0}>
                      <Title order={5}>পোস্ট এর ক্যাটাগরি</Title>
                      <Text fontSize={'13px'} color='blackAlpha.700'>সর্বনিম্ন ১টি এবং সর্বোচ্চ ৩ টি ক্যাটাগরি নির্বাচন করতে পারবেন</Text>
                    </Box>

                    <FormControl isInvalid={errors.category}>

                      <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value, ref } }) =>
                          <MultiSelect
                            zIndex={99999999}
                            data={cats}
                            searchable
                            nothingFound="কোনকিছু পাওয়া যায়নি"
                            maxSelectedValues={3}
                            // label={}
                            placeholder="৩ টি ক্যাটাগরি নির্বাচন করুন"
                            value={value}
                            onChange={val => {
                              setSelectedCategories(val)
                              onChange(val)
                            }}

                            sx={{
                              '&:focus': {
                                border: '0px'
                              }
                            }}
                          />}
                      />
                      <FormErrorMessage>
                        {errors.category && errors.category.message}
                      </FormErrorMessage>
                    </FormControl>

                  </Box>


                  <Box mb={48}>
                    <Flex gap={3}>
                      <Button
                        isLoading={drafting}
                        onClick={handleDraftSave}
                      >
                        খসড়াই সংরক্ষণ করুন
                      </Button>
                      <Button
                        isLoading={publishing}
                        onClick={handleSubmit(handlePublishBlog)}
                        colorScheme={'green'}>
                        পাবলিশ করুন
                      </Button>
                    </Flex>
                  </Box>


                </Box>

                : <Center py={20}>
                  <Text>দুঃখিত! কোন পোস্ট পাওয়া যায়নি।</Text>
                </Center>
          }

        </AuthWrapper>



      </LayoutColumn>

    </HomeLayout >
  )
}
