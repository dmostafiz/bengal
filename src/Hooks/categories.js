import { useQuery } from '@tanstack/react-query'
import Axios from '../Helpers/axiosHelper'


const categories = () => {

    const { data, isLoading, isError, error } = useQuery(['categories'], async () => {

        const response = await Axios.get('/category')

        // console.log(response)

        return response?.data?.categories || []

    }, {
        // refetchOnWindowFocus: false,
        // retry: false,
    })

    return data
}


export default categories
