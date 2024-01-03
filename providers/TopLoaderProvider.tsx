"use client"
import React, {PropsWithChildren} from 'react'
import NextTopLoader from 'nextjs-toploader'


const TopLoaderProvider = ({children}: PropsWithChildren) => {
  return (
    <>
    <NextTopLoader showSpinner={false} color="#f40701" height={2.5} />
    {children}
    </>
  )
}

export default TopLoaderProvider