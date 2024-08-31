'use client'

import { getBalanceInUsd } from '../lib/solana';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Balance() {
  const { data: session, status } = useSession();
  const [balance, setBalance] = useState('...');
  const [solB, setSolB] = useState('...');

  useEffect(() => {
    console.log(session);
    if (session && session.user.pubKey) {
      getBalanceInUsd(session.user.pubKey)
        .then(result => {
          setBalance(result.usd);
          setSolB(result.sol);
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
    <>
      <h1>{`$ ${balance}`}</h1>
      <p className='text-sm' >{solB} sol</p>
    </>
  )
}
