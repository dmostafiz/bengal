import React from 'react'
import { useState } from 'react'
import AccountWrapper from './AccountWrapper'

export default function saved_posts() {

    const [user, setUser] = useState(null)

    return (
        <AccountWrapper
            title='সংরক্ষিত পোস্টসমূহ'
            getUser={setUser}
        >



        </AccountWrapper>
    )
}
