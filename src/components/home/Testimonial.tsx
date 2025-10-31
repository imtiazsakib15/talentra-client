import { TESTIMONIALS } from "@/constants/testimonials.constant";
import Container from "../Container";

const Testimonial = () => {
  return (
    <section className="relative bg-slate-50 py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            What People Say About{" "}
            <span className="text-indigo-600">Talentra</span>
          </h2>
          <p className="mt-3 text-slate-600">
            Real experiences from candidates and companies who found success
            with us.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/60 backdrop-blur-md shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <p className="text-slate-700 italic mb-4">
                “{testimonial.quote}”
              </p>
              <h4 className="font-semibold text-slate-900">
                {testimonial.name}
              </h4>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
