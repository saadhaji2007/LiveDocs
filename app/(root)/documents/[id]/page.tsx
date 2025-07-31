import React from 'react'
import {Editor} from "@/components/editor/Editor";
import Header from '@/components/Header';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import CollaborativeRoom from '@/components/CollaborativeRoom';

const Document = () => {
  return (
    <main className="flex w-full flex-col items-center">
        <CollaborativeRoom />
    </main>
  )
}

export default Document