import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative bg-linear-to-br from-indigo-50 via-white to-emerald-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-indigo-100 opacity-30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-emerald-100 opacity-30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-20 text-center lg:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Connect Talent with Opportunity
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl">
            A smart platform where{" "}
            <span className="font-semibold text-indigo-600">candidates </span>
            meet the right{" "}
            <span className="font-semibold text-emerald-500">companies</span> —
            faster, easier, and smarter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/register?role=candidate"
              className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Join as Candidate
            </Link>
            <Link
              to="/register?role=company"
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Join as Company
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
