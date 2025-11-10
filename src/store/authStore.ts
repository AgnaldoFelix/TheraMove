import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

// Usuários mockados para teste de diferentes roles
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    email: 'admin@tita.com',
    password: 'admin123',
    name: 'Admin Sistema',
    role: 'admin',
  },
  {
    id: '2',
    email: 'clinica@tita.com',
    password: 'clinica123',
    name: 'Gestor Clínica',
    role: 'clinic_admin',
    clinicId: 'clinic1',
  },
  {
    id: '3',
    email: 'profissional@tita.com',
    password: 'prof123',
    name: 'Dr. Carlos Santos',
    role: 'professional',
    clinicId: 'clinic1',
  },
  {
    id: '4',
    email: 'responsavel@tita.com',
    password: 'resp123',
    name: 'Maria Oliveira',
    role: 'family',
  },
];
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Verificar credenciais contra os usuários mockados
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      set({ user: userWithoutPassword, isAuthenticated: true });
    } else {
      throw new Error('Credenciais inválidas');
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
