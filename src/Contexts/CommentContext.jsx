import { useDisclosure } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

export const CommentContext = createContext()

const CommentContextProvider = ({ children }) => {


    const [commentLoading, setCommentLoading] = useState(false)
    const [commentId, setCommentId] = useState(null)

    const [editorId, setEditorId] = useState(null)

    const [currentReplyThread, setCurrentReplyThread] = useState({
        showEditor: false,
        commentId: null
    })

    const [commentChildren, setCommentChildren] = useState(null)

    useEffect(() => {
        // alert(commentChildren)
    }, [commentChildren])

    return <CommentContext.Provider value={{
        setCurrentReplyThread, currentReplyThread,
        setCommentId, commentId,
        setCommentLoading, commentLoading,
        editorId, setEditorId,
        commentChildren, setCommentChildren
    }}>
        {children}
    </CommentContext.Provider>

}

export default CommentContextProvider