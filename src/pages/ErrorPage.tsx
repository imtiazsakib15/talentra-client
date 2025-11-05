import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-linear-to-br from-slate-50 to-slate-100">
      <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">500</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">
        Something went wrong
      </h2>
      <p className="text-slate-600 max-w-md mb-8">
        We’re working to fix the problem. Please try again later or return to
        the homepage.
      </p>
      <Button onClick={() => navigate("/")}>Go Back Home</Button>
    </div>
  );
}
