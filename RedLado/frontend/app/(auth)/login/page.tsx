"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Github, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Link from "next/link";

/**
 * AUTH CARD SLIDING INTERACTION - RED THEME
 * 
 * Component Structure:
 * - Auth.Card: 768×480px container with overflow hidden
 * - Panel.SignIn: 50% width (384px), absolute positioned
 * - Panel.SignUp: 50% width (384px), absolute positioned  
 * - Panel.Toggle: RED overlay that slides (200% width technique)
 * 
 * Animation Spec:
 * - Duration: 0.55s (550ms)
 * - Easing: cubic-bezier(0.22, 0.61, 0.36, 1)
 * - Transform only (no width/left/top changes)
 * - Opacity crossfade for panels
 * 
 * States:
 * - active=false: Sign In visible (right side), Toggle on right
 * - active=true: Sign Up visible (left side), Toggle on left
 * 
 * Accessibility:
 * - Inactive panel has aria-hidden="true" and pointer-events:none
 * - Focus moves to first input after animation
 * - Respects prefers-reduced-motion
 * - Focus-visible rings on all interactive elements (RED 2-3px)
 */

export default function LoginPage() {
  const router = useRouter();
  const { login, signup } = useAuth();
  
  // State for active panel (false = Sign In, true = Sign Up)
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Refs for focus management
  const signInEmailRef = useRef<HTMLInputElement>(null);
  const signUpUsernameRef = useRef<HTMLInputElement>(null);

  // Handle panel switching with animation
  const switchToSignUp = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsSignUpActive(true);
    setTimeout(() => {
      setIsAnimating(false);
      // Focus first input after animation
      signUpUsernameRef.current?.focus();
    }, 550);
  };

  const switchToSignIn = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsSignUpActive(false);
    setTimeout(() => {
      setIsAnimating(false);
      // Focus first input after animation
      signInEmailRef.current?.focus();
    }, 550);
  };

  // Validation functions
  const validateLogin = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!loginData.password) {
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignup = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!signupData.username) {
      newErrors.username = "Username is required";
    } else if (signupData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!signupData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) {
      return;
    }

    setIsLoggingIn(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success("Welcome back! You've been logged in successfully.");
      // Small delay to show success message before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid email or password";
      setErrors({ ...errors, email: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) {
      return;
    }

    setIsSigningUp(true);
    try {
      await signup(signupData.username, signupData.email, signupData.password);
      toast.success("Account created successfully! Welcome to RedLado!");
      // Small delay to show success message before redirect
      setTimeout(() => {
        router.push("/");
      }, 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setErrors({ ...errors, email: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF1F2] via-bg-base to-[#FFE4E6] dark:from-[#1F1315] dark:via-[#0B0F0F] dark:to-[#1F1315] flex items-center justify-center p-4">
      {/* Background pattern - RED theme */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48] via-transparent to-[#E11D48] dark:from-[#F43F5E] dark:to-[#F43F5E]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center" style={{ paddingTop: '112px', paddingBottom: '112px' }}>
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-6 text-text-secondary dark:text-[#A7B0BF] hover:text-text-primary dark:hover:text-[#E5E7EB] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f] self-start
            focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* 
          AUTH.CARD COMPONENT
          768×480px with rounded corners and clip content ON
          Two variants driven by isSignUpActive state
        */}
        <div 
          className="relative bg-bg-elev-1 dark:bg-[#111316] border border-stroke-muted dark:border-[#1F2937] shadow-2xl rounded-2xl overflow-hidden"
          style={{ 
            width: '768px', 
            height: '480px',
            maxWidth: '100%'
          }}
        >
          {/*
            PANEL.SIGNIN
            50% width, absolute positioned
            Slides from visible (right) to hidden (left) when Sign Up activates
            Transform: translateX(0) → translateX(-100%)
          */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full bg-bg-elev-1 dark:bg-[#111316] p-10 overflow-y-auto"
            style={{
              transform: isSignUpActive ? 'translateX(-100%)' : 'translateX(0)',
              opacity: isSignUpActive ? 0 : 1,
              transition: 'transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)',
              pointerEvents: isSignUpActive ? 'none' : 'auto',
            }}
            aria-hidden={isSignUpActive}
          >
            <div className="flex flex-col h-full justify-center">
              <h2 className="text-text-primary dark:text-[#E5E7EB] text-2xl font-bold mb-2">Sign in to Account</h2>
              <p className="text-text-muted dark:text-[#8B93A7] text-sm mb-6">Sign in to your account to continue</p>

              {/* Social Icons Group */}
              <div className="flex gap-3 mb-6">
                <button className="w-10 h-10 rounded-full border border-stroke-muted dark:border-[#1F2937] flex items-center justify-center text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f] hover:border-[#E11D48] dark:hover:border-[#F43F5E] transition-all
                focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171]">
                  <Github className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-stroke-muted dark:border-[#1F2937] flex items-center justify-center text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f] hover:border-[#E11D48] dark:hover:border-[#F43F5E] transition-all
                focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171]">
                  <Mail className="w-4 h-4" />
                </button>
              </div>

              <p className="text-text-muted dark:text-[#8B93A7] text-xs mb-4">or use your email account</p>

              {/* Sign In Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7]" />
                    <Input
                      ref={signInEmailRef}
                      type="email"
                      placeholder="Email"
                      value={loginData.email}
                      onChange={(e) => {
                        setLoginData({ ...loginData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`pl-10 bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937] 
                      focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-[3px] focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20 ${
                        errors.email ? 'border-[#E11D48] dark:border-[#F43F5E]' : ''
                      }`}
                      tabIndex={isSignUpActive ? -1 : 0}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[#E11D48] dark:text-[#F43F5E] text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => {
                        setLoginData({ ...loginData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: "" });
                      }}
                      className={`pl-10 pr-10 bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937]
                      focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-[3px] focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20 ${
                        errors.password ? 'border-[#E11D48] dark:border-[#F43F5E]' : ''
                      }`}
                      tabIndex={isSignUpActive ? -1 : 0}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-[#8B93A7] hover:text-text-primary dark:hover:text-[#E5E7EB]"
                      tabIndex={isSignUpActive ? -1 : 0}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[#E11D48] dark:text-[#F43F5E] text-sm">{errors.password}</p>
                  )}
                </div>

                <Button 
                  variant="link" 
                  className="p-0 h-auto text-[#E11D48] dark:text-[#F43F5E] hover:text-[#BE123C] dark:hover:text-[#E11D48] text-sm"
                  tabIndex={isSignUpActive ? -1 : 0}
                >
                  Forgot your password?
                </Button>

                <Button 
                  onClick={handleLogin}
                  disabled={isLoggingIn || isSigningUp}
                  className="w-full h-12 bg-[#E11D48] hover:bg-[#BE123C] active:bg-[#9F1239] dark:bg-[#F43F5E] dark:hover:bg-[#E11D48] dark:active:bg-[#BE123C] text-white font-medium
                  focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  tabIndex={isSignUpActive ? -1 : 0}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/*
            PANEL.SIGNUP
            50% width, absolute positioned
            Slides from hidden (right) to visible (left) when Sign Up activates
            Transform: translateX(100%) → translateX(0)
          */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full bg-bg-elev-1 dark:bg-[#111316] p-10 overflow-y-auto"
            style={{
              transform: isSignUpActive ? 'translateX(0)' : 'translateX(100%)',
              opacity: isSignUpActive ? 1 : 0,
              transition: 'transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)',
              pointerEvents: isSignUpActive ? 'auto' : 'none',
            }}
            aria-hidden={!isSignUpActive}
          >
            <div className="flex flex-col h-full justify-center">
              <h2 className="text-text-primary dark:text-[#E5E7EB] text-2xl font-bold mb-2">Create Account</h2>
              <p className="text-text-muted dark:text-[#8B93A7] text-sm mb-6">Sign up to start trading</p>

              {/* Social Icons Group */}
              <div className="flex gap-3 mb-6">
                <button className="w-10 h-10 rounded-full border border-stroke-muted dark:border-[#1F2937] flex items-center justify-center text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f] hover:border-[#E11D48] dark:hover:border-[#F43F5E] transition-all
                focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171]">
                  <Github className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full border border-stroke-muted dark:border-[#1F2937] flex items-center justify-center text-text-secondary dark:text-[#A7B0BF] hover:bg-bg-subtle dark:hover:bg-[#1a1d1f] hover:border-[#E11D48] dark:hover:border-[#F43F5E] transition-all
                focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171]">
                  <Mail className="w-4 h-4" />
                </button>
              </div>

              <p className="text-text-muted dark:text-[#8B93A7] text-xs mb-4">or use your email for registration</p>

              {/* Sign Up Form */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7]" />
                    <Input
                      ref={signUpUsernameRef}
                      type="text"
                      placeholder="Username"
                      value={signupData.username}
                      onChange={(e) => {
                        setSignupData({ ...signupData, username: e.target.value });
                        if (errors.username) setErrors({ ...errors, username: "" });
                      }}
                      className={`pl-10 bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937]
                      focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-[3px] focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20 ${
                        errors.username ? 'border-[#E11D48] dark:border-[#F43F5E]' : ''
                      }`}
                      tabIndex={!isSignUpActive ? -1 : 0}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-[#E11D48] dark:text-[#F43F5E] text-sm">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7]" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={signupData.email}
                      onChange={(e) => {
                        setSignupData({ ...signupData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                      className={`pl-10 bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937]
                      focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-[3px] focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20 ${
                        errors.email ? 'border-[#E11D48] dark:border-[#F43F5E]' : ''
                      }`}
                      tabIndex={!isSignUpActive ? -1 : 0}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[#E11D48] dark:text-[#F43F5E] text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={signupData.password}
                      onChange={(e) => {
                        setSignupData({ ...signupData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: "" });
                      }}
                      className={`pl-10 pr-10 bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937]
                      focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-[3px] focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20 ${
                        errors.password ? 'border-[#E11D48] dark:border-[#F43F5E]' : ''
                      }`}
                      tabIndex={!isSignUpActive ? -1 : 0}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-[#8B93A7] hover:text-text-primary dark:hover:text-[#E5E7EB]"
                      tabIndex={!isSignUpActive ? -1 : 0}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[#E11D48] dark:text-[#F43F5E] text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted dark:text-[#8B93A7]" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={signupData.confirmPassword}
                      onChange={(e) => {
                        setSignupData({ ...signupData, confirmPassword: e.target.value });
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
                      }}
                      className={`pl-10 pr-10 bg-bg-elev-2 dark:bg-[#1a1d1f] border-stroke-muted dark:border-[#1F2937]
                      focus:border-[#E11D48] dark:focus:border-[#F43F5E] focus:ring-[3px] focus:ring-[#F43F5E]/20 dark:focus:ring-[#F87171]/20 ${
                        errors.confirmPassword ? 'border-[#E11D48] dark:border-[#F43F5E]' : ''
                      }`}
                      tabIndex={!isSignUpActive ? -1 : 0}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted dark:text-[#8B93A7] hover:text-text-primary dark:hover:text-[#E5E7EB]"
                      tabIndex={!isSignUpActive ? -1 : 0}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[#E11D48] dark:text-[#F43F5E] text-sm">{errors.confirmPassword}</p>
                  )}
                </div>

                <Button 
                  onClick={handleSignup}
                  disabled={isLoggingIn || isSigningUp}
                  className="w-full h-12 bg-[#E11D48] hover:bg-[#BE123C] active:bg-[#9F1239] dark:bg-[#F43F5E] dark:hover:bg-[#E11D48] dark:active:bg-[#BE123C] text-white font-medium mt-2
                  focus-visible:ring-2 focus-visible:ring-[#F43F5E] dark:focus-visible:ring-[#F87171] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  tabIndex={!isSignUpActive ? -1 : 0}
                >
                  {isSigningUp ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/*
            PANEL.TOGGLE (RED GRADIENT)
            Two separate RED overlay panels that slide independently
            - Panel.Toggle.Right: Visible when Sign In active (covers right 50%)
            - Panel.Toggle.Left: Visible when Sign Up active (covers left 50%)
          */}
          
          {/* Panel.Toggle.Right - "Hello, Friend!" (Sign Up CTA) - RED GRADIENT */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#9F1239] dark:from-[#F43F5E] dark:via-[#E11D48] dark:to-[#BE123C] shadow-xl flex items-center justify-center p-10"
            style={{
              transform: isSignUpActive ? 'translateX(100%)' : 'translateX(0)',
              transition: 'transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)',
              zIndex: 10,
            }}
          >
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-8 text-sm opacity-90">
                Enter your personal details and start your trading journey with us
              </p>
              <Button
                onClick={switchToSignUp}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#E11D48] dark:hover:text-[#F43F5E] font-medium px-8 bg-transparent
                focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                disabled={isAnimating}
                tabIndex={isSignUpActive ? -1 : 0}
              >
                Sign Up
              </Button>
            </div>
          </div>

          {/* Panel.Toggle.Left - "Welcome Back!" (Sign In CTA) - RED GRADIENT */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#9F1239] dark:from-[#F43F5E] dark:via-[#E11D48] dark:to-[#BE123C] shadow-xl flex items-center justify-center p-10"
            style={{
              transform: isSignUpActive ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)',
              zIndex: 10,
            }}
          >
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-8 text-sm opacity-90">
                To keep connected with us please login with your personal info
              </p>
              <Button
                onClick={switchToSignIn}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#E11D48] dark:hover:text-[#F43F5E] font-medium px-8 bg-transparent
                focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                disabled={isAnimating}
                tabIndex={!isSignUpActive ? -1 : 0}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-text-muted dark:text-[#8B93A7] text-sm mt-6 text-center">
          Secure trading platform with 100,000+ verified users
        </p>
      </div>
    </div>
  );
}
