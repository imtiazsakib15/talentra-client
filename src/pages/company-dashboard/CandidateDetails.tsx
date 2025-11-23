import { useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCandidateByIdQuery } from "@/redux/features/candidate/candidateApi";
import type { TCandidate } from "@/types";
import { SendInterestModal } from "@/components/company-dashboard/SendInterestModal";
import CandidateDetailsSkeleton from "@/components/company-dashboard/CandidateDetailsSkeleton";

const CandidateDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCandidateByIdQuery(id!);

  const candidate: TCandidate = data?.data;
  if (isLoading) return <CandidateDetailsSkeleton />;
  if (!candidate) return <div className="p-6">Candidate not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="rounded-2xl shadow-sm border border-slate-200">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-5">
            <img
              src={candidate.image}
              className="h-20 w-20 rounded-full object-cover border"
              alt="avatar"
            />

            <div>
              <h1 className="text-2xl font-semibold text-slate-900">
                {candidate.fullName}
              </h1>

              <p className="text-sm text-indigo-600 font-medium mt-1">
                {candidate.designation}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {candidate.city}, {candidate.country}
              </p>

              <div className="mt-2">
                {candidate.isAvailable ? (
                  <Badge className="bg-emerald-100 text-emerald-700">
                    Available for Work
                  </Badge>
                ) : (
                  <Badge variant="secondary">Not Available</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <h3 className="font-medium text-slate-800 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills?.map((s) => (
                <Badge
                  key={s.skillId}
                  className="bg-indigo-100 text-indigo-700"
                >
                  {s.skill.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Experience */}
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Experience</h3>
            <p className="text-slate-700">{candidate.experience} years</p>
          </div>

          <Separator />

          {/* Contact */}
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Contact</h3>
            <p className="text-slate-700">📞 {candidate.phone}</p>
            <p className="text-slate-600 mt-1">{candidate.address}</p>
          </div>

          <Separator />

          {/* Resume */}
          <div>
            <h3 className="font-medium text-slate-800 mb-1">Resume</h3>
            <a
              href={candidate.resume}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline"
            >
              View Resume →
            </a>
          </div>

          <Separator />

          {/* Send Interest */}
          <div className="pt-2">
            <SendInterestModal candidateId={candidate.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CandidateDetails;
