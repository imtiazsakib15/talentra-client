import { Briefcase, Users, Calendar, Shield } from "lucide-react";

type TFeature = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const FEATURES: TFeature[] = [
  {
    title: "Advanced Candidate Search",
    description:
      "Companies can filter and find the right talent based on skills, experience, and location.",
    icon: Briefcase,
  },
  {
    title: "Profile Management",
    description:
      "Candidates can build and manage detailed profiles with resumes, portfolios, and personal details.",
    icon: Users,
  },
  {
    title: "Easy Interview Scheduling",
    description:
      "Seamless scheduling with built-in calendar integration for both candidates and companies.",
    icon: Calendar,
  },
  {
    title: "Secure & Private",
    description:
      "Data privacy and secure authentication, ensuring safe interactions.",
    icon: Shield,
  },
];
