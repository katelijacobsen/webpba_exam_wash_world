"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/app/global/types/global";
import { useUploadAvatar } from "@/app/(features)/profile/hooks/useUploadAvatar";
import { useLogout } from "../hooks/useLogout";
import Icon from "@/app/global/components/Icon";
import Button from "@/app/global/components/Button";
import { uploadSrc } from "@/app/lib/images";

type Props = { user: User };

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function PersonalOverview({ user }: Props) {
  const memberSince = new Date(user.user_created_at * 1000).toLocaleDateString("da-DK", {
    month: "long",
    year: "numeric",
  });
  const uploadMutation = useUploadAvatar();
  const logoutMutation = useLogout();
  const router = useRouter();
  const avatar = uploadSrc(user.user_img_key);

  // Bruges efter man har logget ud
  useEffect(() => {
    if (logoutMutation.isSuccess) router.push("/");
  }, [logoutMutation.isSuccess, router]);

  return (
    <article className="relative overflow-hidden rounded-4 bg-bg-dark text-white">
      <span
        aria-hidden="true"
        className="absolute -right-16 -top-24 text-[9rem] leading-none font-extrabold text-white/[0.06] select-none"
      >
        W
      </span>

      <div className="relative flex flex-col gap-20 p-24">
        <div className="flex items-center gap-16 lg:flex-col lg:items-start">
          <div className="relative shrink-0">
            <div className="w-[88px] h-[88px] rounded-full overflow-hidden bg-primary-400 text-bg-dark grid place-items-center ring-4 ring-white/10">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element -- served by the Flask backend
                <img src={avatar} alt="" width={88} height={88} className="w-full h-full object-cover" />
              ) : (
                <span aria-hidden="true" className="text-lg font-extrabold">{initials(user.user_fullname)}</span>
              )}
              {uploadMutation.isPending && (
                <span className="absolute inset-0 grid place-items-center rounded-full bg-bg-dark/60 text-xs font-bold uppercase">
                  Uploader…
                </span>
              )}
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="peer sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadMutation.mutate(f);
              }}
            />
            <label
              htmlFor="avatar-upload"
              className="absolute -right-4 -bottom-4 grid place-items-center w-40 h-40 rounded-full bg-primary-400 text-bg-dark border-4 border-bg-dark hover:bg-primary-200 peer-focus-visible:outline-3 peer-focus-visible:outline-primary-400 peer-focus-visible:outline-offset-2"
            >
              <Icon iconName="pencil" size="sm" />
              <span className="sr-only">Skift profilbillede</span>
            </label>
          </div>

          <div className="flex flex-col gap-6 min-w-0">
            <h2 className="text-lg font-bold uppercase break-words">{user.user_fullname}</h2>
            <p className="text-sm text-white/70">Medlem siden {memberSince}</p>
          </div>
        </div>

        {uploadMutation.isError && (
          <p role="alert" className="text-sm font-medium text-[#ff8a84]">
            Billedet kunne ikke uploades. Prøv et andet billede.
          </p>
        )}

        <p className="inline-flex w-fit items-center gap-6 rounded-2 bg-primary-400 text-bg-dark px-8 py-4 text-xs font-bold uppercase tracking-[0.06em]">
          <Icon iconName="crown" size="xs" /> Aktivt medlemskab
        </p>

        <Button
          elementType="button"
          buttonName={logoutMutation.isPending ? "Logger ud…" : "Log ud"}
          iconName="logout"
          size="lg"
          type="none"
          className="justify-start! text-white! hover:text-primary-400! min-h-48 -mb-8"
          onClick={() => logoutMutation.mutate()}
        />
      </div>
    </article>
  );
}
