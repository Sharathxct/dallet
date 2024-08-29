'use client'

import { useSession } from 'next-auth/react';
import { FaCopy } from "react-icons/fa";

export default function Addr() {
  const { data: session, status } = useSession();
  let pubKey = '';
  if (status === "authenticated") {
    pubKey = session.user.pubKey;
    return
    (
      <>
        <p>{pubKey.slice(0, 4) + '...' + pubKey.slice(40)} </p>
        <FaCopy />
      </>
    )
  }

  return <a href="/api/auth/signin">Sign in</a>
}
