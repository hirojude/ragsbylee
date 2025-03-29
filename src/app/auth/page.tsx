"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, Lock, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import Image from "next/image";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}

export default function AuthPage() {
  const { signInWithEmail, signUpWithEmail, error } = useAuth();
  const router = useRouter();
  
  // Phone auth states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  // Email auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved
          },
        }
      );
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setIsLoading(true);
    try {
      setupRecaptcha();
      const formattedNumber = phone.startsWith("+") ? phone : `+${phone}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        window.recaptchaVerifier!
      );
      setVerificationId(confirmationResult.verificationId);
      setShowOTP(true);
      setCountdown(60); // Start 60-second countdown
    } catch (err: Error) {
      console.error(err);
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
    
    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (verificationId) {
        const credential = PhoneAuthProvider.credential(verificationId, otp.join(""));
        await signInWithCredential(auth, credential);
        router.push("/");
      }
    } catch (err: Error) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!phone) return;
    
    setIsLoading(true);
    try {
      setupRecaptcha();
      const formattedNumber = phone.startsWith("+") ? phone : `+${phone}`;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        window.recaptchaVerifier!
      );
      setVerificationId(confirmationResult.verificationId);
      setCountdown(60);
    } catch (err: Error) {
      console.error(err);
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      router.push("/");
    } catch (err: Error) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      <div className="max-w-md w-full mx-4 space-y-8 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-24 h-24 relative">
              <Image
                src="/images/logo.png"
                alt="RagsByLee Logo"
                fill
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-base text-gray-600 font-medium">
              {isSignUp ? "Create your account to get started" : "Sign in to continue to RagsByLee"}
            </p>
          </div>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-gray-100 rounded-lg gap-1">
            <TabsTrigger 
              value="email" 
              className="flex items-center gap-2 py-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            >
              <Mail className="w-4 h-4" />
              <span className="font-medium">Email</span>
            </TabsTrigger>
            <TabsTrigger 
              value="phone" 
              className="flex items-center gap-2 py-3 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">Phone</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <form onSubmit={handleEmailAuth} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder={isSignUp ? "Create a password" : "Enter your password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600 text-center font-medium">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-base font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Need an account? Create one"}
                </button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="phone">
            {!showOTP ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+233241234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500 ml-1">
                    Enter your phone number with country code
                  </p>
                </div>

                <div 
                  id="recaptcha-container"
                  className="hidden"
                />

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600 text-center font-medium">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-base font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                  disabled={isLoading || !phone}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Verification Code
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOTPSubmit} className="space-y-6">
                <div>
                  <label htmlFor="otp-0" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Verification Code
                  </label>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-semibold border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-gray-500 ml-1">
                      Enter the verification code sent to {phone}
                    </p>
                    {countdown > 0 ? (
                      <p className="text-sm text-gray-500">
                        Resend in {countdown}s
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={resendOTP}
                        disabled={isLoading}
                        className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm text-red-600 text-center font-medium">{error}</p>
                  </div>
                )}

                <div className="flex flex-col space-y-3">
                  <Button
                    type="submit"
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-base font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                    disabled={isLoading || otp.some(digit => digit === "")}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Code
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowOTP(false);
                      setOtp(["", "", "", "", "", ""]);
                      setVerificationId(null);
                      setCountdown(0);
                      if (window.recaptchaVerifier) {
                        window.recaptchaVerifier.clear();
                        window.recaptchaVerifier = null;
                      }
                    }}
                    className="h-12 font-medium border-gray-300 hover:bg-gray-50"
                  >
                    Change Phone Number
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 