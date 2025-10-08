// TODO: Add image display
// TODO: Add onClick handler for product details
// TODO: Add "Add to Cart" button
// TODO: Add stock status display
// TODO: Add sale price styling
// TODO: Add product category badge

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div>
      <p>{product.name}</p>
      <p>${product.price}</p>
    </div>
  );
}