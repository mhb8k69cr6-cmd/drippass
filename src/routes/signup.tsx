import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/drippass/AuthPage";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up | DRIPPASS" }, { name: "description", content: "Create your DRIPPASS account." }] }),
  component: () => <AuthPage mode="signup" />,
});
