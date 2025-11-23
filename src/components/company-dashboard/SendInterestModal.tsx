import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export function SendInterestModal({ candidateId }: { candidateId: string }) {
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    await fetch(`${import.meta.env.VITE_API_URL}/interests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId }),
    });

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          Send Interest
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Interest</DialogTitle>
        </DialogHeader>

        <p className="text-slate-700">
          Are you sure you want to send an interest to this candidate?
        </p>

        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
