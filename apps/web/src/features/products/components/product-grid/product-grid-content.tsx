import { getProducts } from "../../queries";
import { ProductCarousel } from "./product-carousel";
import { ProductItem } from "./product-item";

interface ProductGridContentProps {
  dictionary: {
    title: string;
    description: string;
    featuredCarousel: string;
    addToCart: string;
    addingToCart: string;
    addedToCart: string;
    inStock: string;
    outOfStock: string;
    price: string;
  };
}

export async function ProductGridContent({
  dictionary,
}: ProductGridContentProps) {
  const products = await getProducts();

  return (
    <div className="space-y-10">
      {products.length > 0 && (
        <ProductCarousel
          products={products}
          title={dictionary.featuredCarousel}
        />
      )}

      <div>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
          {dictionary.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              dictionary={dictionary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
