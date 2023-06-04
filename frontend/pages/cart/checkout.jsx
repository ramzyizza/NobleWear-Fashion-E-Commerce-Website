import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import Link from "next/link";
import Layout from "../../layouts/Main";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { selectTotalPrice } from "../../store/reducers/cart";

const CheckoutPage = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const priceTotal = useSelector((state) => state.cart.cartItems).reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      address: "",
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      postalCode: "",
      country: "",
      amount: priceTotal,
    },

    onSubmit: async (values) => {
      console.log(values);
      const response = await fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
    },
  });

  const submitPayment = useRef(null);

  const handleClick = () => {
    const transactionToken = data.transactionToken;
    const amount = data.amount;
    const currency = data.currency;
    const orderId = data.orderId;

    window.snap.pay({
      token: transactionToken,
      amount: amount,
      currency: currency,
      orderId: orderId,
      // Other configuration options for the payment gateway
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/transaction");
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error("Failed to fetch data from API");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // router.push("/transaction");
    console.log(formik.values);
    const response = await fetch("/api/transaction", {
      method: "POST",
    });
    const data = await response.json();

    const redirectUrl = data.redirect_url;

    window.snap.pay(data.transactionToken, {
      onSuccess: function (result) {
        console.log("success");
        console.log(result);
        router.push("/transaction");
      },
      onPending: function (result) {
        console.log("pending");
        console.log(result);
        router.push("/transaction");
      },
      onError: function (result) {
        console.log("error");
        console.log(result);
        router.push("/transaction");
      },
    });
  };

  useEffect(() => {
    // You can also change below url value to any script url you wish to load,
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    // Optional: set script attribute, for example snap.js have data-client-key attribute
    // (change the value according to your client-key)
    const myMidtransClientKey = "your-client-key-goes-here";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  // Then somewhere else on your React component, `window.snap` global object will be available to use
  // e.g. you can then call `window.snap.pay( ... )` function.

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Shipping and Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              <div className="checkout__btns">
                <Link href="/login" passHref>
                  <span>
                    <button className="btn btn--rounded btn--yellow">
                      Log in
                    </button>
                  </span>
                </Link>
                <Link href="/register" passHref>
                  <span>
                    <button className="btn btn--rounded btn--border">
                      Sign up
                    </button>
                  </span>
                </Link>
              </div>

              <div className="block">
                <h3 className="block__title">Shipping information</h3>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        name="email"
                        refs="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        type="email"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        name="address"
                        type="text"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        placeholder="Address"
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        name="firstName"
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="City"
                        name="city"
                        id="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Last name"
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        id="postalCode"
                        placeholder="Postal code / ZIP"
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        name="phone"
                        type="text"
                        placeholder="Phone number"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      <input type="hidden" name="amount" value={priceTotal} />
                    </div>

                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select
                          value={formik.values.country}
                          onChange={formik.handleChange}
                          id="country"
                        >
                          <option>Country</option>
                          <option value="Indonesia">Indonesia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    ref={submitPayment}
                    type="submit"
                    className="btn pay btn--rounded btn--yellow"
                  >
                    Proceed to payment
                  </button>
                </form>
              </div>
            </div>

            <div className="block">
              <h3 className="block__title">Delivery method</h3>
              <ul className="round-options round-options--two">
                <li className="round-item round-item--bg">
                  <img src="/images/logos/new/sicepat.png" alt="sicaepat" />
                </li>
              </ul>
            </div>
          </div>

          <div className="checkout__col-2">
            <div className="block">
              <h3 className="block__title">Your cart</h3>
              <CheckoutItems />

              <div className="checkout-total">
                <p>Total cost</p>
                <h3>${priceTotal}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-actions cart-actions--checkout">
          <Link href="/cart" passHref className="cart__btn-back">
            <i className="icon-left"></i> Back
          </Link>
          <div className="cart-actions__items-wrapper">
            <button type="button" className="btn btn--rounded btn--border">
              Continue shopping
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
