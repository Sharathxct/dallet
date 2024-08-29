import { getBalanceInUsd } from '../lib/solana';

export default async function Balance() {
  const balance = await getBalanceInUsd('D6cMzPnS4nFVJhZVthKogh1JaYqH7SYuEgCE43RGffRr');
  return (
    <h1>{`$ ${balance}`}</h1>
  )
}
