'use client'

import { useSession } from 'next-auth/react';
import { FaCopy } from 'react-icons/fa';

export default function Addr() {
  const { data: session, status } = useSession();

  async function handleCopy(pubKey) {
    await navigator.clipboard.writeText(pubKey);
  }

  let pubKey = '';
  if (status === "authenticated") {
    pubKey = session.user.pubKey;
    return <p className='flex items-center gap-2' >{pubKey.slice(0, 4) + '...' + pubKey.slice(40)} <FaCopy onClick={() => handleCopy(pubKey)} /> </p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}
