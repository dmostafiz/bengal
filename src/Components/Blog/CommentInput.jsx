import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CommentInput() {
    const [value, setValue] = useState('');
    return (
        <Box pb={0}>

            <ReactQuill
                theme="snow"
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline'],        // toggled buttons
                        [{ 'header': [1, 2, 3, false] }],
                        ['blockquote', 'link'],
                        ['image', 'video'],


                        // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                        // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                        // [{ 'direction': 'rtl' }],                         // text direction

                        // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

                        // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        // [{ 'font': [] }],
                        [{ 'align': [] }],

                        // ['clean']                                         // remove formatting button
                    ]
                }}
                value={value}
                onChange={setValue}
            />
        </Box>
    )
}
