import { pbkdf2, pbkdf2Sync, randomBytes } from "node:crypto";
import nacl from "tweetnacl"


class KeyManagment {
    private EncryptionKey: Uint8Array | null = null;
    public async GenerateEncryptionKey(password: string) {
        return new Promise<void>((resolve, reject)=>{
            pbkdf2(password, "Salt", 200_000, 32, "sha512", (err, derived)=>{
                if (err) return reject(err);
                this.EncryptionKey = new Uint8Array(derived);
                resolve();
            })
        })
    }
    public async EncryptData(data: string) {
        if (!this.EncryptionKey) {
            console.log("No encryption key found");
            return;
        }
        const message = new TextEncoder().encode(
            JSON.stringify(data)
        );
        const nonce = randomBytes(nacl.secretbox.nonceLength);
        const encypted = nacl.secretbox(
            message,
            nonce,
            this.EncryptionKey
        );

        localStorage.setItem(
            "Storage_Turbo",
            JSON.stringify({
                nonce: Buffer.from(nonce).toString("hex"),
                cipherText: Buffer.from(encypted).toString("hex")
            })
        )
        this.EncryptionKey = null
    }

    public async DecryptData(password: string) {
        const stored = localStorage.getItem("Storage_Turbo");
        if (!stored) return null;
        const { nonce, cipherText } = JSON.parse(stored);

        await this.GenerateEncryptionKey(password);
        if (!this.EncryptionKey) {
            throw new Error("Key derivation failed")
        };
        const decrypted = nacl.secretbox.open(
            Buffer.from(cipherText, "hex"),
            Buffer.from(nonce, "hex"),
            this.EncryptionKey
        );

        if (!decrypted) {
            throw new Error(
                "Wrong password or corrupted data"
            )
        }
        return JSON.parse(
            new TextDecoder().decode(decrypted)
        );
    }
}

export const keyManager = new KeyManagment();