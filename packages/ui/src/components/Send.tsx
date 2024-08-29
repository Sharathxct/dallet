import { Button } from "@repo/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import Link from 'next/link';

export function Send() {
  return (
    <Card className=" w-full md:w-[30dvw]">
      <CardHeader>
        <CardTitle>Send Crypto</CardTitle>
        <CardDescription>Enter the address and send the Token.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pubKey">Public Key</Label>
              <Input id="pubKey" placeholder="Public Key of the receiver" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="token">Token</Label>
              <Select>
                <SelectTrigger id="token">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="sol">Sol</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" placeholder="Amount in Sol to send" />
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href='/app' >
          <Button variant="secondary" >Cancel</Button>
        </Link>
        <Button>Send</Button>
      </CardFooter>
    </Card>
  )
}
