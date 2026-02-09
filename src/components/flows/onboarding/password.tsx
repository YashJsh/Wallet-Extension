import { Lock, ShieldCheck, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { createPasswordVerifier } from '@/background/key-management';

const CreatePassword = () => {
    const { setScreen, setPass } = useUIStore();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validate = () => {
        if (!password || !confirmPassword) {
            return "Password is required";
        }

        if (password.length < 8) {
            return "Password must be at least 8 characters";
        }

        if (password !== confirmPassword) {
            return "Passwords do not match";
        }

        return null;
    };
    const createPassword = async () => {
        const validationError = validate();

        if (validationError) {
            setError(validationError);
            return;
        }
        setError(null);
        setPass(password);
        setScreen("MNEMONICDISPLAY");
        await createPasswordVerifier(password);
    };

    const isValid =
        password!.length >= 8 && password === confirmPassword;
    return (
        <div className="w-[380px] h-[600px] bg-background flex flex-col p-6 font-sans text-foreground relative overflow-hidden">
            {/* Header Section */}
            <div className="mt-6 mb-10 flex flex-col justify-center items-center text-center">
                <h1 className="text-2xl font-bold mb-2">Create Password</h1>
                <p className="text-muted-foreground text-sm">
                    This password will unlock your wallet only on this device.
                </p>
            </div>

            {/* Form Area */}
            <div className="space-y-6 flex-1">
                <div className="space-y-2">
                    <Label
                        htmlFor="password"
                        className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                        New Password
                    </Label>

                    <div className="relative group">
                        <Input
                            id="password"
                            type="password"
                            placeholder="At least 8 characters"
                            className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-xl"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <Lock className="absolute right-4 top-3.5 text-muted-foreground group-focus-within:text-primary transition" size={18} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label
                        htmlFor="confirmPassword"
                        className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                    >
                        Confirm Password
                    </Label>
                    <div className="relative group">
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Repeat password"
                            className="bg-card border-border focus:border-primary focus:ring-1 focus:ring-primary h-12 rounded-xl"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setError(null);
                            }}
                        />
                        <ShieldCheck className="absolute right-4 top-3.5 text-muted-foreground group-focus-within:text-primary transition" size={18} />
                    </div>
                    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
                </div>

                <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                    <div className="mt-0.5">
                        <EyeOff size={14} className="text-primary" />
                    </div>
                    <p className="text-[11px] text-primary/80 leading-relaxed">
                        Turbo cannot recover this password. If you lose it, you will need your Secret Recovery Phrase to access your wallet.
                    </p>
                </div>
            </div>

            {/* Action Button */}
            <div className="pb-4">
                <Button
                    className="bg-primary hover:bg-primary/90 w-full font-semibold uppercase tracking-tighter cursor-pointer"
                    disabled={!isValid}
                    onClick={() => {
                        createPassword()
                    }}
                >
                    Create Password
                </Button>
            </div>
        </div>
    );
};

export default CreatePassword;