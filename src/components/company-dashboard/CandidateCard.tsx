import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { TCandidate } from "@/types";

const CandidateCard = ({ candidate }: { candidate: TCandidate }) => {
  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition rounded-2xl">
      <CardContent className="p-4 space-y-4">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <img
            src={candidate.image}
            className="h-16 w-16 rounded-full object-cover border border-slate-300"
            alt={`${candidate.fullName} photo`}
          />

          <div>
            <h3 className="font-semibold text-lg text-slate-900 leading-tight">
              {candidate.fullName}
            </h3>

            <p className="text-sm text-indigo-600 font-medium">
              {candidate.designation || "Unemployed"}
            </p>

            <p className="text-xs text-slate-600">
              {candidate.city}, {candidate.country}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {candidate.skills?.map((s) => (
            <span
              key={s.skillId}
              className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full border border-indigo-100"
            >
              {s.skill.name}
            </span>
          ))}
        </div>

        {/* Experience */}
        <div className="text-sm text-slate-700">
          <span className="font-medium text-slate-900">
            {candidate.experience} years
          </span>{" "}
          of experience
        </div>

        {/* View Profile Button */}
        <div className="pt-2">
          <Button asChild className="w-full text-white rounded-xl">
            <Link to={`/company/dashboard/candidates/${candidate.id}`}>
              View Profile
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
