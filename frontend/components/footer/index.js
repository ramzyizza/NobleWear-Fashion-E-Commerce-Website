import Logo from "../../assets/icons/logo";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <Logo />

            <p>
              This E-Commerce Final project is created to fulfil Workshop on
              Implementing Software Design - MII21-2504.
            </p>
            <ul className="site-footer__social-networks">
              <li>
                <a href="#">
                  <i className="icon-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-youtube-play"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="site-footer__links">
            {/* <ul>
              <li>Shopping online</li>
              <li>
                <a href="#">Order Status</a>
              </li>
              <li>
                <a href="#">Shipping and Delivery</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Payment options</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul> */}
            {/* <ul>
              <li>Information</li>
              <li>
                <a href="#">Gift Cards</a>
              </li>
              <li>
                <a href="#">Find a store</a>
              </li>
              <li>
                <a href="#">Newsletter</a>
              </li>
              <li>
                <a href="#">Bacome a member</a>
              </li>
              <li>
                <a href="#">Site feedback</a>
              </li>
            </ul> */}
            <ul>
              <li>Developers</li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/antonius-t-kurniawan/"
                >
                  • Antonius Teddy Kurniawan
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/fariz-muhammad-ridwan/"
                >
                  • Fariz Muhammad
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/peter-setiabudi/"
                >
                  • Peter Johan Arkadhira Setiabudi
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/in/putuarva/">
                  • Putu Arva Raysendriya Ersuputra
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/ramzyizza/"
                >
                  • Ramzy Izza Wardhana
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>by Noblewear Developers Team - 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
