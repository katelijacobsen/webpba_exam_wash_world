import type { Metadata } from "next";
import AuthLayout from "@/app/(features)/authentication/components/AuthLayout";
import ResetPasswordForm from "@/app/(features)/authentication/components/ResetPasswordForm";

export const metadata: Metadata = { title: "Ny adgangskode" };

export default async function ResetPassword({
    params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  return (
    <AuthLayout>
      <ResetPasswordForm ResetKey={key} />
    </AuthLayout>
  );
}
