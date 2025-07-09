import "./About.css";
import aboutImg from "../assets/aboutus.jpg";
import missionImg from "../assets/goal.jpg";
import storyImg from "../assets/Story.jpg";
import developerPhoto from "../assets/Blaise.jpg";
import teammate1Photo from "../assets/Shane.jpg";
import teammate2Photo from "../assets/Whyzl.jpg";

const About = () => {
  return (
    <div className="about-page">
      <div className="fullscreen-section image-right">
        <div className="text-content">
          <h2>About Us</h2>
          <p>
            DormiFind is a dedicated online platform created to simplify the process
            of finding reliable and affordable dormitories or boarding houses,
            especially for students in our hometown. Whether you're relocating for
            school or looking for a more convenient place to stay, DormiFind connects
            you with trusted local listings to help you make informed decisions.
          </p>
        </div>
        <img src={aboutImg} alt="About Us" className="section-img" />
      </div>

      <div className="fullscreen-section image-left">
        <img src={missionImg} alt="Our Mission" className="section-img" />
        <div className="text-content">
          <h2>Our Mission</h2>
          <p>
            To empower students with easy access to verified accommodations, promote
            safety and comfort, and support local landlords by providing a reliable
            platform to showcase their spaces.
          </p>
        </div>
      </div>

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
        <img src={storyImg} alt="Our Story" className="section-img" />
      </div>

      <div className="fullscreen-section developer-section">
        <h2>Meet the Team</h2>
        <div className="profile-card">
          <img src={developerPhoto} alt="Developer" />
          <div>
            <h4>Blaise Tyrel B. Daga</h4>
            <p>Lead Developer | BS in Information Systems</p>
            <p>
              Passionate about technology and student-centered solutions, I helped
              create DormiFind to make housing easier and safer for fellow students.
            </p>
          </div>
        </div>

        <div className="team-grid">
          <div className="team-member">
            <img src={teammate1Photo} alt="Teammate 1" />
            <h4>Shane B. Bobis</h4>
            <p>Frontend Developer</p>
          </div>
          <div className="team-member">
            <img src={teammate2Photo} alt="Teammate 2" />
            <h4>Whyzl V. Salarda</h4>
            <p>Frontend Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
