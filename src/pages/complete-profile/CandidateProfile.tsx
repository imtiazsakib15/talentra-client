import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputField } from "@/components/FormField";
import { CandidateSchema } from "@/schemas/candidate.schema";
import Container from "@/components/Container";
import ImageUpload from "@/components/ImageUpload";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { useGetAllSkillsQuery } from "@/redux/features/skill/skillApi";
import type { TSkill } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useNavigate } from "react-router";
import { useCreateCandidateProfileMutation } from "@/redux/features/candidate/candidateApi";

type CandidateFormData = z.infer<typeof CandidateSchema.createCandidate>;

const CandidateProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [skills, setSkills] = React.useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(CandidateSchema.createCandidate),
    defaultValues: {
      fullName: "",
      skills: skills,
      phone: "",
      address: "",
      city: "",
      country: "",
      dateOfBirth: undefined,
      resume: "",
      image: undefined,
      isAvailable: true,
      isVisible: true,
    },
  });
  const allSkills: TSkill[] = useGetAllSkillsQuery()?.data?.data;
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createCandidateProfile] = useCreateCandidateProfileMutation();

  const onSubmit: SubmitHandler<CandidateFormData> = async (data) => {
    const toastId = toast.loading("Creating candidate profile...");
    try {
      const candidateData = { ...data, userId: user?.userId };

      const payload = new FormData();
      payload.append("data", JSON.stringify(candidateData));
      payload.append("image", data.image);

      const result = await createCandidateProfile(payload).unwrap();

      if (result.success) {
        toast.success("Candidate profile created successfully", {
          id: toastId,
        });
        reset();
        dispatch(logout());

        navigate("/login");
      } else {
        toast.error("Failed to create candidate profile", { id: toastId });
      }
    } catch (error: unknown) {
      toast.error(
        (error as Error)?.message || "Candidate profile creation failed",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div className="bg-slate-50 py-4">
      <Container className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-semibold text-slate-800">
            Complete Candidate Profile
          </h1>
          <form
            encType="FormData"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
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

            <Field>
              <FieldLabel htmlFor={"skills"} className="text-slate-700">
                Skills
              </FieldLabel>

              <MultiSelect
                values={skills}
                onValuesChange={(values) => {
                  setSkills(values);
                  setValue("skills", values, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <MultiSelectTrigger
                  className="w-full"
                  aria-invalid={!!errors.skills}
                >
                  <MultiSelectValue
                    placeholder="Select frameworks..."
                    overflowBehavior="wrap-when-open"
                  />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectGroup>
                    {allSkills?.map((skill) => (
                      <MultiSelectItem key={skill.id} value={skill.id}>
                        {skill.name}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>

              {errors.skills && (
                <p className="-mt-2 text-xs text-red-600">
                  {errors.skills.message}
                </p>
              )}
            </Field>

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
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                    aria-invalid={!!errors.dateOfBirth}
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setValue("dateOfBirth", date as Date);
                      setDate(date);
                      setOpen(false);
                      delete errors.dateOfBirth;
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>

              {errors.dateOfBirth && (
                <p className="-mt-2 text-xs text-red-600">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </Field>

            <InputField
              id="resume"
              label="Resume URL"
              placeholder="https://example.com/resume.pdf"
              register={register}
              error={errors.resume?.message}
            />

            <Field>
              <FieldLabel htmlFor={"image"} className="text-slate-700">
                Profile Photo
              </FieldLabel>

              <ImageUpload
                onFileSelect={(file: File | null) =>
                  file && setValue("image", file, { shouldValidate: true })
                }
              />
              {errors.image?.message && (
                <p className="-mt-2 text-xs text-red-600">
                  {errors.image.message}
                </p>
              )}
            </Field>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  {...register("isAvailable")}
                  defaultChecked
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Available for work
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  {...register("isVisible")}
                  defaultChecked
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
