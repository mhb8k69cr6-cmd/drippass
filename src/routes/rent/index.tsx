import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/drippass/ProductCard";
import { PRODUCTS } from "@/data/products";

export const Route = createFileRoute("/rent/")({
  head: () => ({
    meta: [
      { title: "Rent Designer Fits | DRIPPASS" },
      { name: "description", content: "Browse designer outfits available to rent from DRIPPASS." },
    ],
  }),
  component: RentCollection,
});

function RentCollection() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <a href="/" className="text-xs tracking-luxe text-muted-foreground hover:text-foreground">
          DRIPPASS / HOME
        </a>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs tracking-luxe text-muted-foreground">THE ROTATION</p>
            <h1 className="mt-2 font-display text-4xl">Rent the look.</h1>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Designer pieces, professionally prepared and priced by the rental day.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              href={`/rent/${product.slug}`}
              saved={false}
              onSave={() => undefined}
              onOpen={() => undefined}
              onTryOn={() => undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
