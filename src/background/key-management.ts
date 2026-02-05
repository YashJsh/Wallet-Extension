import { timingSafeEqual } from "node:crypto";
import { pbkdf2 } from "node:crypto";

const salt = import.meta.env.VITE_APP_SALT;

export const createPasswordVerifier = (password: string) => {
    return new Promise<void>((resolve, reject) => {
        pbkdf2(password, salt, 200_000, 32, "sha512", (err, derived) => {
            if (err) return reject(err);

            localStorage.setItem(
                "PASSWORD_VERIFIER",
                derived.toString("hex")
            );
            resolve();
        });
    });
};


export const checkPassword = (password: string) => {
    return new Promise<boolean>((resolve) => {
        const stored = localStorage.getItem("PASSWORD_VERIFIER");
        if (!stored) return resolve(false);
        pbkdf2(
            password,
            salt,
            200_000,
            32,
            "sha512"
            , (err, derived) => {
                if (err) return resolve(false);
                const storedBuf = Buffer.from(stored, "hex");
                if (storedBuf.length !== derived.length) return resolve(false);
                resolve(timingSafeEqual(storedBuf, derived));
            }
        );
    })
}