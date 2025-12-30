import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { showSuccess, showError } from '@/utils/toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('cliente');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        role: role
      });
      showSuccess('Conta criada! Verifique seu e-mail para confirmar.');
      navigate('/login');
    } catch (error: any) {
      showError(error.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-surface-dark p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Criar conta</h1>
          <p className="text-slate-500 dark:text-slate-400">Junte-se ao Geladinhos Gourmet</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input placeholder="João" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Sobrenome</Label>
              <Input placeholder="Silva" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label>E-mail</Label>
            <Input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Tipo de Conta</Label>
            <Select value={role} onValueChange={(v: UserRole) => setRole(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="motoboy">Entregador (Motoboy)</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Senha</Label>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? 'Criando...' : 'Criar conta'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Já tem conta? <Link to="/login" className="text-primary font-bold">Entrar</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;