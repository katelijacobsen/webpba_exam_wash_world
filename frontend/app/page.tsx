import type { Metadata } from "next";
import AuthLayout from "./(features)/authentication/components/AuthLayout";
import Form from "./(features)/authentication/components/Form";

export const metadata: Metadata = { title: "Log ind" };

export default function Home() {
  return (
    <AuthLayout>
      <Form />
    </AuthLayout>
  );
}
