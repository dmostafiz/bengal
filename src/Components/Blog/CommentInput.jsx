import { Box } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';


export default function CommentInput() {
    const [value, setValue] = useState('')
    const editorRef = useRef(null)


    const image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
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
        <Box pb={0}>


            <Editor
                apiKey='n07kqhwmimi936tsx8nh222m7jrwbweyy7yowcwx8gjtmyol'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""

                init={{
                    placeholder: 'এখানে আপনার মন্তব্য লিখুন...',
                    height: 250,
                    menubar: false,
                    skin: 'oxide',
                    statusbar: false,
                    language: 'bn_BD',
                    language_url: '/lang/tinny/bn_BD.js',
                    plugins: [
                        'image', 'media', 'link', 'code', 'bullist', 'numlist'
                    ],
                    toolbar: 'bold italic underline bullist numlist link image media',
                    // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    // a11y_advanced_options: true
                    // file_picker_callback: tinnyImagePickerCallback,
                    images_upload_handler: image_upload_handler,

                    file_picker_types: 'file image media',
                    block_unsupported_drop: false
                }}

            />
        </Box>
    )
}
