import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetMyProfileQuery } from "@/redux/features/candidate/candidateApi";
import type { TCandidate } from "@/types";
import MyProfileSkeleton from "@/components/candidate-dashboard/MyProfileSkeleton";

const MyProfile = () => {
  const { data, isLoading, error } = useGetMyProfileQuery();

  if (isLoading) {
    return <MyProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold text-lg text-center">
          Something went wrong.
        </p>
      </div>
    );
  }

  const candidate: TCandidate = data?.data;

  if (!candidate) {
    return (
      <div className="p-6">
        <p className="text-slate-600 font-semibold text-lg text-center">
          No profile found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6 flex items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={candidate.image} />
          </Avatar>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-slate-900">
              {candidate.fullName}
            </h2>
            <p className="text-slate-600 mt-1">{candidate.designation}</p>

            <div className="mt-2 flex gap-2">
              <Badge
                className={`${
                  candidate.isAvailable ? "bg-emerald-500" : "bg-slate-500"
                } text-white`}
              >
                {candidate.isAvailable ? "Available" : "Not Available"}
              </Badge>

              {candidate.isVisible ? (
                <Badge className="bg-indigo-600 text-white">Public</Badge>
              ) : (
                <Badge className="bg-slate-700 text-white">Private</Badge>
              )}
            </div>
          </div>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6 space-y-6">
          <h3 className="font-semibold text-lg text-slate-900">
            Profile Details
          </h3>
          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <Detail
              label="Experience"
              value={`${candidate.experience} years`}
            />
            <Detail label="Phone" value={candidate.phone} />
            <Detail label="Email" value={candidate.user?.email || "N/A"} />
            <Detail
              label="Date of Birth"
              value={candidate.dateOfBirth.slice(0, 10)}
            />
            <Detail label="City" value={candidate.city} />
            <Detail label="Country" value={candidate.country} />
            <Detail label="Address" value={candidate.address} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-slate-900">Skills</h3>
          <Separator className="my-3" />

          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((s) => (
              <Badge
                key={s.skillId}
                className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              >
                {s.skill.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border border-slate-200">
        <CardContent className="p-6 flex flex-col gap-3">
          <h3 className="font-semibold text-lg text-slate-900">Resume</h3>
          <Separator />
          <a href={candidate.resume} target="_blank">
            <Button variant="outline">View Resume </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-xs text-slate-500">{label}</span>
    <span className="text-slate-800 font-medium">{value}</span>
  </div>
);

export default MyProfile;
