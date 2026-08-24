import { useMemo, useState } from "react";
import { MapPin, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (location: string) => void;
  initialLocation?: string;
};

const SUGGESTED_LOCATIONS = [
  "110001, Delhi",
  "560001, Bengaluru",
  "400001, Mumbai",
  "700001, Kolkata",
  "600001, Chennai",
];

const MAP_POINTS = [
  { label: "Central", top: "28%", left: "42%" },
  { label: "North", top: "34%", left: "67%" },
  { label: "West", top: "55%", left: "28%" },
  { label: "South", top: "72%", left: "58%" },
];

export function LocationPickerDialog({ open, onOpenChange, onLocationSelect, initialLocation }: Props) {
  const [input, setInput] = useState(initialLocation ?? "");
  const [detecting, setDetecting] = useState(false);

  const previewLocation = useMemo(() => input.trim() || "Delhi NCR", [input]);

  const confirm = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      toast.error("Please enter a location");
      return;
    }
    onLocationSelect(trimmed);
    onOpenChange(false);
    toast.success(`Availability checked for ${trimmed}`);
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location detection is not supported in this browser.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      () => { setDetecting(false); setInput("Delhi NCR"); toast.success("Approximate area detected. Confirm it before saving."); },
      () => { setDetecting(false); toast.error("Location permission was denied. Enter a PIN code instead."); },
      { maximumAge: 300000, timeout: 5000 },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-none">
        <DialogHeader>
          <DialogTitle>Set your delivery location</DialogTitle>
          <DialogDescription>
            Choose a city or pin a nearby zone to see what’s available in your area.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Enter your location or PIN code"
            />
            <Button type="button" variant="outline" className="gap-2" onClick={detectLocation}>
              <LocateFixed className="size-4" /> {detecting ? "Detecting…" : "Detect my location"}
            </Button>
          </div>

          <div className="rounded-none border border-border bg-muted/40 p-3">
            <div className="relative h-48 overflow-hidden rounded-none border border-border bg-[radial-gradient(circle_at_top_left,_rgba(255,199,76,0.3),_transparent_35%),linear-gradient(135deg,_#f8f8f8_0%,_#ececec_100%)]">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
              {MAP_POINTS.map((point) => (
                <button
                  key={point.label}
                  type="button"
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-gold bg-background/90 px-2 py-1 text-[10px] shadow-sm"
                  style={{ top: point.top, left: point.left }}
                  onClick={() => setInput(`${point.label} Zone, Delhi NCR`)}
                >
                  <MapPin className="size-3 text-gold" /> {point.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {SUGGESTED_LOCATIONS.map((location) => (
              <button
                key={location}
                type="button"
                className="rounded-full border border-border px-3 py-1 text-xs hover:bg-muted"
                onClick={() => setInput(location)}
              >
                {location}
              </button>
            ))}
          </div>

          <div className="rounded-none border border-border bg-background p-3 text-sm">
            <p className="font-medium">Preview</p>
            <p className="text-muted-foreground">Availability will be checked for {previewLocation}.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={confirm}>Check availability</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
