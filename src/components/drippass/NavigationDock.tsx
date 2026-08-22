import { Crown, LayoutGrid, Sparkles } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

const ITEMS = [
  { to: "/", label: "Browsing Feed", icon: LayoutGrid },
  { to: "/passes", label: "Subscription Plans", icon: Crown },
  { to: "/try-on", label: "AI Try-On Studio", icon: Sparkles },
] as const;

export function NavigationDock() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-fit max-w-[calc(100vw-1rem)] items-center gap-1 rounded-full border border-foreground/15 bg-background/85 p-1.5 shadow-soft backdrop-blur-xl"
    >
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? pathname === "/" || pathname.startsWith("/rent") : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            title={label}
            className={`group relative grid min-h-11 min-w-11 place-items-center rounded-full px-3 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="size-4" aria-hidden="true" />
            <span className="sr-only">{label}</span>
            {active && <span className="absolute -bottom-1 size-1 rounded-full bg-gold" aria-hidden="true" />}
          </Link>
        );
      })}
    </nav>
  );
}