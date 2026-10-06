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
      <div className="grid place-items-center min-h-[60dvh]">
        <Loader label="Tjekker login…" />
      </div>
    );
  }

  if (!sessionQuery.data) return null;

  return <>{children}</>;
}
