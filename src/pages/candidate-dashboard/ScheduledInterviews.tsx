import { useState } from "react";
import { useGetCandidateInterviewsQuery } from "@/redux/features/interview/interviewApi";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Tv } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { TInterview } from "@/types";

const ScheduledInterviews = () => {
  const { data, isLoading, error } = useGetCandidateInterviewsQuery(undefined);
  const [open, setOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<TInterview | null>(
    null
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 mt-10 font-medium">
        Failed to load scheduled interviews.
      </p>
    );
  }

  const interviews: TInterview[] = data?.data || [];

  return (
    <div className="p-6 w-full">
      <Card className="shadow-md border border-slate-200 rounded-2xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold text-slate-800 mb-5">
            Scheduled Interviews
          </h1>

          {interviews.length === 0 ? (
            <p className="text-center text-slate-500 mt-10">
              No interviews scheduled yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Scheduled At</TableHead>
                    <TableHead>Meeting</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {interviews.map((iv) => (
                    <TableRow key={iv.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={iv.company.logo}
                            className="h-10 w-10 object-cover rounded-lg border"
                          />
                          <div>
                            <p className="font-medium text-slate-900">
                              {iv.company.companyName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {iv.company.address}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{iv.company.industry}</TableCell>

                      <TableCell>
                        {new Date(iv.scheduledAt).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => {
                            setSelectedInterview(iv);
                            setOpen(true);
                          }}
                        >
                          <Tv className="h-4 w-4" />
                          View Link
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Interview Meeting Link Modal */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Interview Details</DialogTitle>
              </DialogHeader>

              {selectedInterview && (
                <div className="space-y-4">
                  <p>
                    <span className="font-semibold">Company:</span>{" "}
                    {selectedInterview.company.companyName}
                  </p>

                  <p>
                    <span className="font-semibold">Scheduled At:</span>{" "}
                    {new Date(selectedInterview.scheduledAt).toLocaleString()}
                  </p>

                  <p className="font-semibold">Meeting Link:</p>
                  <a
                    href={selectedInterview.meetingLink}
                    target="_blank"
                    className="text-indigo-600 underline break-all"
                  >
                    {selectedInterview.meetingLink}
                  </a>
                </div>
              )}

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

export default ScheduledInterviews;
