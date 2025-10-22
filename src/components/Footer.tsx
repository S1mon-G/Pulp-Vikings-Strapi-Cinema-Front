import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img
          src="public/logo.png"
          className={styles.logoImage}
          alt="Cineverse logo"
        />
      </div>
      <div className={styles.centerContent}>
        <ul className={styles.links}>
          <li>
            <a className={styles.link} href="/*">
              contactez-nous
            </a>
          </li>
          <li>
            <a className={styles.link} href="/*">
              mentions légales
            </a>
          </li>
          <li>
            <a className={styles.link} href="/*">
              à propos
            </a>
          </li>
        </ul>
        <p className={styles.copyright}>
          © 2025 Pulp Vikings. All rights reserved.
        </p>
      </div>
      <ul className={styles.socials}>
        <li>
          <a href="/*">
            <img src="public/facebook.png" alt="Facebook icon" />
          </a>
        </li>
        <li>
          <a href="/*">
            <img src="public/twitter.png" alt="Twitter icon" />
          </a>
        </li>
        <li>
          <a href="/*">
            <img src="public/instagram.png" alt="Instagram icon" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
