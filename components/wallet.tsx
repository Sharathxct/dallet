import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { IoIosAdd, IoIosSend, IoIosSwap, IoIosCash } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BsThreeDotsVertical } from "react-icons/bs";
import Account from "@/components/Account";
import Link from 'next/link';

export default function Wallet() {
  return (
    <div className="max-w-screen w-full md:w-[60dvw] dark:bg-slate-900 min-h-[60dvh] ">
      <header className="flex items-center justify-between p-4 border-b border-gray-700">
        <Popover>
          <PopoverTrigger><Badge variant="outline" className="text-base cursor-pointer" >Solana Devnet<ChevronDownIcon /> </Badge></PopoverTrigger>
          {/* <PopoverContent>Place content for the popover here.</PopoverContent> */}
          <PopoverContent className="dark:bg-slate-900" >
            <div className="flex flex-col justify-center items-center">
              <h1>Select a Network</h1>

              <div className="flex w-full justify-between items-center" >
                <div className="flex flex-row items-center w-full mt-4" >
                  <Avatar>
                    <AvatarImage src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4" >
                    <p>Solana Devnet</p>
                  </div>
                </div>
                <BsThreeDotsVertical className="cursor-pointer" />
              </div>

              <Button className="w-full mt-8">Add Network</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center space-x-2">
              <span>Account 1</span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="dark:bg-slate-900" >
            <div className="flex flex-col justify-center items-center">
              <h1 >Select an account</h1>
              <Account />
            </div>
          </PopoverContent>
        </Popover>

      </header>
      <main className="p-4 ">
        <div className="text-center">
          <h2 className="text-3xl font-bold">0 SOL</h2>
          <p className="text-gray-400">$0.00 USD</p>
        </div>
        <div className="flex justify-center my-8 w-full justify-center gap-10">
          <Button variant="ghost" className="flex flex-col h-full items-center space-y-1 max-w-12 md:min-w-24 ">
            <IoIosAdd size={32} />
            <span className="text-base">Buy & Sell</span>
          </Button>
          <Link href={'/wallet/send'} >
            <Button variant="ghost" className="flex flex-col h-full items-center space-y-1 max-w-12 lg:min-w-24">
              <IoIosSend size={32} />
              <span className="text-base">Send</span>
            </Button>
          </Link>

          <Button variant="ghost" className="flex flex-col h-full items-center space-y-1 max-w-12 lg:min-w-24">
            <IoIosSwap size={32} />
            <span className="text-base">Swap</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-full items-center space-y-1 max-w-12 lg:min-w-24">
            <IoIosCash size={32} />
            <span className="text-base">Buy</span>
          </Button>
        </div>
        <Tabs defaultValue="tokens" className="text-base">
          <TabsList className="w-full justify-around">
            <TabsTrigger className="text-base" value="tokens">Tokens</TabsTrigger>
            <TabsTrigger className="text-base" value="nfts">NFTs</TabsTrigger>
            <TabsTrigger className="text-base" value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="tokens">
            <p className="text-center text-gray-400" >Stay tuned</p>
          </TabsContent>
          <TabsContent value="nfts">
            <p className="text-center text-gray-400">No NFTs available.</p>
          </TabsContent>
          <TabsContent value="activity">
            <p className="text-center text-gray-400">No activity recorded.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export function ChevronDownIcon(props: any) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

