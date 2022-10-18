import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import { getUpdateToken } from "../Helpers/cookieHelper"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const router = useRouter()

    const [isAuth, setIsAuth] = useState(false)
    const [authUser, setAuthUser] = useState(null)

    const [loading, setLoading] = useState(false)

    const updateToken = getUpdateToken()

    // useEffect(() => {
    //     if (updateToken && !router.asPath.startsWith('/acc/initial/')) {
    //         window.location.href = '/acc/initial/update_profile_information'
    //         return <></>
    //     }

    //     setLoading(false)
    // }, [updateToken])



    return <AuthContext.Provider value={{
        isAuth: false,
        authUser: null
    }}>

       { children }

    </AuthContext.Provider>
}

export default AuthContextProvider

