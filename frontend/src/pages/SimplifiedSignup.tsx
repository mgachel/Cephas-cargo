import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

// Region choices (matching backend)
const REGION_CHOICES = [
  { value: 'GREATER_ACCRA', label: 'Greater Accra' },
  { value: 'ASHANTI', label: 'Ashanti' },
  { value: 'WESTERN', label: 'Western' },
  { value: 'CENTRAL', label: 'Central' },
  { value: 'VOLTA', label: 'Volta' },
  { value: 'EASTERN', label: 'Eastern' },
  { value: 'NORTHERN', label: 'Northern' },
  { value: 'UPPER_EAST', label: 'Upper East' },
  { value: 'UPPER_WEST', label: 'Upper West' },
  { value: 'BRONG_AHAFO', label: 'Brong Ahafo' },
  { value: 'WESTERN_NORTH', label: 'Western North' },
  { value: 'AHAFO', label: 'Ahafo' },
  { value: 'BONO', label: 'Bono' },
  { value: 'BONO_EAST', label: 'Bono East' },
  { value: 'OTI', label: 'Oti' },
  { value: 'NORTH_EAST', label: 'North East' },
  { value: 'SAVANNAH', label: 'Savannah' },
];

// Validation schema
const simplifiedSignupSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  nickname: z.string().optional(),
  company_name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  region: z.string().min(1, 'Please select your region'),
  user_type: z.enum(['INDIVIDUAL', 'BUSINESS']),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type SimplifiedSignupData = z.infer<typeof simplifiedSignupSchema>;

export default function SimplifiedSignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { error, clearError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SimplifiedSignupData>({
    resolver: zodResolver(simplifiedSignupSchema),
    defaultValues: {
      user_type: 'INDIVIDUAL',
    },
  });

  const onSubmit = async (data: SimplifiedSignupData) => {
    try {
      setIsLoading(true);
      clearError();

  // Navigate to the shipping mark selection step with the signup data
  navigate('/signup/select-shipping-mark', { state: { signupData: data } });
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img src="/CCL_LOGO_TP.png" alt="Cephas Cargo" className="w-28 h-auto mx-auto" />
          <h1 className="mt-4 text-2xl font-semibold">Create an account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Simple signup to manage your shipments</p>
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
                <Label htmlFor="first_name">First name</Label>
                <Input id="first_name" {...register('first_name')} placeholder="John" />
                {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name.message}</p>}
              </div>

              <div>
                <Label htmlFor="last_name">Last name</Label>
                <Input id="last_name" {...register('last_name')} placeholder="Doe" />
                {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register('phone')} placeholder="+233 501 234567" />
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <Label htmlFor="region">Region</Label>
                <Select onValueChange={(value) => setValue('region', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGION_CHOICES.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.region && <p className="text-sm text-red-600 mt-1">{errors.region.message}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <Label htmlFor="confirm_password">Confirm password</Label>
                <div className="relative">
                  <Input id="confirm_password" type={showConfirmPassword ? 'text' : 'password'} {...register('confirm_password')} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirm_password && <p className="text-sm text-red-600 mt-1">{errors.confirm_password.message}</p>}
              </div>

              <Button type="submit" forceBlue className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : (
                  <div className="flex items-center justify-center">
                    <span>Create account</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-2">Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></p>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">© {new Date().getFullYear()} Cephas Cargo and Logistics. All rights reserved.</p>
      </div>
    </div>
  );
}