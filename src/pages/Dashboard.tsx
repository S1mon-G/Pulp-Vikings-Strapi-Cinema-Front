import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) return null;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardCard}>
        <div className={styles.dashboardHeader}>
          <h1>Tableau de bord</h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Se déconnecter
          </button>
        </div>

        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <h2>{user.username}</h2>
            <p className={styles.userEmail}>{user.email}</p>
            <div className={styles.userBadges}>
              {user.confirmed && (
                <span className={`${styles.badge} ${styles.badgeSuccess}`}>✓ Confirmé</span>
              )}
              {!user.blocked && (
                <span className={`${styles.badge} ${styles.badgeInfo}`}>Actif</span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.dashboardContent}>
          <div className={styles.infoCard}>
            <h3>🎬 Bienvenue sur Pulp Vikings Cinema</h3>
            <p>
              Vous êtes maintenant connecté ! Cette page est protégée et
              accessible uniquement aux utilisateurs authentifiés.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>ID: {user.id}</div>
              <div className={styles.statLabel}>Identifiant</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {user.confirmed ? '✓' : '✗'}
              </div>
              <div className={styles.statLabel}>Compte vérifié</div>
            </div>
          </div>

          <div className={styles.actionSection}>
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