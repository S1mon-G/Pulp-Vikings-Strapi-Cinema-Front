import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>Tableau de bord</h1>
          <button onClick={handleLogout} className="logout-btn">
            Se déconnecter
          </button>
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <h2>{user.username}</h2>
            <p className="user-email">{user.email}</p>
            <div className="user-badges">
              {user.confirmed && (
                <span className="badge badge-success">✓ Confirmé</span>
              )}
              {!user.blocked && (
                <span className="badge badge-info">Actif</span>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="info-card">
            <h3>🎬 Bienvenue sur Pulp Vikings Cinema</h3>
            <p>
              Vous êtes maintenant connecté ! Cette page est protégée et
              accessible uniquement aux utilisateurs authentifiés.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">ID: {user.id}</div>
              <div className="stat-label">Identifiant</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {user.confirmed ? '✓' : '✗'}
              </div>
              <div className="stat-label">Compte vérifié</div>
            </div>
          </div>

          <div className="action-section">
            <h3>Actions disponibles</h3>
            <p>
              Vous pouvez maintenant utiliser toutes les fonctionnalités de
              l'application. Votre token JWT est stocké et sera utilisé pour
              toutes les requêtes authentifiées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;