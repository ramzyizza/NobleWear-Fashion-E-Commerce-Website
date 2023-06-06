import { useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Reviews from "../../components/product-single/reviews";
import { server } from "../../utils/server";

export async function getServerSideProps({ query }) {
  const pid = query.pid;
  const res = await fetch(`http://localhost:5000/products?PRODUCT_ID=${pid}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}

const Product = ({ product }) => {
  const [showBlock, setShowBlock] = useState("description");

  return (
    <Layout>
      <Breadcrumb currentPage={product.data[0].name} />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.data[0].product_image} />
            <Content product={product.data[0]} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Reviews (2)
              </button>
            </div>

            <Description
              product={product.data[0]}
              show={showBlock === "description"}
            />
            {/* <Reviews product={product} show={showBlock === "reviews"} /> todos */}
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;

// todos:
//  color
//  size
//  review
