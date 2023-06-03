import Layout from "../layouts/Main";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { server } from "../utils/server";
import { postData } from "../utils/services";

const RegisterPage = () => {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log("sini");
    const res = await postData(`${server}/register`, {
      user_firstName: data.firstName,
      user_lastName: data.lastName,
      user_email: data.email,
      user_pass: data.password,
    });

    if (res.success) router.push("/login");
  };

  return (
    <Layout>
      <section className="form-page">
        <div className="container">
          <div className="back-button-section">
            <Link href="/products">
              <i className="icon-left"></i>Back to store
            </Link>
          </div>

          <div className="form-block">
            <h2 className="form-block__title">Create New Account</h2>
            <p className="form-block__description">
              Get access to fashion deals and discounts by Signing up today!
            </p>

            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  ref={register({ required: true })}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  ref={register({ required: true })}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  placeholder="Email"
                  type="text"
                  name="email"
                  ref={register({
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
              </div>

              <div className="form__input-row">
                <input
                  className="form__input"
                  type="Password"
                  placeholder="Password"
                  name="password"
                  ref={register({ required: true })}
                />
              </div>

              <div className="form__info">
                <div className="checkbox-wrapper">
                  <label
                    htmlFor="check-signed-in"
                    className={`checkbox checkbox--sm`}
                  >
                    <input
                      name="signed-in"
                      type="checkbox"
                      id="check-signed-in"
                    />
                    <span className="checkbox__check"></span>
                    <p>
                      I agree to the Google Terms of Service and Privacy Policy
                    </p>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--rounded btn--yellow btn-submit"
              >
                Sign up
              </button>

              <p className="form__signup-link">
                <Link href="/login">Are you already a member?</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisterPage;
