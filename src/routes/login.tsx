import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/drippass/AuthPage";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in | DRIPPASS" }, { name: "description", content: "Log in to your DRIPPASS account." }] }),
  component: () => <AuthPage mode="login" />,
});
