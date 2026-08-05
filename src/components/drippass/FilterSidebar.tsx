import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BRANDS, CATEGORIES, DURATIONS, EVENTS, SIZES } from "@/data/products";

export type Filters = {
  categories: string[];
  sizes: string[];
  genders: string[];
  events: string[];
  duration: string;
  brands: string[];
  maxPerDay: number;
};

export const DEFAULT_FILTERS: Filters = {
  categories: [],
  sizes: [],
  genders: [],
  events: [],
  duration: "7-day",
  brands: [],
  maxPerDay: 1500,
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterSidebar({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <aside className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg">Filters</h2>
        <Button variant="ghost" size="sm" onClick={() => onChange(DEFAULT_FILTERS)}>
          Clear all
        </Button>
      </div>
      <Separator />

      <Accordion type="multiple" defaultValue={["cat", "size", "dur", "price"]}>
        <AccordionItem value="cat">
          <AccordionTrigger className="text-xs tracking-luxe">CATEGORY</AccordionTrigger>
          <AccordionContent className="space-y-2.5">
            {CATEGORIES.filter((c) => c !== "Subscription Plans").map((c) => (
              <div key={c} className="flex items-center gap-2">
                <Checkbox
                  id={`c-${c}`}
                  checked={filters.categories.includes(c)}
                  onCheckedChange={() => set({ categories: toggle(filters.categories, c) })}
                />
                <Label htmlFor={`c-${c}`} className="text-sm font-normal">
                  {c}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-xs tracking-luxe">SIZE</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => set({ sizes: toggle(filters.sizes, s) })}
                  className={`h-9 w-11 border text-xs transition-colors ${
                    filters.sizes.includes(s)
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gender">
          <AccordionTrigger className="text-xs tracking-luxe">GENDER</AccordionTrigger>
          <AccordionContent className="space-y-2.5">
            {["Women", "Men", "Unisex"].map((g) => (
              <div key={g} className="flex items-center gap-2">
                <Checkbox
                  id={`g-${g}`}
                  checked={filters.genders.includes(g)}
                  onCheckedChange={() => set({ genders: toggle(filters.genders, g) })}
                />
                <Label htmlFor={`g-${g}`} className="text-sm font-normal">
                  {g}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="event">
          <AccordionTrigger className="text-xs tracking-luxe">EVENT TYPE</AccordionTrigger>
          <AccordionContent className="space-y-2.5">
            {EVENTS.map((e) => (
              <div key={e} className="flex items-center gap-2">
                <Checkbox
                  id={`e-${e}`}
                  checked={filters.events.includes(e)}
                  onCheckedChange={() => set({ events: toggle(filters.events, e) })}
                />
                <Label htmlFor={`e-${e}`} className="text-sm font-normal">
                  {e}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dur">
          <AccordionTrigger className="text-xs tracking-luxe">RENTAL DURATION</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => set({ duration: d })}
                  className={`border py-2 text-xs transition-colors ${
                    filters.duration === d
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="text-xs tracking-luxe">BRAND</AccordionTrigger>
          <AccordionContent className="space-y-2.5">
            {BRANDS.map((b) => (
              <div key={b} className="flex items-center gap-2">
                <Checkbox
                  id={`b-${b}`}
                  checked={filters.brands.includes(b)}
                  onCheckedChange={() => set({ brands: toggle(filters.brands, b) })}
                />
                <Label htmlFor={`b-${b}`} className="text-sm font-normal">
                  {b}
                </Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-xs tracking-luxe">PRICE PER DAY</AccordionTrigger>
          <AccordionContent className="pt-2">
            <Slider
              value={[filters.maxPerDay]}
              min={300}
              max={1500}
              step={50}
              onValueChange={(v) => set({ maxPerDay: v[0] ?? 1500 })}
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Up to <span className="font-medium text-foreground">₹{filters.maxPerDay}</span> / day
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
