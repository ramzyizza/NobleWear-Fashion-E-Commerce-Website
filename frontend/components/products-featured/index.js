import ProductsCarousel from "./carousel";
import useSwr from "swr";

const ProductsFeatured = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("http://localhost:5000/products", fetcher);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Our Best Seller Collections</h3>
          <a href="/products" className="btn btn--rounded btn--border">
            Discover More
          </a>
        </header>

        <ProductsCarousel products={data} />
      </div>
    </section>
  );
};

export default ProductsFeatured;
