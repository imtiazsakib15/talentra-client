import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectGroup,
} from "@/components/ui/multi-select";
import { useSearchCandidatesQuery } from "@/redux/features/candidate/candidateApi";
import CandidateCard from "@/components/company-dashboard/CandidateCard";
import CandidateSkeleton from "@/components/company-dashboard/CandidateSkeleton";
import { useGetAllSkillsQuery } from "@/redux/features/skill/skillApi";
import type { TSkill } from "@/types";

export default function CandidateSearchPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [experienceMin, setExperienceMin] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [available, setAvailable] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isFetching } = useSearchCandidatesQuery({
    skills: skills,
    experienceMin: parseInt(experienceMin) || undefined,
    city: city || undefined,
    country: country || undefined,
    available,
    page,
    limit,
  });
  const allSkills: TSkill[] = useGetAllSkillsQuery()?.data?.data;

  const candidates = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="space-y-8">
      {/* FILTERS SECTION */}
      <div className="rounded-xl border p-6 bg-white shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">
          Search Candidates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Skills */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block text-slate-700">Skills</label>
            <MultiSelect values={skills} onValuesChange={setSkills}>
              <MultiSelectTrigger className="w-full">
                <MultiSelectValue placeholder="Select skills..." />
              </MultiSelectTrigger>
              <MultiSelectContent>
                <MultiSelectGroup>
                  {allSkills?.map((skill) => (
                    <MultiSelectItem key={skill.id} value={skill.name}>
                      {skill.name}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm mb-1 block text-slate-700">
              Min Experience (years)
            </label>
            <Input
              type="number"
              placeholder="e.g. 2"
              value={experienceMin}
              onChange={(e) => setExperienceMin(e.target.value)}
              min={0}
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm mb-1 block text-slate-700">City</label>
            <Input
              placeholder="Dhaka"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Country */}
          <div>
            <label className="text-sm mb-1 block text-slate-700">Country</label>
            <Input
              placeholder="Bangladesh"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          {/* Available */}
          <div className="flex items-center gap-2 pt-6">
            <input
              id="available"
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="h-4 w-4 text-indigo-600 rounded border-slate-300"
            />
            <label htmlFor="available" className="text-sm text-slate-700">
              Available Now
            </label>
          </div>
        </div>
      </div>

      {/* CANDIDATE LIST + PAGINATION */}
      <div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CandidateSkeleton key={i} />
            ))}
          </div>
        ) : candidates.length === 0 ? (
          <div className="py-20 text-center text-slate-600 text-lg">
            No candidates found. Try different filters.
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {candidates.map((c) => (
                <CandidateCard key={c.id} candidate={c} />
              ))}

              {isFetching &&
                Array.from({ length: 3 }).map((_, i) => (
                  <CandidateSkeleton key={`sk-${i}`} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button
                variant="outline"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>

              <span className="text-sm text-slate-700">
                Page <b>{page}</b> of <b>{totalPages}</b>
              </span>

              <Button
                variant="outline"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
