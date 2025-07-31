import React from 'react'
import {redirect} from "next/navigation";
import CollaborativeRoom from '@/components/CollaborativeRoom';
import {currentUser} from "@clerk/nextjs/server";
import {getDocument} from "@/lib/actions/room.actions";

const Document = async ({params: { id }}: SearchParamProps) => {
    const clerkUser = await currentUser();
    if(!clerkUser) redirect('/sign-in');

    const room = await getDocument({
        roomId: id,
        userId: clerkUser.emailAddresses[0].emailAddress,
    });

    if(!room) redirect('/');

    //todo: assess permisiion of user
  return (
    <main className="flex w-full flex-col items-center">
        <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        />
    </main>
  )
}

export default Document