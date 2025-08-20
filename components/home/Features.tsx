import { FEATURES } from "@/constants/features.constant";
import Container from "../Container";

export default function Features() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why Choose Talent Hunt?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Streamline your hiring journey. Whether you&apos;re a company
            seeking skilled candidates or a professional exploring new
            opportunities, we make the process faster and easier.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <feature.icon className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
