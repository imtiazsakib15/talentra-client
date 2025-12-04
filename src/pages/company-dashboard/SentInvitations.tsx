/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetSentInvitationsQuery } from "@/redux/features/invitation/invitationApi";
import { useScheduleInterviewMutation } from "@/redux/features/interview/interviewApi";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { TInvitation } from "@/types";

const SentInvitations = () => {
  const { data, isLoading, error, refetch } =
    useGetSentInvitationsQuery(undefined);
  const [scheduleInterview, { isLoading: isScheduling }] =
    useScheduleInterviewMutation();

  // message modal
  const [selectedMessage, setSelectedMessage] = useState("");
  const [openMessage, setOpenMessage] = useState(false);

  // schedule modal
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [selectedInvitation, setSelectedInvitation] =
    useState<TInvitation | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "ACCEPTED" | "DECLINED"
  >("ALL");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 font-medium mt-10">
        Failed to load sent invitations.
      </p>
    );
  }

  const invitations: TInvitation[] = data?.data || [];
  console.log(invitations);
  const filteredInvitations =
    statusFilter === "ALL"
      ? invitations
      : invitations.filter((item) => item.status === statusFilter);

  const statusColors: Record<string, string> = {
    PENDING: "bg-indigo-600",
    ACCEPTED: "bg-emerald-500",
    DECLINED: "bg-red-500",
  };

  const openScheduleModal = (inv: TInvitation) => {
    setSelectedInvitation(inv);
    setMeetingLink(""); //
    setScheduledAt("");
    setScheduleOpen(true);
  };

  const handleScheduleSubmit = async () => {
    if (!selectedInvitation) return;

    if (!meetingLink.trim()) {
      toast.error("Meeting link is required.");
      return;
    }
    if (!scheduledAt) {
      toast.error("Please pick a date and time.");
      return;
    }

    const scheduledIso = new Date(scheduledAt).toISOString();

    try {
      const result = await scheduleInterview({
        invitationId: selectedInvitation.id,
        candidateId: selectedInvitation.candidateId,
        companyId: selectedInvitation.companyId,
        meetingLink: meetingLink.trim(),
        scheduledAt: scheduledIso,
      }).unwrap();
      if (result.success) {
        toast.success("Interview scheduled and candidate notified.");
        setScheduleOpen(false);
        refetch();
      } else {
        toast.error(result.message || "Failed to schedule interview");
      }
    } catch (err: any) {
      console.error("Schedule error:", err);
      const errorMessage =
        err?.data?.message || err?.message || "Failed to schedule interview";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="p-6 w-full">
      <Card className="shadow-md rounded-2xl border border-slate-200">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-5">
            Sent Invitations
          </h1>

          <Tabs
            defaultValue="ALL"
            onValueChange={(v) => setStatusFilter(v as any)}
          >
            <TabsList className="mb-5">
              <TabsTrigger value="ALL">All</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="ACCEPTED">Accepted</TabsTrigger>
              <TabsTrigger value="DECLINED">Declined</TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter}>
              {filteredInvitations.length === 0 ? (
                <p className="text-center text-slate-500">
                  No invitations found for this status.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Interview</TableHead>
                        <TableHead>Sent At</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredInvitations.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={item?.candidate?.image}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover border"
                              />

                              <div className="max-w-40">
                                <p className="font-medium text-slate-900 line-clamp-1">
                                  {item?.candidate?.fullName}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {item?.candidate?.designation}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => {
                                setSelectedMessage(item.message || "");
                                setOpenMessage(true);
                              }}
                            >
                              <Mail className="h-4 w-4" />
                              View Message
                            </Button>
                          </TableCell>

                          <TableCell>
                            <Badge className={statusColors[item.status]}>
                              {item.status}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() =>
                                window.open(item?.candidate?.resume, "_blank")
                              }
                            >
                              View Resume
                            </Button>
                          </TableCell>

                          {/* Interview column */}
                          <TableCell>
                            {item.status === "ACCEPTED" && !item.interview ? (
                              <Button
                                size="sm"
                                className="bg-indigo-600 text-white hover:bg-indigo-700"
                                onClick={() => openScheduleModal(item)}
                              >
                                Schedule Interview
                              </Button>
                            ) : item.interview ? (
                              <div className="text-sm text-slate-700 font-medium">
                                {new Date(
                                  item?.interview?.scheduledAt
                                )?.toLocaleString()}
                              </div>
                            ) : (
                              <span className="text-slate-400 text-sm">—</span>
                            )}
                          </TableCell>

                          <TableCell>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* MESSAGE MODAL */}
          <Dialog open={openMessage} onOpenChange={setOpenMessage}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Message Sent</DialogTitle>
              </DialogHeader>

              <div className="p-2 text-slate-700 whitespace-pre-line">
                {selectedMessage}
              </div>

              <DialogFooter>
                <Button onClick={() => setOpenMessage(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* SCHEDULE MODAL */}
          <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Interview</DialogTitle>
              </DialogHeader>

              <div className="p-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Meeting link
                  </label>
                  <input
                    type="url"
                    placeholder="https://meet.google.com/..."
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Date & time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="mt-1 block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {selectedInvitation && (
                  <div className="text-sm text-slate-600">
                    Scheduling for:{" "}
                    <strong>{selectedInvitation?.candidate?.fullName}</strong>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setScheduleOpen(false)}
                  disabled={isScheduling}
                >
                  Cancel
                </Button>
                <Button onClick={handleScheduleSubmit} disabled={isScheduling}>
                  {isScheduling ? "Scheduling..." : "Schedule"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentInvitations;
