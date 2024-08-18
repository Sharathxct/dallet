'use client';

import React, { useState, useEffect } from 'react'; // Import necessary hooks
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { mnemonicToSeed } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import { IoCopy } from "react-icons/io5";

const handleCopy = async (text) => {
  await navigator.clipboard.writeText(text);
}


export default function Account() {
  const [accData, setAccData] = useState([]); // Use state to manage account data

  useEffect(() => {
    const storedAcc = localStorage.getItem('acc');
    if (storedAcc) {
      try {
        const parsedAcc = JSON.parse(storedAcc);
        setAccData(parsedAcc);
      } catch (error) {
        console.error('Error parsing acc data:', error);
      }
    }
  }, []);

  const handleAddAcc = () => {
    const mn = localStorage.getItem('seed');
    const index = Number(localStorage.getItem('index')) + 1;
    const seed = mnemonicToSeed(mn);
    const path = `m/44'/501'/${index}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    const storedAcc = localStorage.getItem('acc');
    let parsedAcc = [];
    if (storedAcc) {
      try {
        parsedAcc = JSON.parse(storedAcc);
      } catch (error) {
        console.error('Error parsing acc data:', error);
      }
    }
    parsedAcc = [...parsedAcc, { id: index, pub: keypair.publicKey.toBase58(), sec: keypair.secretKey }];
    setAccData(parsedAcc);
    localStorage.setItem('acc', JSON.stringify(parsedAcc));
    localStorage.setItem('index', String(index));
  }

  return (
    <>
      {accData.map((a, index) => (
        <div key={index} className="flex w-full justify-between items-center">
          <div className="flex flex-row items-center w-full mt-4">
            <Avatar>
              <AvatarImage src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-512.png" />
              <AvatarFallback>ET</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <p>Account {a.id}</p>
              <p className='flex flex-row gap-3 items-center' >{a.pub.slice(0, 4)}......{a.pub.slice(40)} <IoCopy onClick={() => { handleCopy(a.pub) }} className='cursor-pointer' /> </p>
            </div>
          </div>

          <BsThreeDotsVertical className="cursor-pointer" />
        </div>
      ))}
      <Button className="w-full mt-8" onClick={handleAddAcc}>Add Account</Button>

    </>
  );
}
