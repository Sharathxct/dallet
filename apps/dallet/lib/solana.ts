import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import axios from 'axios';

const rpcUrl = `https://solana-devnet.g.alchemy.com/v2/zbFixqK6fMRQbexOI3IAjXXn6mc4cSr0`

export async function getBalance(pubKey: string) {
  const connection = new Connection(rpcUrl);;

  // Convert the public key to a Solana PublicKey object
  const walletPublicKey = new PublicKey(pubKey);

  // Get the balance (in lamports)
  const balance = await connection.getBalance(walletPublicKey);

  // Convert lamports to SOL (1 SOL = 1e9 lamports)
  const balanceInSol = balance / LAMPORTS_PER_SOL;

  return balanceInSol;
}

export async function getSolPriceInUsd() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    console.log('response....', response.data);

    const data = response.data;
    return data.solana.usd;
  } catch (error) {
    console.error("Error parsing JSON response:", error);
    // Handle the error here, maybe return a default value or throw a new error
  }
}

export async function getBalanceInUsd(pubKey: string) {
  const balanceInSol = await getBalance(pubKey)
  console.log("Balance in solana....", balanceInSol);

  // Get the current SOL-to-USD exchange rate
  const solPriceInUsd = await getSolPriceInUsd();
  console.log("Solana price in usd....", solPriceInUsd)

  // Calculate the balance in USD
  const balanceInUsd = balanceInSol * solPriceInUsd;
  console.log('balance in usd', balanceInUsd);

  return balanceInUsd.toFixed(2);
}
