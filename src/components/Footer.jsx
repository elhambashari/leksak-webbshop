

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Kundtjänst:</h4>
        <p>079990022</p>
      </div>

      <div className="footer-section">
        <h4>Butik address:</h4>
        <p>Södra hamngatan 8</p>
      </div>

      <div className="footer-section">
        <button
          className="admin-button"
          onClick={() => window.location.href = "/admin"}
        >
          Admin
        </button>
      </div>
    </footer>
  );
};

export default Footer;
