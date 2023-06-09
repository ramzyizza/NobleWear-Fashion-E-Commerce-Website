import Head from "next/head";
import Header from "../components/Header";
import { useRouter } from "next/router";

const Error = ({ children, title = "Next.js Ecommerce" }) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="app-main">
      <Head>
        <title>Page not found &mdash; {title}</title>
      </Head>

      <Header isSuccessPage />

      <main className={pathname !== "/" ? "main-page" : ""}>{children}</main>
    </div>
  );
};

export default Error;
