"use client";

import Button from "@/components/shared/Button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold text-red-600">500</h1>
      <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-slate-800">
        Something went wrong
      </h2>
      <p className="mt-2 text-slate-600 max-w-md">
        We’re sorry, but an unexpected error has occurred.
      </p>
      <div className="mt-6 flex gap-4">
        <Button onClick={() => reset()}>Try Again</Button>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </main>
  );
}
