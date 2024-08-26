import { ModeToggle } from './mode-toggle';
import { LuWallet } from "react-icons/lu";
import Link from 'next/link';

export default function Appbar({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='px-8 lg:px-6 h-14 flex items-center justify-between border-b' >
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <LuWallet className="h-6 w-6" />
          <span className="sr-only">Crypto Wallet</span>
        </Link>
        <div className='flex justify-between items-center gap-5'>
          {children}
          <ModeToggle />
        </div>
      </header>
    </>
  )
}
