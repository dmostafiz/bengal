import React, { useState } from 'react'
import AccountWrapper from './AccountWrapper'

export default function change_password() {

    const [user, setUser] = useState(null)

    return (
        <AccountWrapper
            title='পাসওয়ার্ড পরিবর্তন'
            getUser={setUser}
        >



        </AccountWrapper>
    )
}
