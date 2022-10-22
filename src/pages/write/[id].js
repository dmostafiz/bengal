import { Box, Button, Center, Divider, Flex, Image, Input, InputGroup, InputRightElement, Text, Tooltip, VStack } from '@chakra-ui/react'
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


export default function write() {

  const router = useRouter()
  
  const { onOpen } = useContext(AuthModalContext)

  const editorRef = useRef(null)

  const tinnyImagePickerCallback = (cb, value, meta) => {
    // return onOpen()


    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];

      console.log('TinnyMCE File ', file)

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        const id = 'blobid' + (new Date()).getTime();
        const blobCache = tinymce.activeEditor.editorUpload.blobCache;
        const base64 = reader.result.split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      });
      reader.readAsDataURL(file);
    });

    input.click();
  }


  const image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {

    // return onOpen()

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', 'postAcceptor.php');

    xhr.upload.onprogress = (e) => {
      progress(e.loaded / e.total * 100);
    };

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject('HTTP Error: ' + xhr.status);
        return;
      }

      const json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
        reject('Invalid JSON: ' + xhr.responseText);
        return;
      }

      resolve(json.location);
    };

    xhr.onerror = () => {
      reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
    };

    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
  })


  const [file, setFile] = useState(null)

  const [fileDataURL, setFileDataURL] = useState(null);

  useEffect(() => {

    console.log('UploadedFile ', file)

    let fileReader, isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);


  const data = [
    { value: 'গল্প', label: 'গল্প' },
    { value: 'উপন্যাস', label: 'উপন্যাস' },
    { value: 'সমসাময়িক', label: 'সমসাময়িক' },
    { value: 'কবিতা', label: 'কবিতা' },
    { value: 'সাহিত্য', label: 'সাহিত্য' },
    { value: 'পড়ালেখা', label: 'পড়ালেখা' },
    { value: 'দেশ-বিদেশ', label: 'দেশ-বিদেশ' },
    { value: 'ভ্রমণ', label: 'ভ্রমণ' },
    { value: 'মুক্তিযুদ্ধ', label: 'মুক্তিযুদ্ধ' },
    { value: 'ছবি ব্লগ', label: 'ছবি ব্লগ' },
    { value: 'বিজ্ঞান-প্রযুক্তি', label: 'বিজ্ঞান-প্রযুক্তি' },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [mainCategory, setMainCategory] = useState(selectedCategories[0]?.value);

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


  const [blogType, setBlogTyple] = useState('normal')

  const [stepStatus, setStepStatus] = useState('new')


  const [selectedStepPost, setSelectedStepPost] = useState(null)

  const [title, setTitle] = useState(null)

  useEffect(() => {

    if (blogType == 'normal' || stepStatus == 'new') {
      setSelectedStepPost(null)
    }

  }, [blogType, stepStatus])

  return (
    <HomeLayout>

      <LayoutColumn

        // leftColumnWidth={32}
        leftSide={<><BlogPanel /> </>}
        rightSide={<></>}

      >

        <AuthWrapper loading={true} component={<AuthWrapperLoginFrom redirectUrl={router.asPath} />}>

          <Box mb={8}>

            <Box py={2}>
              <Title order={3}>ব্লগ লিখুন</Title>
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
                  <Title order={5}>পোস্ট স্ট্যাটাস</Title>
                  {/* <Text fontSize={'13px'} color='blackAlpha.700'>সর্বনিম্ন ১টি এবং সর্বোচ্চ ৩ টি ক্যাটাগরি নির্বাচন করতে পারবেন</Text> */}
                </Box>


                <SegmentedControl
                  value={stepPosts.length ? stepStatus : 'new'}
                  onChange={setStepStatus}
                  data={[
                    { label: 'নতুন শুরু করছি', value: 'new' },
                    { label: 'পূর্বের পোস্ট চলমান', value: 'old', disabled: true }
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
              <InputGroup>
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
                  onChange={(e) => setTitle(e.target.value)}
                  readOnly={selectedStepPost && blogType == 'multiStep'}
                  value={selectedStepPost ? selectedStepPost.title : title}
                  type='text'
                />
                {blogType == 'multiStep' && <InputRightElement width={'100px'} >
                  <Text fontWeight={'bold'} whiteSpace={'nowrap'}>পর্ব - {stepStatus == 'new' ? '১' : '৭'}</Text>
                </InputRightElement>}
              </InputGroup>
            </Box>


            <Box mb={10}>
              <Box mb={1} px={1}>
                <Title order={6}>বিস্তারিত পোস্ট</Title>
              </Box>

              <Editor

                apiKey='n07kqhwmimi936tsx8nh222m7jrwbweyy7yowcwx8gjtmyol'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""

                init={{
                  placeholder: 'এখানে বিস্তারিত পোস্ট লিখুন...',
                  height: 500,
                  menubar: false,
                  language: 'bn_BD',
                  skin: 'snow',
                  icons: 'small  ',
                  language_url: '/lang/tinny/bn_BD.js',
                  statusbar: false,
                  plugins: [
                    'preview', 'image', 'media', 'link', 'code', 'bullist', 'numlist'
                  ],
                  toolbar: 'bold italic underline alignleft aligncenter bullist numlist link image media ',
                  // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                  // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  // a11y_advanced_options: true

                  file_picker_callback: tinnyImagePickerCallback,
                  images_upload_handler: image_upload_handler,

                  file_picker_types: 'image',
                  block_unsupported_drop: true,
                  images_file_types: 'jpg,svg,webp,png,jpeg,gif',

                  setup: (editor) => {
                    editor.on('click', () => {
                      //  onOpen()
                    });
                  }
                }}
              />

            </Box>


            <Box mb={10}>
              <Flex>
                <Box flex={1}>
                  <Box mb={1} px={0}>
                    <Title order={5}>প্রচ্ছদ ছবি</Title>
                  </Box>

                  <FileButton onChange={setFile} accept="image/png,image/jpeg">
                    {(props) => <Center bg={fileDataURL ? 'gray.800' : 'gray.50'} bgImage={fileDataURL} bgSize='contain' bgPosition={'center'} bgRepeat='no-repeat' border={'2px'} borderColor='blackAlpha.100' cursor={'pointer'} {...props} w='full' h={fileDataURL ? { base: 200, md: 500 } : 150}>
                      <Button bg={'whiteAlpha.600'} variant='outline'>{fileDataURL ? 'প্রচ্ছদ ছবি পরিবর্তন করুন' : 'প্রচ্ছদ ছবি আপলোড করুন'}</Button>
                    </Center>}
                  </FileButton>
                  {/* <Button {...props}>Upload image</Button> */}
                </Box>

                {/* <Box flex={1}>

              </Box> */}
              </Flex>
            </Box>


            <Box mb={10}>
              <Box mb={1} px={0}>
                <Title order={5}>লেখার ক্যাটাগরি</Title>
                <Text fontSize={'13px'} color='blackAlpha.700'>সর্বনিম্ন ১টি এবং সর্বোচ্চ ৩ টি ক্যাটাগরি নির্বাচন করতে পারবেন</Text>
              </Box>


              <MultiSelect
                data={data}
                searchable
                nothingFound="কোনকিছু পাওয়া যায়নি"
                maxSelectedValues={3}
                // label={}
                placeholder="৩ টি ক্যাটাগরি নির্বাচন করুন"
                value={selectedCategories}
                onChange={setSelectedCategories}

                sx={{
                  '&:focus': {
                    border: '0px'
                  }
                }}
              />

            </Box>


            <Box mb={10}>
              <Flex gap={3}>
                <Button >ড্রাফট এ সংরক্ষণ করুন</Button>
                <Button colorScheme={'green'}>পাবলিশ করতে প্রিভিউ করুন</Button>
              </Flex>
            </Box>


          </Box>

        </AuthWrapper>



      </LayoutColumn>

    </HomeLayout >
  )
}
