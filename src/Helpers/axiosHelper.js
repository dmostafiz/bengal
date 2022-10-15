import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_API
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = useToken();


const request = axios.create({})

request.interceptors.request.use(

    req => {
        return req
    },

    err => {
        return Promise.reject(err)
    }

)

request.interceptors.response.use(

    res => {
        return res
    },

    err => {
        const status = err.response ? err.response.status : null

        if(status === 401){
            axios.post('/get_access_token', {
                refreshToken: 'getRefreshToken'
            })
            .then(response => {

            })
            .catch(error => {
                
            })
        }

        return Promise.reject(err)
    }

)

export default request