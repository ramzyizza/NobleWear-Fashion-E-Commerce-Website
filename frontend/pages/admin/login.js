import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { postData } from "../../utils/services";
import { server } from "../../utils/server";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("adminCredential")
    ) {
      router.push("/");
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await postData(`${server}/login`, {
        EMAIL: data.email,
        PASSWORD: data.password,
      });

      console.log(res);

      if (res.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("adminCredential", JSON.stringify(res));
        }
        router.push("/admin");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="admin-layout">
      <h1 className="adminLogin">Admin Login</h1>
      {errorMessage && <p className="message message--error">{errorMessage}</p>}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && errors.email.type === "required" && (
            <p className="message message--error">This field is required</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="message message--error">Please write a valid email</p>
          )}
        </div>
        <div className="form__input-row">
          <input
            className="form__input"
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="message message--error">This field is required</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn--rounded btn--yellow btn-submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
