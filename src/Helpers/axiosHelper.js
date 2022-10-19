import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_API
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = useToken();


const Axios = axios.create({})

Axios.interceptors.request.use(

    req => {
        return req
    },

    err => {
        // return Promise.reject(err)
        return { data: {ok: false, msg: err?.message } }
    }

)

Axios.interceptors.response.use(

    res => {
        return res
    },

    err => {
        const status = err.response ? err.response.status : null


        if (status === 401) {
            // axios.post('/auth/refresh')
            //     .then(response => {

            //     })
            //     .catch(error => {

            //     })
        }

        if (status === 401) {
            // console.log('404 Error! ', res)
        }

        // return { data: { ok: false, msg: err?.message } }

    }

)

export default Axios