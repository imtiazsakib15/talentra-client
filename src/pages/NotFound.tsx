import { Link } from "react-router";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="bg-linear-to-br from-slate-50 to-indigo-100">
      <Container className="flex min-h-screen flex-col items-center justify-center text-center">
        <div className="max-w-md">
          <h1 className="text-9xl font-extrabold text-indigo-600 drop-shadow-lg">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-bold text-slate-800">
            Page Not Found
          </h2>
          <p className="mt-2 text-slate-600">
            The page you’re looking for doesn’t exist or has been moved.
          </p>

          <div className="mt-6">
            <Button asChild>
              <Link to="/">Go Back Home</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
