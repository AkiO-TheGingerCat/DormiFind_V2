import "./Contacts.css";

const Contact = () => {
  return (
    <div className="contact-layout">
      <div className="contact-image-side"></div>

      <div className="contact-content">
        <h1>Contact Us</h1>
        <p className="intro-text">
          Whether you have a question, suggestion, or want to list your boarding house on our platform — we're here to assist you.
        </p>

        <div className="contact-sections">
          <div className="contact-box">
            <h2>📩 General Inquiries</h2>
            <p>If you have any concerns, feedback, or need assistance, feel free to reach out to us:</p>
            <ul className="contact-info">
              <li><strong>Email:</strong> <a>dormifind.help@gmail.com</a></li>
              <li><strong>Phone:</strong> +63 953 092 6677</li>
              <li><strong>Location:</strong> Aurora, Zamboanga del Sur, Philippines</li>
            </ul>
            <p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dormifind.help@gmail.com&su=General%20Inquiry"
                className="email-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                ✉️ Click here to send us your concerns via Gmail
              </a>
            </p>
          </div>

          <div className="contact-box">
            <h2>🏡 List Your Boarding House</h2>
            <p>To request a listing, kindly send us the following via Gmail:</p>
            <ul className="instructions">
              <li>✔️ High-quality photos of the boarding house</li>
              <li>✔️ Exact address/location</li>
              <li>✔️ Monthly rent and other fees</li>
              <li>✔️ Owner’s name and contact info</li>
            </ul>
            <p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dormifind.help@gmail.com&su=Boarding%20House%20Listing%20Request"
                className="email-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                📧 Click here to list your boarding house via Gmail
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
