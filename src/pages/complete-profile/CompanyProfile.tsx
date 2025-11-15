import { useForm, type SubmitHandler } from "react-hook-form";
import { CompanySchema } from "@/schemas/company.schema";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InputField, TextAreaField } from "@/components/FormField";
import Container from "@/components/Container";
import { Field, FieldLabel } from "@/components/ui/field";
import ImageUpload from "@/components/ImageUpload";
import { useCreateCompanyProfileMutation } from "@/redux/features/company/companyApi";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

export type CompanyFormData = z.infer<typeof CompanySchema.createCompany>;

const CompanyProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema.createCompany),
  });
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createCompanyProfile] = useCreateCompanyProfileMutation();

  const onSubmit: SubmitHandler<CompanyFormData> = async (data) => {
    const toastId = toast.loading("Creating company profile...");
    try {
      const companyData = { ...data, userId: user?.userId };

      const payload = new FormData();
      payload.append("data", JSON.stringify(companyData));
      payload.append("logo", data.logo);

      const result = await createCompanyProfile(payload).unwrap();

      if (result.success) {
        dispatch(logout());
        toast.success("Company profile created successfully", { id: toastId });
        reset();
        dispatch(logout());

        navigate("/login");
      }
    } catch (error: unknown) {
      toast.error(
        (error as Error)?.message || "Company profile creation failed",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div className="bg-slate-50 py-2">
      <Container className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-semibold text-slate-800">
            Complete Company Profile
          </h1>

          <form
            encType="FormData"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
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

            <Field>
              <FieldLabel htmlFor={"logo"} className="text-slate-700">
                Company Logo
              </FieldLabel>

              <ImageUpload
                onFileSelect={(file: File | null) =>
                  file && setValue("logo", file, { shouldValidate: true })
                }
              />
              {errors.logo?.message && (
                <p className="-mt-2 text-xs text-red-600">
                  {errors.logo.message}
                </p>
              )}
            </Field>

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
