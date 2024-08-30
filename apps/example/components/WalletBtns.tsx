'use client'

import {
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

export default function WalletBtn() {
  return (
    <div>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  )
}
