'use client'

import { Button } from "@repo/ui/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Authbtn() {
  const session = useSession();
  return (
    <>
      {session.data?.user ? <Button onClick={() => { signOut() }} >Sign out</Button> : <Button onClick={() => { signIn() }} >Sign in</Button>}
    </>
  )
}
