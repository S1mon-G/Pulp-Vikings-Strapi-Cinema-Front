import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  // État local pour gérer les formulaires
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Gère la soumission du formulaire (connexion ou inscription)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login({ identifier: email, password });
      } else {
        await register({ username, email, password });
      }
      // Redirige vers la page d'accueil après succès
      navigate('/');
    } catch (err: any) {
      // Affiche l'erreur retournée par l'API
      setError(
        err.response?.data?.error?.message || 
        'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        {/* Logo */}
        <img 
          src="/public/img/Logo CINEVERSE avec dégradé vibrant.png" 
          alt="Cineverse Logo" 
          className={styles.authLogo}
        />

        <div className={styles.authHero}>
          <h1 className={styles.authHeroTitle}>
            Plongez dans l'univers du cinéma
          </h1>
          <p className={styles.authHeroSubtitle}>
            Des milliers de films, d'acteurs et de critiques à portée de main. 
            Rejoignez Cineverse gratuitement et explorez le 7ème art comme jamais.
          </p>
        </div>

        {/* Boîte d'authentification */}
        <div className={styles.authBox}>
          {/* Onglets pour basculer entre connexion et inscription */}
          <div className={styles.authTabs}>
            <button
              className={`${styles.authTab} ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Connexion
            </button>

            <button
              className={`${styles.authTab} ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Inscription
            </button>
          </div>

          <div className={styles.authFormContainer}>
            <h2>{isLogin ? 'Bon retour !' : 'Créez votre compte'}</h2>

            {/* Affiche l'erreur si elle existe */}
            {error && (
              <div className={`${styles.authAlert} ${styles.authAlertError}`}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Champ username : uniquement pour l'inscription */}
              {!isLogin && (
                <div className={styles.authFormGroup}>
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    placeholder="john_doe"
                  />
                </div>
              )}

              {/* Champ email (ou identifier pour la connexion) */}
              <div className={styles.authFormGroup}>
                <label htmlFor="email">
                  {isLogin ? 'Email ou nom d\'utilisateur' : 'Email'}
                </label>
                <input
                  type={isLogin ? 'text' : 'email'}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder={isLogin ? 'john@example.com ou john_doe' : 'john@example.com'}
                />
              </div>

              {/* Champ mot de passe */}
              <div className={styles.authFormGroup}>
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                />
              </div>

              {/* Bouton submit */}
              <button
                type="submit"
                className={styles.authBtn}
                disabled={loading}
              >
                {loading
                  ? (isLogin ? 'Connexion...' : 'Inscription...')
                  : (isLogin ? 'Se connecter' : 'S\'inscrire gratuitement')
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;