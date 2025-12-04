import { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
} from "@/redux/features/user/userApi";
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
import { Loader2, Eye, ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import type { TUser } from "@/types";

const roleColors = {
  ADMIN: "bg-indigo-600",
  COMPANY: "bg-emerald-600",
  CANDIDATE: "bg-blue-600",
};

const statusColors = {
  ACTIVE: "bg-emerald-600",
  SUSPENDED: "bg-red-600",
  PENDING: "bg-yellow-500",
};

export default function ManageUsers() {
  const {
    data,
    isLoading,
    refetch: refetchUsers,
  } = useGetAllUsersQuery(undefined);
  const [updateStatus, { isLoading: updatingStatus }] =
    useUpdateUserStatusMutation();

  const users: TUser[] = data?.data || [];

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [actionType, setActionType] = useState<"SUSPEND" | "ACTIVATE">(
    "SUSPEND"
  );

  const handleStatusUpdate = async () => {
    if (!selectedUser) return;

    const newStatus = actionType === "SUSPEND" ? "SUSPENDED" : "ACTIVE";

    await updateStatus({
      id: selectedUser.id,
      status: newStatus,
    });
    refetchUsers();
    setConfirmModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <Card className="shadow-md rounded-2xl border border-slate-200">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold mb-5 text-slate-800">
            Manage Users
          </h1>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {user?.candidate?.fullName ||
                        user?.company?.companyName ||
                        "—"}
                    </TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <Badge className={`${roleColors[user.role]} text-white`}>
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`${statusColors[user.status]} text-white`}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="space-x-2">
                      {/* View Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setActionType("ACTIVATE"); // won't matter
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>

                      {/* Suspend / Activate */}
                      {user.status === "ACTIVE" ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={updatingStatus}
                          onClick={() => {
                            setSelectedUser(user);
                            setActionType("SUSPEND");
                            setConfirmModal(true);
                          }}
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-emerald-600 text-white"
                          disabled={updatingStatus}
                          onClick={() => {
                            setSelectedUser(user);
                            setActionType("ACTIVATE");
                            setConfirmModal(true);
                          }}
                        >
                          Activate
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Modal */}
      <Dialog open={confirmModal} onOpenChange={setConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              {actionType === "SUSPEND" ? "Suspend User?" : "Activate User?"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "SUSPEND"
                ? "Suspending will restrict this user from accessing the system."
                : "Activating will restore user access."}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmModal(false)}>
              Cancel
            </Button>

            <Button
              className={
                actionType === "SUSPEND"
                  ? "bg-red-600 text-white"
                  : "bg-emerald-600 text-white"
              }
              onClick={handleStatusUpdate}
              disabled={updatingStatus}
            >
              {updatingStatus ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : actionType === "SUSPEND" ? (
                "Suspend"
              ) : (
                "Activate"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
