import * as bip39 from "bip39";
import { Keypair, PublicKey } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

class KeyRing {
    private generatedMnemonic : string | null = null;
    private keyPairMap : Map<string, Uint8Array> = new Map();
    private index : number = 1;
    public generateMnemonic() {
        const mnemonic = bip39.generateMnemonic();
        this.generatedMnemonic = mnemonic;
        localStorage.setItem("mnemonic", mnemonic);
        return mnemonic;
    };
    public async generateSolanaKeyPair(){
        const mnemonic = localStorage.getItem("mnemonic");
        if (!mnemonic){
            return;
        }
        this.generatedMnemonic = mnemonic;
        const seed = await bip39.mnemonicToSeed(this.generatedMnemonic!);
        const derivationPath = `m/44'/501'/${this.index}'/0'`;
        const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keyPair = Keypair.fromSecretKey(secret);
        this.keyPairMap.set(keyPair.publicKey.toBase58(), keyPair.secretKey);
        return keyPair.publicKey;
    };
    public getKeyPair(key : string){
        const privateKey = this.keyPairMap.get(key);
        if (!privateKey){
            return;
        }
        const pair = {
            publicKey : new PublicKey(key),
            secretKey : privateKey
        };
        return pair;
    }
}

const keyring = new KeyRing();
export default keyring;