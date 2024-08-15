import Link from 'next/link';
import ModeToggle from "@/components/ui/mode-toggle";

export default function AppBar() {

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <WalletIcon className="h-6 w-6" />
        <span className="sr-only">Crypto Wallet</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <ModeToggle />
        <Link href="#" className="font-medium hover:underline underline-offset-4" prefetch={false}>
          About
        </Link>
      </nav>
    </header>
  )
}

function WalletIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  )
}
