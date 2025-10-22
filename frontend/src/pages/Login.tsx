import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Phone, Lock, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useAuthStore } from '@/stores/authStore';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';
import { clearAllAuthCache } from '@/lib/auth-utils';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuthStore();
  useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    clearAllAuthCache();
    const success = await login(data);

    if (success) {
      const userData = localStorage.getItem('user');
      let redirectUrl = '/';

      if (userData) {
        try {
          const user = JSON.parse(userData);
          const userRole = user.user_role;

          if (['ADMIN', 'MANAGER', 'STAFF', 'SUPER_ADMIN'].includes(userRole)) {
            redirectUrl = '/';
          } else {
            redirectUrl = '/customer/cargo/sea';
          }
        } catch (error) {
          redirectUrl = '/';
        }
      }

      if (from !== '/' && from !== '/login') {
        redirectUrl = from;
      }

      navigate(redirectUrl, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/CCL_LOGO_TP.png" alt="Cephas Cargo" className="w-32.5 h-auto mx-auto" />
          <h1 className="mt-4 text-2xl font-semibold">Sign in to Cephas Cargo</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage shipments, containers and claims</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="e.g. +233501234567"
                    className="pl-10 h-11"
                    {...register('phone')}
                    aria-invalid={errors.phone ? 'true' : 'false'}
                  />
                </div>
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your password"
                    className="pl-10 pr-10 h-11"
                    {...register('password')}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading} forceBlue>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
                <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">© {new Date().getFullYear()} Cephas Cargo and Logistics. All rights reserved.</p>
      </div>
    </div>
  );
}