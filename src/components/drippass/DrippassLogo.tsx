import { cn } from "@/lib/utils";

const LOGO_SRC = "/drippass-logo.png";

type Props = {
  variant?: "header" | "menu" | "footer";
  className?: string;
  alt?: string;
};

const frameStyles = {
  header: "h-14 w-[240px] md:h-16 md:w-[300px]",
  menu: "h-12 w-[220px]",
  footer: "h-16 w-[280px] md:h-[4.5rem] md:w-[320px]",
};

export function DrippassLogo({
  variant = "header",
  className,
  alt = "DRIPPASS — Wear. Return. Repeat.",
}: Props) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden", frameStyles[variant], className)}>
      <img
        src={LOGO_SRC}
        alt={alt}
        className="absolute left-1/2 top-1/2 h-[360%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
      />
    </span>
  );
}
