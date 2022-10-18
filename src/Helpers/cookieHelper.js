import Cookies from 'js-cookie'

export function setRedirectUrl(url) {
    Cookies.set('redirectUrl', url)
    console.log('Set Redirect URL: ', url)
}


export function getRedirectUrl() {
    const redirectUrl = Cookies.get('redirectUrl')
    Cookies.remove('redirectUrl')

    console.log('Get & remove Redirect URL: ', redirectUrl)

    return redirectUrl
}

export function setAccessToken(token){
    console.log('Access Token Saved: ', token)
    Cookies.set('ccessToken', token)
}

export function getAccessToken() {
    console.log('get accessToken')
    return Cookies.get('accessToken')
}

export function removeAccessToken() {
    console.log('Access Token Removed')
    Cookies.remove('accessToken')
}


export function setUpdateToken(token){
    console.log('Update Token Saved: ', token)
    Cookies.set('updateToken', token)
}

export function getUpdateToken() {
    Cookies.set('Get updateToken')
    return Cookies.get('updateToken')
}

export function removeUpdateToken() {
    console.log('Access Token Removed')
    Cookies.remove('updateToken')
}