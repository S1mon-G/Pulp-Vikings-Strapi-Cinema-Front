import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={styles.hoverUnderlineAnimation}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/movies" onClick={() => setIsMenuOpen(false)} className={styles.hoverUnderlineAnimation}>
              Films
            </Link>
          </li>
          <li>
            <Link to="/actors" onClick={() => setIsMenuOpen(false)} className={styles.hoverUnderlineAnimation}>
              Acteurs
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className={styles.hoverUnderlineAnimation}
            >
              Connexion
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
