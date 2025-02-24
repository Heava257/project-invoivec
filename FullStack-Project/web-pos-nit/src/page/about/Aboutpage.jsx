
import React from "react";
// import Banner from "../assets/img/bannerpetronas.jpg";
// import BannerPic from "../assets/img/banner.jpg";
const AboutHomepage = () => {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">PETRONAS</h1>
        <div className="nav-links">
          <a href="#">Business</a>
          <a href="#">Products and Services</a>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Contact Us</a>
          <button className="sign-in">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <img
          src="https://cdn.pli-petronas.com/styles/image_1440x714/s3/2024-10/PE-3287_Planejamento_-_Campanha_Digital_Syntium_Banner_Site_1920x713_V1.jpg?VersionId=3hfFCTaVqTUHd3720jM6neGTlYBUBd75&itok=mndNjw0r"
          alt="Petronas Plant"
          className="hero-image"
        />
      </div>

      {/* Key Initiatives */}
      <div className="initiatives">
        <div className="initiative">
          <img src="https://s.wsj.net/public/resources/images/BN-MD849_PETRON_J_20160118221007.jpg" alt="Sustainable Development" />
          <h3 className="title">Sustainable Development</h3>
          <p className="text">
            We are committed to improving lives and uplifting communities through
            our sustainable development initiatives.
          </p>
        </div>
        <div className="initiative">
          <img src="https://s.wsj.net/public/resources/images/BN-MD849_PETRON_J_20160118221007.jpg" alt="Community Engagement" />
          <h3 className="title" >Community Engagement</h3>
          <p className="text">
            We strive to build meaningful relationships with local communities
            and empower them to thrive.
          </p>
        </div>
        <div className="initiative">
          <img src="https://s.wsj.net/public/resources/images/BN-MD849_PETRON_J_20160118221007.jpg" />
          <h3 className="title" >Local Talent Development</h3>
          <p className="text">
            We believe in the potential of local talent and are dedicated to
            nurturing their capabilities.
          </p>
        </div>
      </div>


      {/* Products and Services */}
      <div className="products-services">
        <h2 className="title_intitative">Our Products and Services</h2>
        <button className="explore-more">Explore More</button>
        <div className="products-list">
          <div className="product">
            <img src="https://www.oil-store.co.uk/wp-content/uploads/2022/02/71501-URANIA-5000-F-5W30-5L-1600X800.jpg" alt="Retail Business" />
            <h4 className="title">Retail Business</h4>
            <p className="text">
              From fuels to convenience shopping, we offer a variety of products
              and services at our retail outlets.
            </p>
          </div>
          <div className="product">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUFEXGwebF6u7SLviHR9FmBSe4tT71CRrrLw&s" alt="Commercial Business" />
            <h4 className="title">Commercial Business</h4>
            <p className="text">
              We provide a range of fuel and lubricant solutions to help
              businesses operate more efficiently.
            </p>
          </div>
          <div className="product">
            <img src="https://eshop-best-chemical.com/cdn/shop/products/Syntium800-5W-30.png?v=1642577279&width=1920" alt="Lubricants" />
            <h4 className="title" >Lubricants</h4>
            <p className="text">
              Our range of lubricants is designed to protect engines and
              machinery, improve performance and reduce downtime.
            </p>
          </div>
          <div className="product">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxc_oKdLkfU_mHo3M8FPgL7PS0tRAC7acvDA&s" alt="LPG" />
            <h4 className="title">LPG</h4>
            <p className="text">
              We supply liquefied petroleum gas (LPG) for residential,
              commercial, and industrial applications.
            </p>
          </div>
        </div>
      </div>

      {/* Latest News */}
      <div className="latest-news">
        <h2 className="title_intitative">Latest from PETRONAS</h2>
        <div className="news-list">
          <div className="news-item">
            <img src="https://i.pinimg.com/736x/86/62/8d/86628d7a89bef00a992f288dcabcea24.jpg" alt="News 1" />
            <h4 className="title">PETRONAS to supply LNG to CNOOC</h4>
            <p className="text">
              PETRONAS has signed a long-term sales and purchase agreement to
              supply LNG to China National Offshore Oil Corporation (CNOOC).
            </p>
          </div>
          <div className="news-item">
            <img src="https://i.pinimg.com/736x/41/3b/ce/413bce48d4d33ecc8387d203bc1389d9.jpg" alt="News 2" />
            <h4 className="title">PETRONAS Wins Best International Oil & Gas Company</h4>
            <p className="text">
              PETRONAS has been named the Best International Oil & Gas Company
              at the Energy Voice Gold Awards 2022.
            </p>
          </div>
          <div className="news-item">
            <img src="https://minaletattersfield.com/images/petronas_news_01-20130726102500h.jpg" alt="News 3" />
            <h4 className="title">PETRONAS Expands Footprint in China</h4>
            <p className="text">
              PETRONAS has acquired a 49% equity stake in the Yuedong LNG
              terminal in China.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2023 PETRONAS</p>
        <div className="footer-links">
          <a href="#">Privacy Notice</a>
          <a href="#">Terms of Use</a>
          <a href="#">Accessibility</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default AboutHomepage;