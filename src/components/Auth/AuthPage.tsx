import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

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
      navigate('/');
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message || 
        'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
          >
            Connexion
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
          >
            Inscription
          </button>
        </div>

        <div className="auth-form-container">
          <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>

          {error && (
            <div className="auth-alert auth-alert-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="auth-form-group">
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

            <div className="auth-form-group">
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

            <div className="auth-form-group">
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

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? (isLogin ? 'Connexion...' : 'Inscription...')
                : (isLogin ? 'Se connecter' : 'S\'inscrire')
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;