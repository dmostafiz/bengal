import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../Contexts/SocketContext'
import useUser from './useUser'

export default function useOnlineUser() {


    const { authUser, isLoading, isError, error } = useUser()

    const { onlineUsers } = useContext(SocketContext)

    const [onlineBloggers, setOnlineBloggers] = useState([])
    const [onlineReaders, setOnlineReaders] = useState([])
    const [onlineRegisteredReaders, setOnlineRegisteredReaders] = useState([])


    // console.log('Leftside auth: ', authUser)

    useEffect(() => {

        const bloggers = onlineUsers?.filter(usr => usr?.posts?.length > 0 )

        function getUniqueBloggersArray(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }
        const uniqueBloggers = getUniqueBloggersArray(bloggers, 'id')
        setOnlineBloggers(uniqueBloggers)

        const registeredUsers = onlineUsers?.filter(usr => usr?.posts?.length < 1 )

        function getUniqueRegisteredUsers(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }
        const uniqueRegisteredUsers = getUniqueRegisteredUsers(registeredUsers, 'id')
        setOnlineRegisteredReaders(uniqueRegisteredUsers)


        const readers = onlineUsers?.filter(usr => usr?.posts?.length == 0 || !usr.id)
        
        function getUniqueReadersArray(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }
        const uniqueReaders = getUniqueReadersArray(readers, 'id')
        setOnlineReaders(uniqueReaders)

    }, [onlineUsers])


    const isUserOnline = (userId) => {

        const user = onlineUsers?.find(usr => usr?.id == userId)

        // console.log('comment online user id', userId, user)

        return user ? true : false
    }

    return {  onlineUsers: onlineBloggers.concat(onlineReaders), isUserOnline, onlineBloggers, onlineReaders, onlineRegisteredReaders }
}
