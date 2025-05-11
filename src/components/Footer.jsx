
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Kundtjänst:</h4>
        <p>079990022</p>
      </div>

      <div className="footer-section">
        <h4>Butik address:</h4>
        <p>Södra hamngatan 8 Göteborg</p>
      </div>

      <div className="footer-section">
        <button className="admin-button" onClick={handleAdminClick}>
          Admin
        </button>
      </div>
    </footer>
  );
};

export default Footer;