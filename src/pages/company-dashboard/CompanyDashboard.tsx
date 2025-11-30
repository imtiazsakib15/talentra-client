import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Send, Calendar } from "lucide-react";

export default function CompanyDashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back 👋</h1>
        <p className="text-slate-600">
          Manage your invitations, explore candidates, and schedule interviews.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              Total Candidates Viewed
            </CardTitle>
            <Users className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">134</p>
            <p className="text-xs text-slate-500">+12 this week</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              Invitations Sent
            </CardTitle>
            <Send className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">27</p>
            <p className="text-xs text-slate-500">4 pending</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              Accepted Requests
            </CardTitle>
            <Badge className="bg-emerald-500">Success</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-slate-500">+2 this week</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-slate-600">
              Interviews Scheduled
            </CardTitle>
            <Calendar className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-slate-500">2 upcoming</p>
          </CardContent>
        </Card>
      </div>

      {/* RECENT CANDIDATES */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Viewed Candidates</CardTitle>
            <Button
              variant="ghost"
              className="text-indigo-600 hover:text-indigo-700"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-slate-600">
                    React • Node • MongoDB
                  </p>
                </div>
                <Badge className="bg-indigo-600">1Y Exp</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invitations Sent</CardTitle>
            <Button
              variant="ghost"
              className="text-indigo-600 hover:text-indigo-700"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">Sarah Khan</p>
                  <p className="text-sm text-slate-600">Next.js • Typescript</p>
                </div>
                <Badge className="bg-emerald-500">Pending</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
