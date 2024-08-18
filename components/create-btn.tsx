'use Client'
import { Button } from '@/components/ui/button';
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export default function CBtn({ nextStep, setMnemonic }: { nextStep: any, setMnemonic: any }) {

  const handleCreate = async () => {
    const mn = generateMnemonic();
    const seed = await mnemonicToSeed(mn);

    console.log("mnemonic :", mn, "seed :", seed);

    localStorage.setItem('mp', mn)
    localStorage.setItem('index', '1');
    const index = 1;
    const path = `m/44'/501'/${index}'/0'`;
    console.log("index and path", index, path);

    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    console.log("derivedSeed : ", derivedSeed);
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log("secret:", secret);
    const keypair = Keypair.fromSecretKey(secret);
    const acc = [{
      id: 1,
      pub: keypair.publicKey.toBase58(),
      sec: keypair.secretKey
    }]
    localStorage.setItem('acc', JSON.stringify(acc))
    const mnL = mn.split(" ");
    console.log(mnL,)
    setMnemonic(mnL);
    nextStep();
  }

  return (
    <>
      <Button className="w-full" onClick={() => handleCreate()}>
        Continue
      </Button>
    </>
  )
}
