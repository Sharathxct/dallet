import Hero from '@repo/ui/components/hero';
import * as wallet from '../public/assets/wallet.jpg'
export default function Page() {
  return (
    <div className="flex flex-col min-h-[89dvh] justif-center items-center" >
      <Hero img={wallet} />
    </div>
  );
}
