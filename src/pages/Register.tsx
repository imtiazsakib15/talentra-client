import { useSearchParams, Link } from "react-router";
import { useState } from "react";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle register logic
  };

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
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
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
}
