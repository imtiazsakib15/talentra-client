import { Link } from "react-router";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Inputs } from "./Register";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/authApi";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loginUser] = useLoginMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const result = await loginUser(data).unwrap();
      if (result.success) {
        toast.success("Login successful", { id: toastId });
      }
    } catch (error: unknown) {
      toast.error((error as Error).message || "Login failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="bg-linear-to-br from-indigo-50 via-white to-slate-100">
      <Container className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-md">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back 👋
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Login to continue your journey with{" "}
              <span className="text-indigo-600 font-semibold">Talentra</span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <Field>
              <FieldLabel htmlFor="email" className="text-slate-700">
                Email Address
              </FieldLabel>
              <Input
                id="email"
                type="email"
                className="focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
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
              <FieldLabel htmlFor="password" className="text-slate-700">
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
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

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full text-base">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Login;
