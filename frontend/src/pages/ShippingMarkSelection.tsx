import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Package, ArrowRight, RefreshCw, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { config } from '@/lib/config';

interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  region: string;
  user_type: string;
  password: string;
  confirm_password: string;
  nickname?: string;
  company_name?: string;
}

export default function ShippingMarkSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMark, setSelectedMark] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [signupData, setSignupData] = useState<SignupData | null>(null);

  const generateSuggestions = async (data: SignupData) => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        `${config.apiBaseUrl}/api/auth/generate-shipping-marks/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            region: data.region,
            email: data.email,
            company_name: data.company_name || '',
            nickname: data.nickname || '',
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSuggestions(result.suggestions);
        if (result.suggestions.length > 0) {
          setSelectedMark(result.suggestions[0]); // Auto-select first option
        }
      } else {
        toast({
          title: "Error",
          description: result.message || 'Failed to generate shipping marks',
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      toast({
        title: "Error",
        description: 'Failed to generate shipping marks. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  // Get signup data passed from previous page
  useEffect(() => {
    const data = location.state?.signupData;
    if (!data) {
      // If no data, redirect back to signup
      toast({
        title: "Error",
        description: "Please complete the signup form first",
        variant: "destructive",
      });
      navigate('/signup');
      return;
    }
    setSignupData(data);
    
    // Generate initial suggestions
    generateSuggestions(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, navigate, toast]);

  const handleRefresh = () => {
    if (signupData) {
      generateSuggestions(signupData);
    }
  };

  const handleSubmit = async () => {
    if (!selectedMark) {
      toast({
        title: "Selection Required",
        description: "Please select a shipping mark to continue",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Submit complete signup with selected shipping mark
      const response = await fetch(
        `${config.apiBaseUrl}/api/auth/signup/with-shipping-mark/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...signupData,
            shipping_mark: selectedMark,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        // Store tokens
        if (result.data.tokens) {
          localStorage.setItem('access_token', result.data.tokens.access);
          localStorage.setItem('refresh_token', result.data.tokens.refresh);
        }

        // Set user data in authStore
        setUser(result.data.user);

        toast({
          title: "Account Created Successfully!",
          description: `Welcome ${signupData?.first_name || 'User'}! Your shipping mark is: ${selectedMark}`,
        });

        // Navigate to customer sea cargo page with full reload to ensure auth context initializes
        setTimeout(() => {
          window.location.href = '/customer/cargo/sea';
        }, 500);
      } else {
        // If shipping mark is taken, refresh suggestions
        if (result.error === 'shipping_mark_taken') {
          toast({
            title: "Shipping Mark Taken",
            description: "This shipping mark was just taken. Generating new options...",
            variant: "destructive",
          });
          handleRefresh();
        } else {
          toast({
            title: "Signup Failed",
            description: result.message || 'An error occurred during signup',
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: 'An unexpected error occurred. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!signupData) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <img src="/CCL_LOGO_TP.png" alt="Cephas Cargo" className="w-24 h-auto mx-auto" />
          <h2 className="mt-3 text-xl font-semibold">Select your shipping mark</h2>
          <p className="text-sm text-muted-foreground mt-1">Pick a unique shipping mark for your account</p>
        </div>

        <Card className="shadow-md">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Choose one of the options below. You can refresh to see new suggestions.</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                title="Generate new suggestions"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            <Alert>
              <Package className="h-4 w-4" />
              <AlertDescription>
                <strong>Hello {signupData.first_name}!</strong> We've generated a set of shipping marks based on your name.
              </AlertDescription>
            </Alert>

            {isRefreshing ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <RadioGroup value={selectedMark} onValueChange={setSelectedMark}>
                <div className="space-y-3">
                  {suggestions.map((mark, index) => (
                    <div
                      key={mark}
                      className={`relative flex items-center space-x-3 rounded-lg border-2 p-4 transition-all ${
                        selectedMark === mark
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={mark} id={`mark-${index}`} />
                      <Label
                        htmlFor={`mark-${index}`}
                        className="flex-1 cursor-pointer text-lg font-mono font-semibold"
                      >
                        {mark}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            <div>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !selectedMark || isRefreshing}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Complete Signup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Not happy with these options?{' '}
              <button type="button" onClick={handleRefresh} disabled={isRefreshing} className="text-primary hover:underline font-medium">
                Generate new ones
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
