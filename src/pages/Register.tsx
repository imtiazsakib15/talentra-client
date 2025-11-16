import { useSearchParams, Link, useNavigate } from "react-router";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { USER_ROLE } from "@/constants/user.constant";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";

export type Inputs = {
  email: string;
  password: string;
};

const Register = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [registerUser] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const role = searchParams.get("role");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastId = toast.loading("Registering...");
    try {
      const user = {
        email: data.email,
        password: data.password,
        role: role as string,
      };
      const result = await registerUser(user).unwrap();

      if (result.success) {
        const user = result.data.user;

        dispatch(setUser({ user, token: result.data.accessToken }));

        toast.success("Registration successful", { id: toastId });
        reset();

        if (role === USER_ROLE.CANDIDATE)
          navigate("/complete-profile/candidate");
        if (role === USER_ROLE.COMPANY) navigate("/complete-profile/company");
      } else {
        toast.error("Registration failed", { id: toastId });
      }
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Registration failed", {
        id: toastId,
      });
    }
  };

  // role selection
  if (role !== USER_ROLE.CANDIDATE && role !== USER_ROLE.COMPANY) {
    return (
      <div className="bg-slate-50">
        <Container className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="mb-8 text-2xl font-bold text-slate-800">
            Choose Your Role
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => setSearchParams({ role: USER_ROLE.CANDIDATE })}
              className="w-48 rounded-2xl bg-white p-6 text-center shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              👤{" "}
              <span className="block mt-2 font-semibold">I’m a Candidate</span>
            </button>
            <button
              onClick={() => setSearchParams({ role: USER_ROLE.COMPANY })}
              className="w-48 rounded-2xl bg-white p-6 text-center shadow-md transition hover:scale-105 hover:shadow-lg"
            >
              🏢 <span className="block mt-2 font-semibold">I’m a Company</span>
            </button>
          </div>
        </Container>
      </div>
    );
  }

  // registration form
  return (
    <div className="bg-slate-50 py-4">
      <Container className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
            Create{" "}
            {role === USER_ROLE.COMPANY
              ? USER_ROLE.COMPANY
              : USER_ROLE.CANDIDATE}{" "}
            Account
          </h2>
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
    </div>
  );
};

export default Register;
