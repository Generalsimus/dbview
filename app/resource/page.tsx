"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';



export default function Services() {
    const router = useRouter();
    useEffect(() => {
        router.replace(`/resource/routes`)
    }, [])
    return <></>
}