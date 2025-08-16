import Button from "@/components/shared/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-indigo-600">404</h1>
      <h2 className="mt-2 text-2xl font-semibold text-slate-800">
        Page Not Found
      </h2>
      <p className="mt-2 text-slate-600 max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <Link href="/" className="mt-6">
        <Button>Go Home</Button>
      </Link>
    </main>
  );
};

export default NotFound;
