import { Box, Button, Center, Divider, Flex, Input, Text } from '@chakra-ui/react'
import { MultiSelect, SegmentedControl, Title } from '@mantine/core'
import React, { useContext, useEffect, useRef, useState } from 'react'
import BloggerRightSidebar from '../../Components/blogger/BloggerRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import { Editor } from '@tinymce/tinymce-react';
import { AuthModalContext } from '../../Contexts/AuthModalContext'
import { FileButton } from '@mantine/core';


export default function write() {

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

  const [blogType, setBlogTyple] = useState('normal')

  const [stepStatus, setStepStatus] = useState('new')


  const stepPosts = [
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
      label: 'Bender Bending Rodríguez',
      value: 'Bender Bending Rodríguez',
      description: 'Fascinated with cooking',
    },
  
    {
      image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
      label: 'Carol Miller',
      value: 'Carol Miller',
      description: 'One of the richest people on Earth',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
      label: 'Homer Simpson',
      value: 'Homer Simpson',
      description: 'Overweight, lazy, and often ignorant',
    },
    {
      image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
      label: 'Spongebob Squarepants',
      value: 'Spongebob Squarepants',
      description: 'Not just a sponge',
    },
  ];
  

  return (
    <HomeLayout>

      <LayoutColumn

        rightSide={<></>}
        rightColumnWidth={30}
      // rightSide={<MainRightSidebar />}

      >

        <Box mb={8}>

          <Box py={2}>
            <Title order={3}>ব্লগ লিখুন</Title>
          </Box>

          <Divider mb={4} />

          <Box mb={10}>
            <Box mb={1} px={0}>
              <Title order={5}>শিরোনাম</Title>
            </Box>
            <Input
              border={'1px'}
              borderColor='blackAlpha.200'
              _focus={{ ring: '0', border: '1px', borderColor: 'blackAlpha.300' }}
              _hover={{ ring: '0', border: '1px', borderColor: 'blackAlpha.200' }}
              bg={'whiteAlpha.700'}
              size={'md'}
              placeholder='এখানে শিরোনাম লিখুন'
              type='email'
            />
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
                height: 400,
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
            <Box mb={1} px={0}>
              <Title order={5}>লেখার ধরন</Title>
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

          {blogType == 'multiStep' && <Box mb={10}>

            <Box mb={1} px={0}>
              <Title order={5}>ধারাবাহিক লেখার স্ট্যাটাস</Title>
              {/* <Text fontSize={'13px'} color='blackAlpha.700'>সর্বনিম্ন ১টি এবং সর্বোচ্চ ৩ টি ক্যাটাগরি নির্বাচন করতে পারবেন</Text> */}
            </Box>


            <SegmentedControl
              value={stepStatus}
              onChange={setStepStatus}
              data={[
                { label: 'নতুন শুরু করছি', value: 'new' },
                { label: 'পূর্বের লেখা থেকে চলমান', value: 'old' }
              ]}
            />


          </Box>}



          {blogType == 'multiStep' && stepStatus == 'old' && <Box mb={10}>

            <Box mb={1} px={0}>
              <Title order={5}>পূর্বের ধারাবাহিক লেখা নির্বাচন করুন</Title>
              {/* <Text fontSize={'13px'} color='blackAlpha.700'>সর্বনিম্ন ১টি এবং সর্বোচ্চ ৩ টি ক্যাটাগরি নির্বাচন করতে পারবেন</Text> */}
            </Box>



          </Box>}


        </Box>


      </LayoutColumn>

    </HomeLayout>
  )
}
