'use client'

import { getBalanceInUsd } from '../lib/solana';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Balance() {
  const { data: session, status } = useSession();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    console.log(session);
    if (session && session.user.pubKey) {
      getBalanceInUsd(session.user.pubKey)
        .then(result => {
          setBalance(result);
        })
        .catch(error => {
          console.error('Error fetching balance:', error);
        });
    }
  }, [session]);


  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session || !session.user.pubKey) {

    return <p>Please sign in to view your balance.</p>;
  }
  return (
    <h1>{`$ ${balance}`}</h1>
  )
}
