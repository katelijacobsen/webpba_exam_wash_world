"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/(features)/profile/hooks/useSession";
import Loader from "./Loader";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const sessionQuery = useSession();

  useEffect(() => {
    if (sessionQuery.isError) router.push("/");
  }, [sessionQuery.isError, router]);

  if (sessionQuery.isPending) {
    return (
      <div
        className="flex items-center justify-center min-h-[40vh]"
        role="status"
        aria-label="Indlæser..."
      >
        <Loader />
      </div>
    );
  }

  if (!sessionQuery.data) return null;

  return <>{children}</>;
}
