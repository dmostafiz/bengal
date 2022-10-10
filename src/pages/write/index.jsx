import { Box, Divider, Input, Text } from '@chakra-ui/react'
import { Title } from '@mantine/core'
import React, { useContext, useRef } from 'react'
import BloggerRightSidebar from '../../Components/blogger/BloggerRightSidebar'
import HomeLayout from '../../Layouts/HomeLayout'
import LayoutColumn from '../../Layouts/HomeLayout/LayoutColumn'
import { Editor } from '@tinymce/tinymce-react';
import { AuthModalContext } from '../../Contexts/AuthModalContext'


export default function write() {

  const {onOpen} = useContext(AuthModalContext)

  const editorRef = useRef(null)

  const tinnyImagePickerCallback = (cb, value, meta) => {
    return onOpen()

    
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

    return onOpen()

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


  return (
    <HomeLayout>

      <LayoutColumn

        rightSide={<></>}
        rightColumnWidth={30}
      // rightSide={<MainRightSidebar />}

      >

        <Box mb={8}>

          <Box py={2}>
            <Title order={4}>ব্লগ লিখুন</Title>
          </Box>

          <Divider mb={4} />

          <Box mb={10}>
            <Box mb={1} px={1}>
              <Title order={6}>শিরোনাম</Title>
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
                placeholder: 'এখানে বিস্তারিত পোস্ট লিখুন',
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
                     onOpen()
                  });
                }
              }}
            />

          </Box>

        </Box>


      </LayoutColumn>

    </HomeLayout>
  )
}
