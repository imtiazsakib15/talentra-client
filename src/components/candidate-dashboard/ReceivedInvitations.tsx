import { useState } from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const invitations = [
  {
    id: "1",
    companyName: "TechNova Solutions",
    companyImage: "/company1.png",
    message: "We are impressed by your background...",
    status: "PENDING",
    resumeUrl: "/resumes/candidate1.pdf",
  },
  {
    id: "2",
    companyName: "ByteForge Ltd",
    companyImage: "/company2.png",
    message: "We’d love to schedule an interview...",
    status: "ACCEPTED",
    resumeUrl: "/resumes/candidate1.pdf",
  },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-indigo-100 text-indigo-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  DECLINED: "bg-rose-100 text-rose-700",
};

const ReceivedInvitations = () => {
  const [messageModal, setMessageModal] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  const filtered = (status: string) => {
    if (status === "ALL") return invitations;
    return invitations.filter((item) => item.status === status);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Received Invitations</h1>

      {/* Filter Tabs */}
      <Tabs defaultValue="ALL" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="ACCEPTED">Accepted</TabsTrigger>
          <TabsTrigger value="DECLINED">Declined</TabsTrigger>
        </TabsList>

        {["ALL", "PENDING", "ACCEPTED", "DECLINED"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Resume</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filtered(tab).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={item.companyImage} />
                            <AvatarFallback>
                              {item.companyName.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>

                          <span className="font-medium line-clamp-1">
                            {item.companyName}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() =>
                            setMessageModal({
                              open: true,
                              message: item.message,
                            })
                          }
                        >
                          View Message
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Badge className={statusColors[item.status]}>
                          {item.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <a
                          href={item.resumeUrl}
                          target="_blank"
                          className="underline text-sm"
                        >
                          View Resume
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Message Modal */}
      <Dialog
        open={messageModal.open}
        onOpenChange={(open) =>
          setMessageModal({ open, message: open ? messageModal.message : "" })
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invitation Message</DialogTitle>
          </DialogHeader>

          <p className="text-slate-700">{messageModal.message}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReceivedInvitations;
