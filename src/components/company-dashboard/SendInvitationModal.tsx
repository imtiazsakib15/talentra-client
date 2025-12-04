/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useSendInvitationMutation } from "@/redux/features/invitation/invitationApi";
import { toast } from "sonner";

export function SendInvitationModal({ candidateId }: { candidateId: string }) {
  const user = useAppSelector(selectCurrentUser);
  const [message, setMessage] = useState("");

  const [sendInvitation, { isLoading }] = useSendInvitationMutation();
  const handleSend = async () => {
    if (message.trim().length < 10) {
      toast.error("Message must be at least 10 characters.");
      return;
    }

    try {
      const result = await sendInvitation({
        candidateId,
        companyId: user!.companyId!,
        message,
      }).unwrap();
      if (result.success) {
        toast.success("Invitation sent successfully!");
        setMessage("");
      } else {
        toast.error("Failed to send invitation. Please try again.");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to send invitation. Please try again."
      );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          Send Invitation
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Invitation</DialogTitle>
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
