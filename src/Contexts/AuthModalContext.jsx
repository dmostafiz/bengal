import { useDisclosure } from "@chakra-ui/react";
import { createContext, useState } from "react";

export const AuthModalContext = createContext()

const AuthModalContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)
    const [authUser, setAuthUser] = useState(null)

    const [title, seTitle] = useState('লগইন অথবা রেজিস্ট্রেশন করুন')


    const { isOpen, onOpen, onClose } = useDisclosure()

    return <AuthModalContext.Provider value={{
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
        title,
        seTitle
    }}>
        {children}
    </AuthModalContext.Provider>

}

export default AuthModalContextProvider