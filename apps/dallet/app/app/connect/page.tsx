'use client'

import { Button } from '@repo/ui/components/ui/button';
import { useSession, signIn, signOut } from 'next-auth/react'

export default function App() {

  function sendMessageToParent(message: any) {
    window.opener.postMessage(message, '*');  // Use window.parent if inside an iframe
  }

  function onUserApprovedConnection(publicKey: any) {
    const message = {
      type: 'WALLET_CONNECTED',
      publicKey: publicKey,
    };
    sendMessageToParent(message);

    window.close();
  }

  function onUserRejectedConnection() {
    const message = {
      type: 'WALLET_CONNECTION_REJECTED',
    };
    sendMessageToParent(message);

    window.close();
  }

  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return (
      <main className='w-full h-[80dvh]' >
        <Button className='' onClick={() => signIn('google', { callbackUrl: '/app/connect' })} >Signin</Button>
      </main>
    )
  }

  if (status === 'authenticated') {
    //@ts-ignore
    console.log(session.user.pubKey);
    return (
      <main className='w-full h-[80dvh] flex justify-center items-center flex-col '>
        {/*@ts-ignore*/}
        <Button onClick={() => onUserApprovedConnection(session.user.pubKey)} className='w-[250px] m-5' >Approve</Button>
        <Button onClick={() => onUserRejectedConnection()} className='w-[250px]' variant="secondary" >Reject</Button>
      </main>
    )
  }
}

