import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";
import { createContext, useEffect, useState } from "react";
import { io } from 'socket.io-client';
import useUser from "../Hooks/useUser";

export const SocketContext = createContext()

const SocketContextProvider = ({ children }) => {

    const socket = useRef(null)
    
    const [onlineUsers, setOnlineUsers] = useState([])

    const { isLoading, authUser } = useUser()

    useEffect(() => {
      socket.current = io(process.env.SERVER_HOST)
    }, [])

    useEffect(() => {
        if (!isLoading && authUser) {
            socket?.current?.emit('addUser', authUser)
        }else if(!isLoading && !authUser){
            socket?.current?.emit('addUser', {})

        } 
    }, [authUser])


    useEffect(() => {
        socket?.current?.on('socketUsers', (data) => {
            // console.log('Online Users: ', data);
            setOnlineUsers(data)
        })
    }, socket.current)

    return <SocketContext.Provider value={{
        socket: socket.current, 
        onlineUsers
    }}>
        {children}
    </SocketContext.Provider>

}

export default SocketContextProvider