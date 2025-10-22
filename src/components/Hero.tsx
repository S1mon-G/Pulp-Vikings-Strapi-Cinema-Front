import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<{ type: "movie" | "actor"; name: string; id: string }[]>([]);
    const navigate = useNavigate();
    const debounceRef = useRef<number | null>(null);

    const normalize = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const fetchSearchResults = async (query: string, limit = 5) => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}`
        );
        if (!res.ok) throw new Error("Failed to fetch search results");
        const data = await res.json();
        return data.data;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = window.setTimeout(async () => {
            if (!value.trim()) {
                setSuggestions([]);
                return;
            }

            const searchTermNormalized = normalize(value);

            try {
                const results = await fetchSearchResults(searchTermNormalized, 5);
                setSuggestions(results);
            } catch (err) {
                console.error(err);
            }
        }, 300);
    };

    const handleSuggestionClick = (item: { type: "movie" | "actor"; name: string; id: string }) => {
        navigate(item.type === "movie" ? `/movies/${item.id}` : `/actors/${item.id}`);
        setSearchTerm(item.name);
        setSuggestions([]);
    };

    return (
        <section className={styles.hero}>
            <p>Tous les films. Toutes les stars. Une seule plateforme.</p>

            <form className={styles.searchbarWrapper}>
                <input
                    type="search"
                    className={styles.searchbar}
                    placeholder="recherchez par film, par acteur..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className={styles.searchButton}>
                    <Search />
                </button>

                {suggestions.length > 0 && (
                    <div className={styles.suggestions}>
                        {suggestions.map((item) => (
                            <div
                                key={item.id}
                                className={styles.suggestionItem}
                                onClick={() => handleSuggestionClick(item)}
                            >
                                {item.name}{" "}
                                <span className={styles.suggestionType}>({item.type})</span>
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </section>
    );
}
