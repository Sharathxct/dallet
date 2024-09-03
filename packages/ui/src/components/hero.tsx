import Link from "next/link"
import Image from "next/image"

export default function Hero({ img }) {
  return (
    <>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Web based based wallet and wallet adapter
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    This is a submission for 100xdevs x Superteam hackathon. The project is a simple web based wallet, with a wallet adapter package which lets solana dapps to connect to this wallet, not yet published to npm but you can find the code at <a href="https://github.com/Sharathxct/dallet" target="_blank" className="text-blue-500" >github</a> and look at the example vite react to see how dapps connect to dallet <a href="https://example-nextjs-dallet-connect.vercel.app/" target="_blank" className="text-blue-500">(Live link)</a>. NOTE: This wallet only supports devnet cluster as of now.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/app"
                    className="inline-flex h-10 items-center w-full md:w-fit justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Create
                  </Link>
                </div>
              </div>
              <Image
                src={img}
                width="550"
                height="310"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
