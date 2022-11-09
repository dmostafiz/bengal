import React from 'react'
import { useState } from 'react'
import AccountWrapper from './AccountWrapper'

export default function post_list() {

    const [user, setUser] = useState(null)

    return (
        <AccountWrapper
            title='পোস্ট তালিকা'
            getUser={setUser}
        >



        </AccountWrapper>
    )
}
