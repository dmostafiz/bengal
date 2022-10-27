import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

export default function usePostImageUpload() {

  const toast = useToast()

  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null);

  useEffect(() => {

    console.log('UploadedFile ', file)

    let fileReader = false;

    if (file) {

      const fileSize = file.size / 1024 / 1024

      console.log('File size: ', fileSize)

      if (fileSize > 1) {
        toast({
          title: 'দুঃখিত!',
          description: "সর্বচ্চো ১ মেগাবাইট এর ছবি আপলোড করতে পারবেন!",
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        })

        setFile(null)

        return
      }

      // if(file.size > )

      setPreview(URL.createObjectURL(file))

      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onloadend = () => {
        // console.log('Loaded Image: ', reader.result)
        setImage(reader.result)

      }
    }

    return () => {
      // isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }



  }, [file]);




  const tinny_mce_image_handler = (blobInfo, progress) => new Promise((resolve, reject) => {

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

      // const json = JSON.parse(xhr.responseText);

      // if (!json || typeof json.location != 'string') {
      //   reject('Invalid JSON: ' + xhr.responseText);
      //   return;
      // }

      // resolve(json.location);
    };

    xhr.onerror = () => {
      reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
    };

    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
  })


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


  return { file, setFile, preview, setPreview, image, tinny_mce_image_handler, tinnyImagePickerCallback }
}
