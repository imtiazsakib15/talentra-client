import { useSearchParams, Link } from "react-router";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  console.log(errors);

  // role selection
  if (role !== "candidate" && role !== "company") {
    return (
      <Container className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <h2 className="mb-8 text-2xl font-bold text-slate-800">
          Choose Your Role
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => setSearchParams({ role: "candidate" })}
            className="w-48 rounded-2xl bg-white p-6 text-center shadow-md transition hover:scale-105 hover:shadow-lg"
          >
            👤 <span className="block mt-2 font-semibold">I’m a Candidate</span>
          </button>
          <button
            onClick={() => setSearchParams({ role: "company" })}
            className="w-48 rounded-2xl bg-white p-6 text-center shadow-md transition hover:scale-105 hover:shadow-lg"
          >
            🏢 <span className="block mt-2 font-semibold">I’m a Company</span>
          </button>
        </div>
      </Container>
    );
  }

  // registration form
  return (
    <Container className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
          Create {role === "company" ? "Company" : "Candidate"} Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="-mt-2 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p
                className="-mt-2 text-xs text-red-600"
                role="alert"
                aria-live="polite"
              >
                {errors.password.message}
              </p>
            )}
          </Field>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Register;
