import LayoutError from '../layouts/404';

const ErrorPage = () => (
  <LayoutError>
    <section className="error-page">
      <div className="container">
        <h1>Page Not Found!</h1>
        <p>Sorry, Looks like this page doesn't exist yet</p>
        <a href="#" className="btn btn--rounded btn--yellow">Go to homepage</a>
      </div>
    </section>
  </LayoutError>
)

export default ErrorPage