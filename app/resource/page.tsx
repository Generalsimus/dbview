"use client"
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useEffect, useState } from 'react';



export default function Services() {
    const router = useRouter();
    useEffect(() => {
        router.replace(`/resource/routes`)
    }, [])
    return <></>
}