import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  MapPin,
  Heart,
  ShoppingBag,
  User,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DrippassLogo } from "@/components/drippass/DrippassLogo";
import { LocationPickerDialog } from "@/components/drippass/LocationPickerDialog";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PRODUCTS } from "@/data/products";

const SUGGESTIONS = [
  "sequin dress for club night",
  "ivory tuxedo gala",
  "oversized leather jacket",
  "silk gown wedding guest",
];
const PLACEHOLDERS = ["Search tuxedos for weddings…", "Search Sabyasachi…", "Search a look for your next event…"];

type SpeechRecognitionResult = { [index: number]: { [index: number]: { transcript: string } } };
type SpeechRecognitionEvent = Event & { results: SpeechRecognitionResult };
type SpeechRecognitionInstance = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

type Props = {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onCategory: (c: string) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenLookbook: () => void;
  onSearch: (query: string) => void;
  onLogin: () => void;
  onManagePass: () => void;
  onReturnPickups: () => void;
  userName?: string;
  location?: string;
  onLocationChange?: (location: string) => void;
};

export function SiteHeader({
  cartCount,
  wishlistCount,
  activeCategory,
  onCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenLookbook,
  onSearch,
  onLogin,
  onManagePass,
  onReturnPickups,
  userName,
  location,
  onLocationChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [highlighted, setHighlighted] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<number | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (location) window.localStorage.setItem("drippass.location", location);
  }, [location]);

  useEffect(() => {
    if (sessionStorage.getItem("drippass-location-requested") || !navigator.geolocation) return;
    sessionStorage.setItem("drippass-location-requested", "true");
    navigator.geolocation.getCurrentPosition(
      (position) => onLocationChange?.(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`),
      () => undefined,
      { maximumAge: 300000, timeout: 5000 },
    );
  }, [onLocationChange]);

  useEffect(() => () => recognitionRef.current?.stop(), []);
  useEffect(() => {
    const timer = window.setInterval(() => setPlaceholderIndex((index) => (index + 1) % PLACEHOLDERS.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const items = PRODUCTS.filter((product) => !normalized || `${product.title} ${product.designer} ${product.category} ${product.event}`.toLowerCase().includes(normalized)).slice(0, 5);
    return {
      trending: normalized ? [] : SUGGESTIONS,
      designers: [...new Set(items.map((product) => product.designer))],
      categories: [...new Set(items.map((product) => product.category))],
      products: items,
    };
  }, [query]);

  const searchOptions = [
    ...matches.trending.map((value) => ({ value, label: value })),
    ...matches.designers.map((value) => ({ value, label: value })),
    ...matches.categories.map((value) => ({ value, label: value })),
    ...matches.products.map((product) => ({ value: product.title, label: product.title })),
  ];
  const groupStarts = [
    { title: "Trending searches", count: matches.trending.length },
    { title: "Designers", count: matches.designers.length },
    { title: "Categories", count: matches.categories.length },
    { title: "Direct item matches", count: matches.products.length },
  ];

  const submitSearch = () => {
    const trimmed = query.trim();
    onSearch(trimmed);
    setFocused(false);
    if (trimmed) {
      toast.success(`Showing results for "${trimmed}"`);
    } else {
      toast("Showing all fits");
    }
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }).SpeechRecognition
      ?? (window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice search is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript.trim() ?? "";
      setQuery(transcript);
      if (transcript) {
        onSearch(transcript);
        setVoiceOpen(false);
      }
      else toast.error("No speech detected. Try again.");
    };
    recognition.onerror = (event) => toast.error(event.error === "not-allowed" ? "Microphone permission was denied." : "Voice search could not hear that.");
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    setVoiceOpen(true);
    try {
      recognition.start();
    } catch {
      setListening(false);
      toast.error("Voice search is already active.");
    }
  };

  const updateQuery = (value: string) => {
    setQuery(value);
    setHighlighted(0);
    if (searchTimerRef.current) window.clearTimeout(searchTimerRef.current);
    searchTimerRef.current = window.setTimeout(() => onSearch(value), 280);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="bg-gradient-luxe px-4 py-1.5 text-center text-[11px] tracking-luxe text-primary-foreground">
        FREE PREPAID RETURN BAG · SANITIZED BEFORE EVERY DROP
      </div>

      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-3">
        <a href="/" className="shrink-0 leading-none" aria-label="DRIPPASS home">
          <DrippassLogo variant="header" />
        </a>

        <button
          onClick={() => setLocationOpen(true)}
          className="hidden items-center gap-2 rounded-sm border border-border px-3 py-2 text-left text-xs hover:bg-muted md:flex"
        >
          <MapPin className="size-4 text-gold" />
          <span>
            <span className="block text-muted-foreground">{location ? `Deliver to ${location}` : "Set your location"}</span>
            <span className="font-medium">Check availability</span>
          </span>
        </button>

        <div className="relative flex-1" role="search">
          <div className="flex items-center overflow-hidden rounded-sm border border-foreground/20 bg-card focus-within:border-foreground">
            <Input
              ref={searchInputRef}
              value={query}
              onChange={(e) => updateQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={focused}
              aria-controls="search-results"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlighted((index) => Math.min(index + 1, Math.max(0, searchOptions.length - 1)));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHighlighted((index) => Math.max(0, index - 1));
                } else if (e.key === "Escape") {
                  setFocused(false);
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  const option = searchOptions[highlighted];
                  if (option) {
                    updateQuery(option.value);
                    onSearch(option.value);
                    setFocused(false);
                  } else submitSearch();
                }
              }}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            />
            <button
              onClick={startVoiceSearch}
              className={`px-3 ${listening ? "text-destructive" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Voice search"
              title={listening ? "Listening" : "Voice search"}
            >
              <Mic className={`size-4 ${listening ? "animate-pulse" : ""}`} />
            </button>
            <button
              type="button"
              onClick={submitSearch}
              className="flex h-11 items-center bg-gradient-neon px-5 text-foreground"
              aria-label="Search"
            >
              <Search className="size-4" />
            </button>
          </div>

          {focused && (
            <div id="search-results" role="listbox" aria-label="Search suggestions" className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-sm border border-border bg-popover shadow-soft">
              {!searchOptions.length && <p className="px-4 py-3 text-xs text-muted-foreground">No matching fits, designers, or categories.</p>}
              {searchOptions.map((option, index) => (
                <Fragment key={`${option.value}-${index}`}>
                  {(() => {
                    let offset = 0;
                    const group = groupStarts.find((candidate) => {
                      const startsAt = offset;
                      offset += candidate.count;
                      return candidate.count > 0 && index === startsAt;
                    });
                    return group ? <p className="px-4 pb-1 pt-3 text-[10px] font-medium uppercase tracking-luxe text-muted-foreground">{group.title}</p> : null;
                  })()}
                  <button
                    role="option"
                    aria-selected={highlighted === index}
                    onMouseDown={() => {
                      updateQuery(option.value);
                      onSearch(option.value);
                      setFocused(false);
                      toast.success(`Showing results for "${option.value}"`);
                    }}
                    className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted ${highlighted === index ? "bg-muted" : ""}`}
                  >
                    <Search className="size-3.5 text-muted-foreground" />
                    {option.label}
                  </button>
                </Fragment>
              ))}
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hey, {userName ?? "Guest"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userName ? (
              <>
                <DropdownMenuItem onClick={onOpenWishlist}>My Wishlist</DropdownMenuItem>
                <DropdownMenuItem onClick={onOpenLookbook}>My Lookbook</DropdownMenuItem>
                <DropdownMenuItem onClick={onManagePass}>Manage Pass</DropdownMenuItem>
                <DropdownMenuItem onClick={onReturnPickups}>Return Pickups</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogin}>Logout</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={onLogin}>Login / Sign up</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onOpenWishlist}
          aria-label="Saved outfits"
        >
          <Heart />
          {wishlistCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 rounded-full bg-foreground px-1.5 text-[10px] text-background">
              {wishlistCount}
            </span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onOpenCart}
          aria-label="Rental cart"
        >
          <ShoppingBag />
          {cartCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 rounded-full bg-gold px-1.5 text-[10px] text-gold-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </div>

      <LocationPickerDialog
        open={locationOpen}
        onOpenChange={setLocationOpen}
          {...(location ? { initialLocation: location } : {})}
        onLocationSelect={(selected) => {
          onLocationChange?.(selected);
          setLocationOpen(false);
        }}
      />

      <Dialog open={voiceOpen} onOpenChange={(open) => { setVoiceOpen(open); if (!open) recognitionRef.current?.stop(); }}>
        <DialogContent className="rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{listening ? "Listening for your search" : "Voice search"}</DialogTitle>
            <DialogDescription>Say a designer, garment, category, or event. Your words will be submitted when speech ends.</DialogDescription>
          </DialogHeader>
          <div className="flex h-24 items-center justify-center gap-1 border border-border bg-muted/40" aria-live="polite">
            {Array.from({ length: 18 }, (_, index) => <span key={index} className={`w-1 rounded-full bg-gold ${listening ? "animate-pulse" : "h-2"}`} style={listening ? { height: `${12 + ((index * 17) % 48)}px`, animationDelay: `${index * 35}ms` } : undefined} />)}
          </div>
          <Button type="button" variant="outline" className="rounded-none" onClick={() => { recognitionRef.current?.stop(); setVoiceOpen(false); }}>Cancel</Button>
        </DialogContent>
      </Dialog>

    </header>
  );
}
