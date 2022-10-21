import Cookies from 'js-cookie'
import Axios from './axiosHelper'

export function setRedirectUrl(url) {
    Cookies.set('redirectUrl', url)
    console.log('Set Redirect URL: ', url)
}


export function getRedirectUrl() {
    const redirectUrl = Cookies.get('redirectUrl')
    Cookies.remove('redirectUrl')

    console.log('Get & remove Redirect URL: ', redirectUrl)

    return redirectUrl || '/'
}

export function setAccessToken(token) {
    console.log('Access Token Saved: ', token)
    Cookies.set('accessToken', token)
}

export function getAccessToken() {
    console.log('get accessToken')
    return Cookies.get('accessToken')
}

export function removeAccessToken() {
    console.log('Access Token Removed')
    Cookies.remove('accessToken')
}


export function setUpdateToken(token) {
    console.log('Update Token Saved: ', token)
    Cookies.set('updateToken', token)
}

export async function authorizeUpdateToken() {

    console.log('Get updateToken')
    const updateToken = Cookies.get('updateToken')

    if (updateToken) {

        const { data } = await Axios.post('/auth/authorize_initial_acc_update_token', {}, {
            headers: {
                Authorization: `Bearer ${updateToken}`
            }
        })

        console.log('authorize_initial_acc_update_token', data)

        if (data.ok) {
            return data
        }

        return null

    }

    return null
}


export function getUpdateToken() {

    console.log('Get updateToken')
    return Cookies.get('updateToken')


}


export function removeUpdateToken() {
    console.log('update Token Removed')
    Cookies.remove('updateToken')
}



export function setFlashMessage(type, title = '', msg = '') {
    console.log('Set flash msg: ', msg)
    Cookies.set('flashMessage', JSON.stringify({ type, title, msg }))
}

export function getFlashMessage() {
    const fls =  Cookies.get('flashMessage') ? JSON.parse(Cookies.get('flashMessage')) : null

    console.log('Get Flash Message ', fls)
    Cookies.remove('flashMessage')

    return fls
}
