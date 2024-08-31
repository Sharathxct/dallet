import type { WalletName } from '@solana/wallet-adapter-base';
import { BaseSignInMessageSignerWalletAdapter, WalletReadyState } from '@solana/wallet-adapter-base';
import { type SolanaSignInInput, type SolanaSignInOutput } from '@solana/wallet-standard-features';
import type { Transaction, TransactionVersion, VersionedTransaction } from '@solana/web3.js';
export declare const DalletWalletName: WalletName<"Dallet">;
/**
 * This burner wallet adapter is unsafe to use and is only included to provide an easy way for applications to test
 * Wallet Adapter without using a third-party wallet.
 */
export declare class DalletWalletAdapter extends BaseSignInMessageSignerWalletAdapter {
    name: WalletName<"Dallet">;
    url: string;
    icon: string;
    supportedTransactionVersions: ReadonlySet<TransactionVersion>;
    /**
     * Storing a keypair locally like this is not safe because any application using this adapter could retrieve the
     * secret key, and because the keypair will be lost any time the wallet is disconnected or the window is refreshed.
     */
    private _keypair;
    constructor();
    get connecting(): boolean;
    get publicKey(): import("@solana/web3.js").PublicKey | null;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    signIn(input?: SolanaSignInInput): Promise<SolanaSignInOutput>;
}
//# sourceMappingURL=adapter.d.ts.map