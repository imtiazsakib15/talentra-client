import { STEPS } from "@/constants/howItWorksSteps.constant";
import SectionTitle from "../shared/SectionTitle";

const HowItWorks = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <SectionTitle
          title="How It Works"
          subtitle="Simple steps to connect candidates with companies faster."
        />

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-2xl bg-white p-6 shadow hover:shadow-md transition"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
