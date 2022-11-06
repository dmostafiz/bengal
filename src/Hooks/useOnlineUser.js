import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../Contexts/SocketContext'
import useUser from './useUser'

export default function useOnlineUser() {


    const { authUser, isLoading, isError, error } = useUser()

    const { onlineUsers } = useContext(SocketContext)


    const [onlineBloggers, setOnlineBloggers] = useState([])
    const [onlineReaders, setOnlineReaders] = useState([])

    // console.log('Leftside auth: ', authUser)

    useEffect(() => {

        const bloggers = onlineUsers?.filter(usr => usr?.posts?.length > 0)

        // console.log('online bloggers', bloggers)

        setOnlineBloggers(bloggers)

        const readers = onlineUsers?.filter(usr => usr?.posts?.length == 0 || !usr.id)
        setOnlineReaders(readers)

    }, [onlineUsers])
    

    const isUserOnline = (userId) => {

        const user = onlineUsers?.find(usr => usr?.id == userId)

        // console.log('comment online user id', userId, user)

        return user ? true : false
    }

    return {onlineUsers, isUserOnline, onlineBloggers, onlineReaders}
}
