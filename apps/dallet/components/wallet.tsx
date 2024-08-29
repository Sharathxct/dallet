import { BiQrScan } from "react-icons/bi";
import { MdWifi } from "react-icons/md";
import { Badge } from '@repo/ui/components/ui/badge';
import { IoIosAdd, IoIosSend, IoIosSwap, IoIosCash } from "react-icons/io";
import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { Avatar, AvatarImage } from '@repo/ui/components/ui/avatar';
import Addr from '../components/addr';

export default function Wallet({ Balance }: { Balance: React.FC }) {
  return (
    <>
      <main className="md:max-w-[40dvw] m-auto pt-8" >

        <div className="flex flex-col w-full">
          <div className="header-wal flex flex-row justify-between items-center drop-shadow" >
            <div className="flex flex-row items-center gap-2 cursor-pointer" >
              <BiQrScan />
              <Addr />
            </div>
            <div className="cursor-pointer" >
              <Badge className="flex items-center gap-2"> <MdWifi /> Devnet </Badge>
            </div>
          </div>
          <div className="value-wal text-3xl flex w-full h-[20dvh] justify-center items-center " >
            <Balance />
          </div>
          <div className="btns-wal flex justify-center gap-10 " >
            <Button variant="ghost" className="flex flex-col h-full items-center space-y-1 max-w-12 md:min-w-24 ">
              <IoIosAdd size={32} />
              <span className="text-base">Buy & Sell</span>
            </Button>
            <Link href={'/app/send'} >
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
          <div className="tabs-wal mt-8" >
            <Tabs defaultValue="Token" className="md:w-[30dvw] mx-auto" >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="Token">Tokens</TabsTrigger>
                <TabsTrigger value="Activity">Activity</TabsTrigger>
                <TabsTrigger value="Settings">Settings</TabsTrigger>

              </TabsList>
              <TabsContent value="Token" className='w-full flex justify-center mt-5' >
                {/* <Badge variant="secondary" className="w-full mx-auto cursor-pointer p-5 text-xl rounded-3xl" > */}
                {/*   <div className='flex gap-3'> */}
                {/*     <Avatar> */}
                {/*       <AvatarImage src="https://cryptologos.cc/logos/solana-sol-logo.png?v=032" alt="@shadcn" /> */}
                {/*     </Avatar> */}
                {/*     Solana */}
                {/*   </div> */}
                {/* </Badge> */}
                All tokens here
              </TabsContent>
              <TabsContent value="Activity">
                <p>Transactions here</p>
              </TabsContent>
              <TabsContent value="Settings">
                <p>Settings</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  )
}
