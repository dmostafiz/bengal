import { Box } from '@chakra-ui/react';
import React, { useContext, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { AuthModalContext } from '../../Contexts/AuthModalContext';
import useUser from '../../Hooks/useUser';
import Axios from '../../Helpers/axiosHelper';
import axios from 'axios';


export default function CommentInput() {
    const [value, setValue] = useState('')

    const editorRef = useRef(null)

    const { authUser, isLoading, hasUser, isError, error, logoutUser } = useUser()


    const { onOpen, seTitle } = useContext(AuthModalContext)


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


    return (
        <Box pb={0}>


            <Editor
                apiKey='n07kqhwmimi936tsx8nh222m7jrwbweyy7yowcwx8gjtmyol'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""

                init={{
                    placeholder: 'এখানে আপনার মন্তব্য লিখুন...',
                    height: 350,
                    resize: true,
                    menubar: false,
                    skin: 'oxide',
                    statusbar: false,
                    language: 'bn_BD',
                    language_url: '/lang/tinny/bn_BD.js',
                    plugins: [
                        'image', 'link', 'code', 'bullist', 'numlist'
                    ],
                    toolbar: 'bold italic underline bullist numlist link image',
                    // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    // a11y_advanced_options: true
                    file_picker_callback: tinnyImagePickerCallback,
    

                    // file_picker_types: 'file image',
                    file_picker_types: 'image',
                    automatic_uploads: true,
                    // file_browser_callback_types: 'file image media',
                    // block_unsupported_drop: false
                }}

            />
        </Box>
    )
}
