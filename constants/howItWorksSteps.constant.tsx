import { Briefcase, Search, MessageSquare } from "lucide-react";

export const STEPS = [
  {
    title: "Create Your Profile",
    description:
      "Sign up as a candidate or company and complete your profile in minutes.",
    icon: <Briefcase className="h-10 w-10 text-indigo-600" />,
  },
  {
    title: "Find Matches",
    description:
      "Companies search for talent and candidates discover opportunities effortlessly.",
    icon: <Search className="h-10 w-10 text-indigo-600" />,
  },
  {
    title: "Connect & Schedule",
    description:
      "Send interests, chat, and schedule interviews directly from the platform.",
    icon: <MessageSquare className="h-10 w-10 text-indigo-600" />,
  },
];
