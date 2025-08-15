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
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Go Home
      </Link>
    </main>
  );
};

export default NotFound;
