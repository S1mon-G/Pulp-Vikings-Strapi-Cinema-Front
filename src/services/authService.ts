import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

// ===== INTERFACES TYPESCRIPT =====
// Définissent la structure des données qu'on manipule

// Structure d'un utilisateur
export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;  // Si l'email est confirmé
  blocked: boolean;    // Si le compte est bloqué
}

// Réponse de l'API lors de l'authentification (connexion ou inscription)
export interface AuthResponse {
  jwt: string;
  user: User;
}

// Données nécessaires pour l'inscription
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Données nécessaires pour la connexion
export interface LoginData {
  identifier: string;
  password: string;
}

// ===== CLASSE DE SERVICE D'AUTHENTIFICATION =====
// Centralise toutes les opérations liées à l'authentification

class AuthService {
  // Inscription
  // Envoie une requête POST à l'endpoint d'inscription de Strapi
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/local/register`,
      data
    );
    
    // Si on reçoit un token JWT dans la réponse
    // On sauvegarde le token et l'utilisateur dans le localStorage
    if (response.data.jwt) {
      this.setToken(response.data.jwt);
      this.setUser(response.data.user);
    }
    
    return response.data;
  }

  // Connexion
  // Envoie une requête POST à l'endpoint de connexion de Strapi
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/local`,
      data
    );
    // Si la connexion réussit et qu'on reçoit un token
    // On sauvegarde le token et l'utilisateur dans le localStorage
    if (response.data.jwt) {
      this.setToken(response.data.jwt);
      this.setUser(response.data.user);
    }
    
    return response.data;
  }

  /**
   * RÉCUPÉRER L'UTILISATEUR ACTUEL
   * Demande à Strapi les informations de l'utilisateur connecté
   * Utile pour vérifier que le token est toujours valide
   * @returns Promise avec les infos de l'utilisateur
   * @throws Error si aucun token n'est trouvé
   */
  async getCurrentUser(): Promise<User> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get<User>(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // "Bearer" est le format standard pour les JWT
      },
    });

    return response.data;
  }

  /**
   * DÉCONNEXION
   * Supprime le token et les données utilisateur du localStorage
   * L'utilisateur devra se reconnecter pour accéder aux routes protégées
   */
  logout(): void {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  }

  // Sauvegarder le token
  setToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Sauvegarder l'utilisateur
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Récupérer l'utilisateur
  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Vérifier si connecté
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Requête authentifiée personnalisée
  async authenticatedRequest<T>(
    endpoint: string,
    options: any = {}
  ): Promise<T> {
    const token = this.getToken();
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await axios({
      url: `${API_URL}${endpoint}`,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}

export default new AuthService();