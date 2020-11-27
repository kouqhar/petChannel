import React from "react";

import "../../App.css";

const Footer = () => {
  return (
    <footer className="devFooter">
      <p>Copyright &copy;{new Date().getFullYear()} Pet Channel</p>
      <p>
        <a
          className="text-white p-1 m-2"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram fa-2x"></i>
        </a>
        <a
          className="text-white p-1 m-2"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a
          className="text-white p-1 m-2"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <br />
        Duniya Naphtali K.
      </p>
    </footer>
  );
};

export default Footer;
