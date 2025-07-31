"use client";
import React from 'react'
import {ClientSideSuspense, LiveblocksProvider} from '@liveblocks/react/suspense';
import {ReactNode} from 'react';
import Loader from '../components/Loader';

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider