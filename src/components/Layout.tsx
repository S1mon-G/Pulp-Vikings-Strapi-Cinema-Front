import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
