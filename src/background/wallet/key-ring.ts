import bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

class KeyRing {
    generatedMnemonic : string | null = null;
    private keyPairMap : Map<string, Uint8Array> = new Map();
    public generateMnemonic() {
        const mnemonic = bip39.generateMnemonic();
        this.generatedMnemonic = mnemonic;
        return mnemonic;
    };
    public async generateSolanaKeyPair(index : number){
        if (this.generateMnemonic == null){
            return;
        }
        const seed = await bip39.mnemonicToSeed(this.generatedMnemonic!);
        const derivationPath = `m/44'/501'/${index}'/0'`;
        const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret);
        this.keyPairMap.set(keyPair.publicKey.toBase58(), keyPair.secretKey)
        return keyPair;
    };
}

const keyring = new KeyRing();
export default keyring;