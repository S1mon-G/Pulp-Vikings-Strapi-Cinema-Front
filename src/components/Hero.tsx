import { Search } from "lucide-react"
import styles from "./Hero.module.css"

export default function Hero() {
    return (
        <>
            <section className={styles.hero}>
                <p>
                    Tous les films. Toutes les stars. Une seule plateforme.
                </p>
                <form className={styles.searchbarWrapper}>
                    <input type="search" className={styles.searchbar} placeholder="recherchez par film, par acteur..." />
                    <button type="submit" className={styles.searchButton}><Search /></button>
                </form>
            </section>

        </>
    )
}