import useSwr from "swr";
import ProductItem from "./../../product-item";
import ProductsLoading from "./loading";

const ProductsContent = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("http://localhost:5000/products", fetcher);

  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {data.data.map((item, idx) => (
            <ProductItem
              discount={item.discount}
              key={idx}
              id={item.id}
              price={item.price}
              currentPrice={item.currentPrice}
              productImage={item.product_image[0]}
              name={item.name}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
