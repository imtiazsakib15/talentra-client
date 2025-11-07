import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputField } from "@/components/FormField";
import type { CandidateSchema } from "@/schemas/candidate.schema";
import Container from "@/components/Container";

type CandidateFormData = z.infer<typeof CandidateSchema.createCandidate>;

const CandidateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CandidateFormData>({
    // resolver: zodResolver(CandidateSchema.createCandidate),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Candidate profile data:", data);
      toast.success("Profile completed successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete profile");
    }
  });

  return (
    <div className="bg-slate-50 py-2">
      <Container className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-semibold text-slate-800">
            Complete Candidate Profile
          </h1>
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <InputField
              id="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              register={register}
              error={errors.fullName?.message}
            />

            <InputField
              id="experience"
              label="Years of Experience"
              placeholder="Enter your experience in years"
              register={register}
              error={errors.experience?.message}
              type="number"
            />

            <InputField
              id="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              register={register}
              error={errors.phone?.message}
            />

            <InputField
              id="address"
              label="Address"
              placeholder="Enter your address"
              register={register}
              error={errors.address?.message}
            />

            <InputField
              id="city"
              label="City"
              placeholder="Enter your city"
              register={register}
              error={errors.city?.message}
            />

            <InputField
              id="country"
              label="Country"
              placeholder="Enter your country"
              register={register}
              error={errors.country?.message}
            />

            <Field>
              <FieldLabel htmlFor="dateOfBirth" className="text-slate-700">
                Date of Birth
              </FieldLabel>
              <Input
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
                aria-invalid={!!errors.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <p className="-mt-2 text-xs text-red-600">
                  {errors.dateOfBirth.message?.toString()}
                </p>
              )}
            </Field>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  {...register("isAvailable")}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Available for work
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  {...register("isVisible")}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Make my profile visible
              </label>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CandidateProfile;
