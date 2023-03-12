import React, { useEffect } from "react";
import useConnection from "@/hooks/useConnection";

function Navbar() {
  const connection = useConnection();

  useEffect(() => {
    connection.connect();
  }, []);

  return (
    <div className="container">
      <nav className="navbar navbar-light navbar-expand-md py-3">
        <div className="container">
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-3"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-3">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href={`/profile?user=${connection.address}`}
                >
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/marketplace">
                  Marketplace
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/mint">
                  Mint
                </a>
              </li>
            </ul>
            <button className="btn btn-primary" type="button">
              Connect
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
