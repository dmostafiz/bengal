import { useQuery } from '@tanstack/react-query'
import useSWR from 'swr'
import Axios from '../Helpers/axiosHelper'


const categories = () => {

    const { data, error } = useSWR('/category', async (url) => {

        const response = await Axios.get(url)

        // console.log(response)
        return response?.data?.categories || []

    }, {
        // refetchOnWindowFocus: false,
        // retry: false,
    })

    return data
}


export default categories
