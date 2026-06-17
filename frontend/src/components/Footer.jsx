import React from "react";

const Footer = () => {
  return (
    <footer
      className="py-2"
      style={{
        background: "#0f172a",
      }}
    >
      <div className="container text-center text-white">

        <h6 className="mb-1 fw-bold">
          <i className="fas fa-wallet me-2"></i>
          Daily Expense Tracker
        </h6>

        <div className="mb-1">
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="text-white mx-2"
          >
            <i className="fab fa-whatsapp"></i>
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="text-white mx-2"
          >
            <i className="fab fa-instagram"></i>
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-white mx-2"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <small style={{ fontSize: "12px" }}>
          © 2026 | Developed by <strong>Vishakha Pawar</strong>
        </small>

      </div>
    </footer>
  );
};

export default Footer;