import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="public/logo.png"
          className={styles.logoImage}
          alt="Cineverse logo"
        />
      </div>

      <button
        className={styles.burgerButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span
          className={`${styles.burgerLine} ${isMenuOpen ? styles.open : ""}`}
        ></span>
        <span
          className={`${styles.burgerLine} ${isMenuOpen ? styles.open : ""}`}
        ></span>
        <span
          className={`${styles.burgerLine} ${isMenuOpen ? styles.open : ""}`}
        ></span>
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={styles.hoverUnderlineAnimation}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              onClick={() => setIsMenuOpen(false)}
              className={styles.hoverUnderlineAnimation}
            >
              Films
            </Link>
          </li>
          <li>
            <Link
              to="/actors"
              onClick={() => setIsMenuOpen(false)}
              className={styles.hoverUnderlineAnimation}
            >
              Acteurs
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Se déconnecter
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
