import { useState } from "react";
import { useGetSentInterestsQuery } from "@/redux/features/interest/interestApi";
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
import type { TInterest } from "@/types";

const SentInterests = () => {
  const { data, isLoading, error } = useGetSentInterestsQuery(undefined);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL");

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
        Failed to load sent interests.
      </p>
    );
  }

  const interests: TInterest[] = data?.data || [];

  const filteredInterests =
    statusFilter === "ALL"
      ? interests
      : interests.filter((item) => item.status === statusFilter);

  const statusColors: Record<string, string> = {
    PENDING: "bg-indigo-600",
    ACCEPTED: "bg-emerald-500",
    DECLINED: "bg-red-500",
  };

  return (
    <div className="p-6 w-full">
      <Card className="shadow-md rounded-2xl border border-slate-200">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-5">
            Sent Interests
          </h1>

          <Tabs defaultValue="ALL" onValueChange={setStatusFilter}>
            <TabsList className="mb-5">
              <TabsTrigger value="ALL">All</TabsTrigger>
              <TabsTrigger value="PENDING">Pending</TabsTrigger>
              <TabsTrigger value="ACCEPTED">Accepted</TabsTrigger>
              <TabsTrigger value="DECLINED">Declined</TabsTrigger>
            </TabsList>

            <TabsContent value={statusFilter}>
              {filteredInterests.length === 0 ? (
                <p className="text-center text-slate-500">
                  No interests found for this status.
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
                        <TableHead>Sent At</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredInterests.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={item.candidate.image}
                                alt=""
                                className="h-10 w-10 rounded-full object-cover border"
                              />

                              <div className="max-w-[150px]">
                                <p className="font-medium text-slate-900 line-clamp-1">
                                  {item.candidate.fullName}
                                </p>
                                <p className="text-xs text-slate-500">
                                  {item.candidate.designation}
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
                                setOpen(true);
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
                                window.open(item.candidate.resume, "_blank")
                              }
                            >
                              View Resume
                            </Button>
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

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Message Sent</DialogTitle>
              </DialogHeader>

              <div className="p-2 text-slate-700 whitespace-pre-line">
                {selectedMessage}
              </div>

              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default SentInterests;
