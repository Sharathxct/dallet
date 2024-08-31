import { ed25519 } from '@noble/curves/ed25519';
import { BaseSignInMessageSignerWalletAdapter, isVersionedTransaction, WalletNotConnectedError, WalletReadyState, } from '@solana/wallet-adapter-base';
import { createSignInMessage } from '@solana/wallet-standard-util';
import { Keypair } from '@solana/web3.js';
export const DalletWalletName = 'Dallet';
/**
 * This burner wallet adapter is unsafe to use and is only included to provide an easy way for applications to test
 * Wallet Adapter without using a third-party wallet.
 */
export class DalletWalletAdapter extends BaseSignInMessageSignerWalletAdapter {
    name = DalletWalletName;
    url = 'https://github.com/anza-xyz/wallet-adapter#usage';
    icon = 'data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImgtNiB3LTYiIGhlaWdodD0iMWVtIiB3aWR0aD0iMWVtIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMSAxMlY3SDVhMiAyIDAgMCAxIDAtNGgxNHY0Ij48L3BhdGg+PHBhdGggZD0iTTMgNXYxNGEyIDIgMCAwIDAgMiAyaDE2di01Ij48L3BhdGg+PHBhdGggZD0iTTE4IDEyYTIgMiAwIDAgMCAwIDRoNHYtNFoiPjwvcGF0aD48L3N2Zz4K';
    supportedTransactionVersions = new Set(['legacy', 0]);
    /**
     * Storing a keypair locally like this is not safe because any application using this adapter could retrieve the
     * secret key, and because the keypair will be lost any time the wallet is disconnected or the window is refreshed.
     */
    _keypair = null;
    constructor() {
        super();
        console.warn('Your application is presently configured to use the `UnsafeBurnerWalletAdapter`. ' +
            'Find and remove it, then replace it with a list of adapters for ' +
            'wallets you would like your application to support. See ' +
            'https://github.com/anza-xyz/wallet-adapter#usage for an example.');
    }
    get connecting() {
        return false;
    }
    get publicKey() {
        return this._keypair && this._keypair.publicKey;
    }
    get readyState() {
        return WalletReadyState.Loadable;
    }
    async connect() {
        this._keypair = new Keypair();
        this.emit('connect', this._keypair.publicKey);
    }
    async disconnect() {
        this._keypair = null;
        this.emit('disconnect');
    }
    async signTransaction(transaction) {
        if (!this._keypair)
            throw new WalletNotConnectedError();
        if (isVersionedTransaction(transaction)) {
            transaction.sign([this._keypair]);
        }
        else {
            transaction.partialSign(this._keypair);
        }
        return transaction;
    }
    async signMessage(message) {
        if (!this._keypair)
            throw new WalletNotConnectedError();
        return ed25519.sign(message, this._keypair.secretKey.slice(0, 32));
    }
    async signIn(input = {}) {
        const { publicKey, secretKey } = (this._keypair ||= new Keypair());
        const domain = input.domain || window.location.host;
        const address = input.address || publicKey.toBase58();
        const signedMessage = createSignInMessage({
            ...input,
            domain,
            address,
        });
        const signature = ed25519.sign(signedMessage, secretKey.slice(0, 32));
        this.emit('connect', publicKey);
        return {
            account: {
                address,
                publicKey: publicKey.toBytes(),
                chains: [],
                features: [],
            },
            signedMessage,
            signature,
        };
    }
}
