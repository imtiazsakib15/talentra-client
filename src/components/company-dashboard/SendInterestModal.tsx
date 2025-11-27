import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSendInterestMutation } from "@/redux/features/interest/interestApi";
import { toast } from "sonner";

export function SendInterestModal({ candidateId }: { candidateId: string }) {
  const user = useAppSelector(selectCurrentUser);
  const [message, setMessage] = useState("");

  const [sendInterest, { isLoading }] = useSendInterestMutation();

  const handleSend = async () => {
    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    try {
      const result = await sendInterest({
        candidateId,
        companyId: user!.companyId!,
        message,
      }).unwrap();

      if (result.success) {
        toast.success("Interest sent successfully!");
        setMessage("");
      } else {
        toast.error("Failed to send interest. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        (error as Error)?.message ||
          "Failed to send interest. Please try again."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          Send Interest
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Interest</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-slate-600">
            Write a short message to the candidate.
          </p>

          <Textarea
            placeholder="Hi, we found your profile impressive. Let's connect!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-28"
          />

          <p className="text-xs text-slate-500 text-right">
            {message.length}/500
          </p>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            onClick={handleSend}
            disabled={isLoading || message.trim().length < 10}
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
