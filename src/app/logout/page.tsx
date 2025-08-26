'use client'

import { clearUser } from '@/lib/storage'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect } from 'react'

export default function Logout() {
    const router = useRouter()

    useLayoutEffect(() => {
        clearUser()
        router.replace('/login')
    }, [router])

    return (
        <div>Logging out ...</div>
    )
}
