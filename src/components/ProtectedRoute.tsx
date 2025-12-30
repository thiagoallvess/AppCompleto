import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Se não houver usuário e não estiver mais carregando, vai para login
  if (!loading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se estiver carregando e ainda não temos o usuário, mostra o loading
  if (loading && !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500 animate-pulse">Verificando acesso...</p>
      </div>
    );
  }

  // Se o usuário existe mas o perfil ainda está carregando (e temos restrição de role)
  if (user && !profile && loading && allowedRoles) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500">Sincronizando perfil...</p>
      </div>
    );
  }

  // Se houver restrição de roles e o perfil já carregou
  if (allowedRoles && profile) {
    const userRole = profile.role || 'cliente';
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;