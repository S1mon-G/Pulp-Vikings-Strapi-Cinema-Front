/**
 * Système de cache générique avec TTL (Time To Live)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class Cache {
  private cache: Map<string, CacheEntry<unknown>>;
  private ttl: number;

  constructor(ttlMinutes: number = 5) {
    this.cache = new Map();
    this.ttl = ttlMinutes * 60 * 1000; // Convertir en millisecondes
  }

  /**
   * Récupère une valeur du cache si elle existe et n'est pas expirée
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Vérifier si l'entrée est expirée
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Stocke une valeur dans le cache
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Supprime une clé spécifique du cache
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Vide tout le cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Supprime toutes les entrées expirées
   */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > this.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => this.cache.delete(key));
  }
}

// Instance singleton du cache avec TTL de 5 minutes
export const apiCache = new Cache(5);

// Cleanup automatique toutes les 10 minutes
if (typeof window !== "undefined") {
  setInterval(() => apiCache.cleanup(), 10 * 60 * 1000);
}
