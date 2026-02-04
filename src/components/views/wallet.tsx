import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/uiStore";

export const WalletSetupOptions = () => {
  const {setScreen} = useUIStore();
  return (
    <div className="w-[360px] h-[600px] bg-background flex flex-col p-6 text-foreground relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/5 blur-[100px] rounded-full" />


      {/* Header Section */}
      <div className="mt-8 mb-10 flex flex-col items-center text-center justify-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tighter uppercase">
          Set up wallet
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Select how you'd like to get started with{" "}
          <span className="text-foreground font-semibold">Turbo</span>.
        </p>
      </div>

      {/* Options Container */}
      <div className="space-y-4 flex-1">

        {/* Create New Wallet */}
        <Button
          variant="default"
          className="w-full bg-primary hover:bg-primary/90 py-7 font-semibold "
          onClick={()=>{
            setScreen("CREATEPASSWORD")
          }}
          
        >
          Create Wallet
        </Button>

        {/* Import Existing Wallet */}
        {/* <Button
          variant="default"
          className="w-full h-auto py-5 bg-secondary text-secondary-foreground font-semibold " 
        >
          Import existing wallet
        </Button> */}

      </div>
    </div>
  );
};

export default WalletSetupOptions;
