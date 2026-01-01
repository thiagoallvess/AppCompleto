import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Se estiver carregando e ainda não temos o usuário básico do Supabase, espera
  if (loading && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500 animate-pulse">Verificando acesso...</p>
      </div>
    );
  }

  // Se não houver usuário autenticado, redireciona para login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se houver restrição de roles e o perfil já carregou, verifica a permissão
  if (allowedRoles && profile) {
    const userRole = profile.role || 'cliente';
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  // Se o usuário está logado mas o perfil ainda está vindo, permitimos a renderização 
  // se não houver restrição de role imediata ou se for uma rota comum
  return <>{children}</>;
};

export default ProtectedRoute;