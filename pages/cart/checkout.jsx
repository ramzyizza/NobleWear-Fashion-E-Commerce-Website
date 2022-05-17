import Layout from '../../layouts/Main';
import { useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import CheckoutItems from '../../components/checkout/items';
import { useRef } from 'react';


const CheckoutPage = () => {

  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }

    return totalPrice;
  })

  const submitPayment = useRef(null); 

  const handleClick = (e) => {
    submitPayment.current?.click();
    
    console.log('triggerred')
  }

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
                <button className="btn btn--rounded btn--yellow">Log in</button>
                <button className="btn btn--rounded btn--border">Sign up</button>
              </div>

              <div className="block">
                <h3 className="block__title">Shipping information</h3>
                <form className="form" action="https://row-shop.herokuapp.com/get-token/" method="GET">
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input className="form__input form__input--sm" name="email" refs="email" type="email" placeholder="Email" required/>
                    </div>

                    <div className="form__col">
                      <input className="form__input form__input--sm" name="address" type="text" placeholder="Address" />
                    </div>
                  </div>
                  
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input className="form__input form__input--sm" name="name" type="text" placeholder="First name" />
                    </div>

                    <div className="form__col">
                      <input className="form__input form__input--sm" type="text" placeholder="City" />
                    </div>
                  </div>
                  
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input className="form__input form__input--sm" type="text" placeholder="Last name" />
                    </div>

                    <div className="form__col">
                      <input className="form__input form__input--sm" type="text" placeholder="Postal code / ZIP" />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input className="form__input form__input--sm" name="phone" type="text" placeholder="Phone number" />
                      <input type="hidden" name="amount" value={priceTotal}/>

                    </div>

                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select>
                          <option>Country</option>
                          <option value="Indonesia">Indonesia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                   <button ref={submitPayment} style={{display: "none"}} type="submit" className="btn pay btn--rounded btn--yellow">Proceed to payment 2</button>
                </form>
              </div>
            </div>
            
            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Payment method</h3>
                <ul className="round-options round-options--three">
                  <li className="round-item">
                    <img src="/images/logos/new/credit_card.png" alt="cc" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/new/bank_transfer.png" alt="bank transfer" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/new/gopay.png" alt="gopay" />
                  </li>
                  <li className="round-item">
                    <img src="/images/logos/new/shopee_pay.png" alt="shopee pay" />
                  </li>
               
                </ul>
              </div>
              
              <div className="block">
                <h3 className="block__title">Delivery method</h3>
                <ul className="round-options round-options--two">
                  <li className="round-item round-item--bg">
                    <img src="/images/logos/new/sicepat.png" alt="sicaepat" />
                    {/* <p>$20.00</p> */}
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
            <a href="/cart" className="cart__btn-back"><i className="icon-left"></i> Back</a>
            <div className="cart-actions__items-wrapper">
              <button type="button" className="btn btn--rounded btn--border">Continue shopping</button>
              <button onClick={handleClick} type="button" className="btn btn--rounded btn--yellow">Proceed to payment</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
};

  
export default CheckoutPage