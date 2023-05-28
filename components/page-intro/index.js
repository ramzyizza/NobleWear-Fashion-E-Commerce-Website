import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation} from 'swiper';

SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {

  return (
    <section className="page-intro">  
      <Swiper navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide/slide-1.png')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h3>Group 3 Final Project</h3>
                <h2>Workshop on Implementing Software Design | E-Commerce </h2>
              {/* <ul>
              <li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/antonius-t-kurniawan/"
                >
                  • Antonius Teddy Kurniawan - 21/472874/PA/20352
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/fariz-muhammad-ridwan/"
                >
                  • Fariz Muhammad - 21/475103/PA/20528
                </a>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/peter-setiabudi/"
                >
                  • Peter Johan Arkadhira Setiabudi - 21/475025/PA/20510
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/in/putuarva/">
                • Putu Arva Raysendriya Ersuputra - 21/472606/PA/20312
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.linkedin.com/in/ramzyizza/">
                • Ramzy Izza Wardhana - 21/472698/PA/20322
                </a>
              </li>
              </li>
              </li>
            </ul> */}
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide/slide-2.png')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Top-selling Fashion Pieces from Many Prestiguous Brand</h2>
                <a href="#" className="btn-shop"><i className="icon-right"></i>Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide/slide-3.png')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2>Indulge in our exquisite fashion that embodies elegance. </h2>
                <a href="#" className="btn-shop"><i className="icon-right"></i>Shop now</a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="shop-data">
        <div className="container">
          <ul className="shop-data__items">
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>Free Shipping</h4>
                <p>Get your favorite items shipped free!</p>
              </div>
            </li>
            
            <li>
              <i className="icon-shipping"></i>
              <div className="data-item__content">
                <h4>99% Satisfied Customers</h4>
                <p>Our customers' opinions speak for themselves</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4>Original Guaranteed</h4>
                <p>30 days warranty for all products across categories</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
};

export default PageIntro