import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUp: (name: string) => void;
};

export function AuthDialog({ open, onOpenChange, onSignUp }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async () => {
    if (!supabase) {
      toast.error("Account creation is unavailable: Supabase is not configured.");
      return;
    }
    if (!name.trim() || !email.trim() || password.length < 8) {
      toast.error("Enter your name, a valid email, and a password of at least 8 characters.");
      return;
    }
    setPending(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { display_name: name.trim() } },
    });
    setPending(false);
    if (error) {
      toast.error(error.message.includes("already registered") ? "That email is already registered." : "Account creation failed. Try again.");
      return;
    }
    if (!data.session) {
      toast.success("Account created. Check your email to confirm access.");
      onOpenChange(false);
      return;
    }
    onSignUp(data.user?.user_metadata["display_name"] ?? name.trim());
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle>Login / Sign Up</DialogTitle>
          <DialogDescription>
            Create an account to save preferences and access rental history. Email confirmation may be required.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-1">
            <Label htmlFor="auth-name">Name</Label>
            <Input
              id="auth-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={pending}>{pending ? "Creating account…" : "Create account"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
