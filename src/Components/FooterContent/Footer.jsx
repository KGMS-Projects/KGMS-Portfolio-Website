import React from "react";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer__bar py-4 text-sm text-center text-yellow-600 bg-blue-950 cinzel-font">
        Copyright © {currentYear} KGMS | All rights reserved.
      </div>
    </footer>
  );
}
