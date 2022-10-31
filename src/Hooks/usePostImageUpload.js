import { useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Axios from '../Helpers/axiosHelper';

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

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e) => {

        const file = e.target.files[0];

        console.log('TinnyMCE File ', file)

        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.onloadend = () => {
       
            Axios.post('/post/image_upload', {image: reader.result})
            .then(res => {
                // console.log('image upload success ', res.data)
                cb(res.data.location, { title: file.name });
            })
            .catch(err => {
                console.log('File upload err', err.message)
            })
    
          }

    });

    input.click();
}


  return { file, setFile, preview, setPreview, image, tinny_mce_image_handler, tinnyImagePickerCallback }
}
