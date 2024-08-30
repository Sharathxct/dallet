'use client'

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
import { useState, useEffect } from "react";

export function Send() {
  const [addr, setAddr] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  async function handleSend() {
    setLoading(true);
    try {
      const response = await fetch('/api/solana/sendTransaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ addr, amount })
      });

      if (!response.ok) {
        throw new Error(`Error sending transaction: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Transaction result:', data);
      setError(null);
    } catch (error) {
      console.error("Error sending transaction:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className=" w-full md:w-[30dvw]">
      <CardHeader>
        <CardTitle>Send Crypto</CardTitle>
        <CardDescription>Enter the address and send the Token.</CardDescription>
        {error && <p>{error}</p>}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="pubKey">Public Key</Label>
              <Input id="pubKey" placeholder="Public Key of the receiver" onChange={(e) => setAddr(e.target.value)} />
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
              <Input id="amount" placeholder="Amount in Sol to send" onChange={(e) => setAmount(e.target.value)} />
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href='/app' >
          <Button variant="secondary" >Cancel</Button>
        </Link>
        <Button onClick={handleSend} disabled={loading} >Send{loading ? 'ing...' : ''}</Button>
      </CardFooter>
    </Card>
  )
}
