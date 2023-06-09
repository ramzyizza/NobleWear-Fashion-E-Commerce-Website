import { useRouter } from "next/router";
import LayoutSuccess from "../layouts/success";

const SuccessPage = () => {
  return (
    <LayoutSuccess>
      <section className="error-page">
        <div className="container">
          <h1>Transaction Succesful</h1>
          <p>
            Thank You for Your Purchase! Your Order Has Been Confirmed and
            Payment Processed.
          </p>
          <a href="/" className="btn btn--rounded btn--yellow">
            Go Back to Homepage
          </a>
        </div>
      </section>
    </LayoutSuccess>
  );
};

export default SuccessPage;
