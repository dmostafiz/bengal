import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { createContext, useEffect, useState } from "react"
import Axios from "../Helpers/axiosHelper"
import { getAccessToken, getUpdateToken, removeAccessToken } from "../Helpers/cookieHelper"
import useUser from "../Hooks/useUser"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {


    const { data, isLoading, isError, error } = useQuery(['authUser'], async () => {

        const response = await Axios.get('/auth/get_authorised_user')

        // console.log('Authorized User: ', response?.data?.user)

        return response?.data?.user
    })

    const logoutUser = async () => {
        // alert('logout')
        const response = await Axios.post('/auth/logout')
        if(response?.data?.ok){
            removeAccessToken()

            window.location.href = '/'
        }
    }

    return <AuthContext.Provider value={{
        isLoading: isLoading,
        authUser: data,
        isError: isError,
        error: error,
        logoutUser
    }}>

        {children}

    </AuthContext.Provider>
}

export default AuthContextProvider

