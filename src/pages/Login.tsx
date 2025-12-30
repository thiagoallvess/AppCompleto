import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { showError } from '@/utils/toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/');
    } catch (error: any) {
      showError(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-slate-500 dark:text-slate-400">Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;