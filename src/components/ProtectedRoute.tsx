import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Se ainda estiver carregando a sessão inicial e não tivermos um usuário, mostramos o loading
  if (loading && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500 animate-pulse">Verificando acesso...</p>
      </div>
    );
  }

  // Se não houver usuário autenticado, redireciona para o login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se houver restrição de roles
  if (allowedRoles) {
    // Se o perfil ainda não carregou mas o usuário existe, mostramos um loading breve
    if (!profile && loading) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-slate-500">Sincronizando perfil...</p>
        </div>
      );
    }

    // Se carregou e não tem perfil ou a role não é permitida
    const userRole = profile?.role || 'cliente';
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;