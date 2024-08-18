"use client"
import Link from "next/link";
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import CBtn from "@/components/create-btn";

export function Mnemonic() {
  const [currentStep, setCurrentStep] = useState(1)
  const [mnemonic, setMnemonic] = useState([])

  const nextStep = () => {
    setCurrentStep(2);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <Button variant="ghost" size="icon" onClick={() => setCurrentStep(currentStep - 1)}>
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
            )}
            <CardTitle>Create New Wallet</CardTitle>
          </div>
          <div className="text-sm font-medium text-muted-foreground">Step {currentStep} of 2</div>
        </div>
        <CardDescription>Follow the steps to set up your new crypto wallet.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter a secure password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
            </div>
            <CBtn nextStep={nextStep} setMnemonic={setMnemonic} />
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Alert>
                <AlertTitle>Secure Your Mnemonic Phrase</AlertTitle>
                <AlertDescription>
                  Your mnemonic phrase is the only way to recover your wallet. Store it securely and do not share it
                  with anyone.
                </AlertDescription>
              </Alert>

              <div className="h-3" ></div>
              <Label >Your Mnemonic Phrase</Label>
              <div className="grid grid-cols-3 gap-2">
                {
                  mnemonic.map((word, index) => (
                    <div key={index} className="bg-muted rounded-md px-3 py-2 text-center text-muted-foreground">
                      {word}
                    </div>
                  ))}
              </div>
            </div>
            <Link
              href="/wallet"
              className=" flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Continue</Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ArrowLeftIcon(props: any) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
