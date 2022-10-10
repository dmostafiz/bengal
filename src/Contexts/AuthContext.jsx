import { createContext, useState } from "react"

export const AuthContext = createContext()

const AuthContextProvider = ( {children} ) => {

    const [isAuth, setIsAuth] = useState(false)
    const [authUser, setAuthUser] = useState(null)

    return <AuthContext.Provider value={{
        isAuth: true,
        authUser: null
    }}>
        {children}

    </AuthContext.Provider>
}

export default AuthContextProvider

