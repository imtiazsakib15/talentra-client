/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetReceivedInvitationsQuery,
  useAcceptInvitationMutation,
  useDeclineInvitationMutation,
} from "@/redux/features/invitation/invitationApi";

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
import { Loader2, Mail, Building2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import type { TCompany, TInvitation } from "@/types";
import { INVITATION_STATUS } from "@/constants/invitation.constant";
import { toast } from "sonner";

const ReceivedInvitations = () => {
  const {
    data,
    isLoading,
    error,
    refetch: refetchInvitations,
  } = useGetReceivedInvitationsQuery(undefined);

  const [acceptInvitation, { isLoading: isAcceptingInvitation }] =
    useAcceptInvitationMutation();
  const [declineInvitation, { isLoading: isDecliningInvitation }] =
    useDeclineInvitationMutation();

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [openMessage, setOpenMessage] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<TCompany | null>(null);

  const [confirmAcceptOpen, setConfirmAcceptOpen] = useState(false);
  const [confirmDeclineOpen, setConfirmDeclineOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
        Failed to load received invitations.
      </p>
    );
  }

  const invitations: TInvitation[] = data?.data || [];

  const filteredInvitations =
    statusFilter === "ALL"
      ? invitations
      : invitations.filter((item) => item.status === statusFilter);

  const statusColors: Record<string, string> = {
    PENDING: "bg-indigo-600",
    ACCEPTED: "bg-emerald-500",
    DECLINED: "bg-red-500",
  };

  const handleAcceptInvitation = async () => {
    try {
      if (selectedId) {
        const result = await acceptInvitation(selectedId).unwrap();
        if (result.success) {
          toast.success("Invitation accepted successfully!");
          refetchInvitations();
        } else {
          toast.error("Failed to accept the invitation.");
        }
      }
      setConfirmAcceptOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to accept the invitation."
      );
    }
  };

  const handleDeclineInvitation = async () => {
    try {
      if (selectedId) {
        const result = await declineInvitation(selectedId).unwrap();
        if (result.success) {
          toast.success("Invitation declined successfully!");
          refetchInvitations();
        } else {
          toast.error("Failed to decline the invitation.");
        }
      }
      setConfirmDeclineOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to decline the invitation."
      );
    }
  };

  return (
    <div className="p-6 w-full">
      <Card className="shadow-md rounded-2xl border border-slate-200">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-5">
            Received Invitations
          </h1>

          <Tabs defaultValue="ALL" onValueChange={setStatusFilter}>
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
                        <TableHead>Company</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                        <TableHead>Received At</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredInvitations.map((item) => (
                        <TableRow key={item.id}>
                          {/* COMPANY */}
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={item.company.logo}
                                alt=""
                                className="h-10 w-10 rounded-lg object-cover border"
                              />

                              <div className="max-w-[150px]">
                                <p className="font-medium text-slate-900 line-clamp-1">
                                  {item.company.companyName}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {item.company.industry}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          {/* VIEW MESSAGE */}
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => {
                                setSelectedMessage(item.message);
                                setOpenMessage(true);
                              }}
                            >
                              <Mail className="h-4 w-4" />
                              View Message
                            </Button>
                          </TableCell>

                          {/* STATUS */}
                          <TableCell>
                            <Badge className={statusColors[item.status]}>
                              {item.status}
                            </Badge>
                          </TableCell>

                          {/* ACTIONS */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {/* VIEW COMPANY */}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedCompany(item.company);
                                  setOpenCompany(true);
                                }}
                                className="flex items-center gap-1"
                              >
                                <Building2 className="h-4 w-4" />
                                View Company
                              </Button>

                              {item.status === INVITATION_STATUS.PENDING && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                                    onClick={() => {
                                      setSelectedId(item.id);
                                      setConfirmAcceptOpen(true);
                                    }}
                                  >
                                    Accept
                                  </Button>

                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                      setSelectedId(item.id);
                                      setConfirmDeclineOpen(true);
                                    }}
                                  >
                                    Decline
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>

                          {/* DATE */}
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
                <DialogTitle>Invitation Message</DialogTitle>
              </DialogHeader>

              <div className="p-2 text-slate-700 whitespace-pre-line">
                {selectedMessage}
              </div>

              <DialogFooter>
                <Button onClick={() => setOpenMessage(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* COMPANY MODAL */}
          <Dialog open={openCompany} onOpenChange={setOpenCompany}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Company Information</DialogTitle>
              </DialogHeader>

              {selectedCompany && (
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedCompany.logo}
                      className="h-14 w-14 rounded-lg border object-cover"
                    />
                    <div>
                      <p className="text-lg font-semibold">
                        {selectedCompany.companyName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {selectedCompany.industry}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-slate-700">
                    <p>
                      <strong>Address:</strong> {selectedCompany.address}
                    </p>
                    <p>
                      <strong>Country:</strong> {selectedCompany.country}
                    </p>
                    <p>
                      <strong>Website:</strong>{" "}
                      <a
                        href={selectedCompany.website}
                        target="_blank"
                        className="text-indigo-600 underline"
                      >
                        {selectedCompany.website}
                      </a>
                    </p>
                    <p className="mt-2 whitespace-pre-line">
                      <strong>Description:</strong>{" "}
                      {selectedCompany.description}
                    </p>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button onClick={() => setOpenCompany(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* CONFIRM ACCEPT MODAL */}
          <Dialog open={confirmAcceptOpen} onOpenChange={setConfirmAcceptOpen}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Accept Invitation?</DialogTitle>
              </DialogHeader>

              <p className="text-slate-700">
                Are you sure you want to{" "}
                <span className="font-semibold">accept</span> this invitation?
              </p>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setConfirmAcceptOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={handleAcceptInvitation}
                  disabled={isAcceptingInvitation}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* CONFIRM DECLINE MODAL */}
          <Dialog
            open={confirmDeclineOpen}
            onOpenChange={setConfirmDeclineOpen}
          >
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Decline Invitation?</DialogTitle>
              </DialogHeader>

              <p className="text-slate-700">
                Are you sure you want to{" "}
                <span className="font-semibold">decline</span> this invitation?
              </p>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setConfirmDeclineOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeclineInvitation}
                  disabled={isDecliningInvitation}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceivedInvitations;
