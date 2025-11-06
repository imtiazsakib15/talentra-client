import { useForm } from "react-hook-form";
import { CompanySchema } from "@/schemas/company.schema";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InputField, TextAreaField } from "@/components/FormField";
import Container from "@/components/Container";

type CompanyFormData = z.infer<typeof CompanySchema.createCompany>;

const CompanyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CompanyFormData>({
    // resolver: zodResolver(CompanySchema.createCompany),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Submitted:", data);
      toast.success("Profile completed successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete profile");
    }
  });

  return (
    <div className="bg-slate-50">
      <Container className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-semibold text-slate-800">
            Complete Company Profile
          </h1>

          <form onSubmit={onSubmit} className="space-y-5">
            <InputField
              id="companyName"
              label="Company Name"
              placeholder="Enter company name"
              register={register}
              error={errors.companyName?.message}
            />

            <InputField
              id="website"
              label="Website"
              placeholder="https://example.com"
              register={register}
              error={errors.website?.message}
              type="url"
            />

            <InputField
              id="industry"
              label="Industry"
              placeholder="e.g. Software, Finance"
              register={register}
              error={errors.industry?.message}
            />

            <InputField
              id="address"
              label="Address"
              placeholder="123 Business St."
              register={register}
              error={errors.address?.message}
            />

            <InputField
              id="country"
              label="Country"
              placeholder="Enter your country"
              register={register}
              error={errors.country?.message}
            />

            <TextAreaField
              id="description"
              label="Description"
              placeholder="Tell us about your company..."
              register={register}
              error={errors.description?.message}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CompanyProfile;
