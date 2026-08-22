import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BRANDS, CATEGORIES, SIZES } from "@/data/products";
import { DEFAULT_FILTERS, type Filters } from "@/components/drippass/FilterSidebar";

export function FilterBar({ filters, onChange }: { filters: Filters; onChange: (filters: Filters) => void }) {
  const brand = filters.brands[0] ?? "all";
  const availability = filters.availableOnly ? "available" : "all";
  const toggle = (values: string[], value: string) => values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

  return (
    <div className="flex flex-wrap items-center gap-2 border-y border-border/60 py-3">
      <div className="flex max-w-full flex-wrap gap-1.5">
        {CATEGORIES.filter((item) => item !== "Subscription Plans").map((item) => (
          <button key={item} type="button" onClick={() => onChange({ ...filters, categories: toggle(filters.categories, item) })} className={`rounded-none border px-2.5 py-2 text-[11px] ${filters.categories.includes(item) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5">
        {SIZES.map((item) => (
          <button key={item} type="button" onClick={() => onChange({ ...filters, sizes: toggle(filters.sizes, item) })} className={`h-9 w-9 border text-[11px] ${filters.sizes.includes(item) ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>
            {item}
          </button>
        ))}
      </div>
      <Select value={brand} onValueChange={(value) => onChange({ ...filters, brands: value === "all" ? [] : [value] })}>
        <SelectTrigger className="h-9 w-36 rounded-none text-xs"><SelectValue placeholder="Designer" /></SelectTrigger>
        <SelectContent><SelectItem value="all">All designers</SelectItem>{BRANDS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
      </Select>
      <Select value={availability} onValueChange={(value) => onChange({ ...filters, availableOnly: value === "available" })}>
        <SelectTrigger className="h-9 w-32 rounded-none text-xs"><SelectValue placeholder="Availability" /></SelectTrigger>
        <SelectContent><SelectItem value="all">All availability</SelectItem><SelectItem value="available">In stock only</SelectItem></SelectContent>
      </Select>
      <div className="flex min-w-36 items-center gap-2 px-1">
        <Slider value={[filters.maxPerDay]} min={300} max={1500} step={50} onValueChange={(value) => onChange({ ...filters, maxPerDay: value[0] ?? 1500 })} aria-label="Maximum price per day" />
        <span className="whitespace-nowrap text-[11px] text-muted-foreground">₹{filters.maxPerDay}/day</span>
      </div>
      <Button variant="ghost" size="sm" className="rounded-none text-xs" onClick={() => onChange(DEFAULT_FILTERS)}>
        Clear all
      </Button>
    </div>
  );
}