import "./Homepage.css";
import storyImg from "../assets/Story.jpg";
import featureImg from "../assets/room1.jpg";
import contactImg from "../assets/contact-photo.jpg";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="hero">
        <div className="slideshow">
          <div className="slide"></div>
          <div className="slide"></div>
          <div className="slide"></div>
        </div>
        <div className="hero-content">
          <p className="welcome">Welcome to Dormifind 🏠</p>
          <h1>
            Find the perfect dorm
            <br />
            near your school
          </h1>
        </div>
      </div>

      <section className="summary-section about-summary">
        <div className="fullscreen-section image-right">
          <div className="text-content">
            <h2>Our Story</h2>
            <p>
              DormiFind started as a student-led initiative aiming to make dorm-hunting less
              stressful and more secure. Inspired by the challenges many students face,
              our team envisioned a platform that brings both convenience and trust to
              the student housing experience. This project reflects our passion for
              problem-solving through technology.
            </p>
          </div>
          <img src={storyImg} alt="Founders discussing DormiFind idea" className="section-img" />
        </div>
      </section>

      <section className="summary-section listings-summary">
  <div className="fullscreen-section image-right">
    <img src={featureImg} alt="Featured dorm room listing" className="section-img" />
    <div className="text-content">
      <h2>Featured Listings</h2>
      <p>
        Discover top-rated dorms tailored to your needs. Our featured listings highlight
        trusted spaces with verified reviews, convenient locations, and student-friendly pricing.
        Find your next home away from home with ease.
      </p>
      <a href="/public-listings" className="view-listings-button">
        View Listings
      </a>
    </div>
  </div>
</section>


      <section className="summary-section reviews-summary">
        <div className="fullscreen-section image-right">
          <div className="text-content reviews-summary-content">
            <h2>What People Are Saying</h2>
            <p>
              Read honest reviews from other students who have found and stayed in dorms listed on Dormifind.
            </p>

            <div className="featured-review-card">
              <div className="stars">★★★★☆</div>
              <div className="date">March 12, 2025</div>
              <p className="comment">
                "Dormifind made finding a place so easy! The reviews were super helpful, and the dorm I stayed at was clean and affordable."
              </p>
            </div>

            <div className="review-prompt">Want to leave a review?</div>
            <a href="/reviews" className="review-button">Go to Reviews</a>
          </div>
        </div>
      </section>

      <section className="summary-section contact-summary">
        <div className="fullscreen-section image-left">
          <div className="text-content">
            <h2>Need Help? List Your Dorm with Us</h2>
            <p>
              Whether you're a tenant or property owner, easily manage your dorm listings by logging in. 
              Need assistance or have questions? We're here to help!
            </p>

            <a href="/contacts" className="contact-button" aria-label="Go to Contact Page">
              Contact Us
            </a>
          </div>
          <img src={contactImg} alt="Dormifind support team" className="section-img" />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
