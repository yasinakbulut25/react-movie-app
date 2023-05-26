import React from "react";
import { Link } from "react-router-dom";
import "./error.scss";

function Error() {
  return (
    <div className="error-container">
      <section className="section">
        <div className="section-title">
          <h2 className="title">
            <i className="bi bi-exclamation-circle"></i> Page Not Found
          </h2>
          <div className="line"></div>
        </div>
        <h1 className="error-title">404</h1>
        <Link className="error-link" to="/">
          <i className="bi bi-arrow-left"></i> Back to Site
        </Link>
      </section>
    </div>
  );
}

export default Error;
