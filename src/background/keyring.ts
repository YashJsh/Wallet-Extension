import * as bip39 from "bip39";
import { Keypair, PublicKey } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { keyManager } from "./safeStorage";

class KeyRing {
    private generatedMnemonic: string | null = null;
    private keyPairMap: Map<string, Uint8Array> = new Map();
    private index: number;

    constructor() {
        this.index = Number(localStorage.getItem("wallet_index") ?? "0");
    }

    public async generateMnemonic(password: string) {
        const mnemonic = bip39.generateMnemonic();
        this.generatedMnemonic = mnemonic;
        localStorage.setItem("wallet_index", "0");
        this.index = 0;
        await keyManager.GenerateEncryptionKey(password);
        await keyManager.EncryptData(mnemonic);
        return mnemonic;
    };

    public async restoreSolanaWallets(password: string) {
        const mnemonic = await keyManager.DecryptData(password);
        this.generatedMnemonic = mnemonic;

        const seed = await bip39.mnemonicToSeed(mnemonic);

        for (let i = 0; i < this.index; i++) {
            const derivationPath = `m/44'/501'/${i}'/0'`;
            const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keyPair = Keypair.fromSecretKey(secret);
            this.keyPairMap.set(
                keyPair.publicKey.toBase58(),
                keyPair.secretKey
            );
        }
        return this.keyPairMap.keys().next().value;

    }
    public async createNewWallet(password: string) {
        const mnemonic = await keyManager.DecryptData(password);
        if (!mnemonic) {
            console.log("Mnemonic doesn't exists");
            return;
        }
        this.generatedMnemonic = mnemonic;
        const seed = await bip39.mnemonicToSeed(this.generatedMnemonic!);
        const derivationPath = `m/44'/501'/${this.index}'/0'`;
        const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret);
        this.keyPairMap.set(keyPair.publicKey.toBase58(), keyPair.secretKey);
        this.index += 1;
        localStorage.setItem("wallet_index", `${this.index}`);
        return keyPair.publicKey;
    }

    public getKeyPair(key: string) {
        const privateKey = this.keyPairMap.get(key);
        if (!privateKey) {
            return;
        }
        const pair = {
            publicKey: new PublicKey(key),
            secretKey: privateKey
        };
        return pair;
    };

    public getAllWallets() {
        const keys = Array.from(this.keyPairMap.keys());
        return keys;
    }
}

const keyring = new KeyRing();
export default keyring;