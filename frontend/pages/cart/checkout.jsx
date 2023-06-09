import { useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../layouts/Main";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";

const CheckoutPage = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [grossAmount, setGrossAmount] = useState(0);
  const priceTotal = useSelector((state) => state.cart.cartItems);
  const submitPayment = useRef(null);

  const handleClick = () => {
    const transactionToken = data.transactionToken;
    const amount = data.amount;
    const currency = data.currency;
    const orderId = data.orderId;

    window.snap.pay({
      token: transactionToken,
      amount: grossAmount,
      currency: currency,
      orderId: orderId,
      // Other configuration options for the payment gateway
    });
  };

  useEffect(() => {
    const x = priceTotal.reduce((a, b) => a + b.price * b.count, 0);
    setGrossAmount(x);
  }, [priceTotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const bodyA = Object.fromEntries(formData.entries());
    bodyA.amount = grossAmount;

    const response = await fetch("/api/transaction", {
      method: "POST",
      body: JSON.stringify(bodyA),
    });
    const data = await response.json();
    console.log(data);

    const redirectUrl = data.redirect_url;

    window.snap.pay(data.transactionToken, {
      onSuccess: function (result) {
        console.log("success");
        console.log(result);
        localStorage.removeItem("persist:shoppingcart");
        router.push("/success");
      },
      onPending: function (result) {
        console.log("pending");
        console.log(result);
        router.push("/pending");
      },
      onError: function (result) {
        console.log("error");
        console.log(result);
        router.push("/error");
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
    const myMidtransClientKey = "	SB-Mid-client-CHb7th0aw5AyevMF";
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

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
              <div className="block">
                <h3 className="block__title">Shipping information</h3>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        name="email"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
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
                        value={data.address}
                        onChange={(e) =>
                          setData({ ...data, address: e.target.value })
                        }
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
                        value={data.firstName}
                        onChange={(e) =>
                          setData({ ...data, firstName: e.target.value })
                        }
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="City"
                        name="city"
                        id="city"
                        value={data.city}
                        onChange={(e) =>
                          setData({ ...data, city: e.target.value })
                        }
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
                        value={data.lastName}
                        onChange={(e) =>
                          setData({ ...data, lastName: e.target.value })
                        }
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        id="postalCode"
                        placeholder="Postal code / ZIP"
                        value={data.postalCode}
                        onChange={(e) =>
                          setData({ ...data, postalCode: e.target.value })
                        }
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
                        value={data.phone}
                        onChange={(e) =>
                          setData({ ...data, phone: e.target.value })
                        }
                      />
                      <input
                        type="hidden"
                        name="totalPrice"
                        id="amount"
                        value={grossAmount}
                      />
                    </div>

                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select
                          value={data.country}
                          onChange={(e) =>
                            setData({ ...data, country: e.target.value })
                          }
                          id="country"
                        >
                          <option>Country</option>
                          <option value="Indonesia">Indonesia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
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
                <h3>Rp. {grossAmount}</h3>
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
