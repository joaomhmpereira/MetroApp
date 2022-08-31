import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header(){
    const location = useLocation();

    var homeClass = "nav-link";
    var aboutClass = "nav-link";
    
    switch (location.pathname) {
        case "/":
            homeClass += " active"
            break;

        case "/about":
            aboutClass += " active"
            break;
        default:
            break;
    }
    
    return (
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3">
                    <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-train-front" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M5.621 1.485c1.815-.454 2.943-.454 4.758 0 .784.196 1.743.673 2.527 1.119.688.39 1.094 1.148 1.094 1.979V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V4.583c0-.831.406-1.588 1.094-1.98.784-.445 1.744-.922 2.527-1.118Zm5-.97C8.647.02 7.353.02 5.38.515c-.924.23-1.982.766-2.78 1.22C1.566 2.322 1 3.432 1 4.582V13.5A2.5 2.5 0 0 0 3.5 16h9a2.5 2.5 0 0 0 2.5-2.5V4.583c0-1.15-.565-2.26-1.6-2.849-.797-.453-1.855-.988-2.779-1.22ZM5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm0 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm7 1a1 1 0 1 0-1-1 1 1 0 1 0-2 0 1 1 0 0 0 2 0 1 1 0 0 0 1 1ZM4.5 5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h3V5h-3Zm4 0v3h3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-3ZM3 5.5A1.5 1.5 0 0 1 4.5 4h7A1.5 1.5 0 0 1 13 5.5v2A1.5 1.5 0 0 1 11.5 9h-7A1.5 1.5 0 0 1 3 7.5v-2ZM6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3Z"/>
                        </svg>
                        <span className="fs-4">MetroApp</span>
                    </Link>
  
                    <ul className="nav nav-pills">
                        <li className="nav-item"><Link to="/" className={homeClass} aria-current="page">Home</Link></li>
                        <li className="nav-item"><Link to="/about" className={aboutClass}>About</Link></li>
                    </ul>
                </header>
            </div>            
    )
}

export default Header;