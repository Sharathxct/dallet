'use client'

import { ThemeProvider } from "../components/theme-provider";
import { Wallet } from "./Wallet";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Wallet>
        {children}
      </Wallet>
    </ThemeProvider>
  )
}
