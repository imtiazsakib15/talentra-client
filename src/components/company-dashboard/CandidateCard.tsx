import { Card, CardContent } from "@/components/ui/card";
import type { TCandidate } from "@/types";

const CandidateCard = ({ candidate }: { candidate: TCandidate }) => {
  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition rounded-xl">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <img
            src={candidate.image}
            className="h-14 w-14 rounded-full object-cover border border-slate-200"
            alt="avatar"
          />
          <div>
            <h3 className="font-semibold text-slate-900">
              {candidate.fullName}
            </h3>
            <p className="text-sm text-slate-600">
              {candidate.city}, {candidate.country}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills?.map((s) => (
            <span
              key={s.skillId}
              className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md"
            >
              {s.skill.name}
            </span>
          ))}
        </div>

        <div className="mt-3 text-sm text-slate-700">
          Experience: <b>{candidate.experience} years</b>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
