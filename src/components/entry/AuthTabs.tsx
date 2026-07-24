"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2, CheckCircle2, UserCheck } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from "firebase/auth";

interface AuthTabsProps {
  onSuccess: () => void;
}

export function AuthTabs({ onSuccess }: AuthTabsProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  // Form Fields State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { loginUser, continueAsGuest } = useAppStore();

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Guest Mode Action
  const handleGuestClick = () => {
    continueAsGuest();
    setSuccessMessage("Entering in Guest Mode...");
    setTimeout(onSuccess, 600);
  };

  // Google OAuth Login via Firebase
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      loginUser({
        id: user.uid,
        name: user.displayName || "Google User",
        email: user.email || "",
        avatarUrl: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      });

      setSuccessMessage("Signed in successfully with Google!");
      setTimeout(onSuccess, 800);
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setErrorMessage(err.message || "Failed to authenticate with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  // Credentials Submission via Firebase Email/Password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Basic Client Validation
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }
    if (activeTab === "signup" && !fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      setIsLoading(false);
      return;
    }

    try {
      if (activeTab === "login") {
        // Sign In
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        
        loginUser({
          id: user.uid,
          name: user.displayName || "Member",
          email: user.email || "",
          avatarUrl: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        });

        setSuccessMessage("Welcome back! Redirecting...");
        setTimeout(onSuccess, 800);
      } else {
        // Sign Up / Account Creation
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Update profile with Display Name
        await updateProfile(user, {
          displayName: fullName,
          photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
        });

        loginUser({
          id: user.uid,
          name: fullName,
          email: user.email || "",
          avatarUrl: user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        });

        setSuccessMessage("Account created successfully! Directing to catalog...");
        setTimeout(onSuccess, 800);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      // Human-readable errors
      let msg = err.message || "An authentication error occurred.";
      if (err.code === "auth/email-already-in-use") {
        msg = "This email is already in use. Please sign in instead.";
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
        msg = "Incorrect email address or password. Please try again.";
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] shadow-2xl select-none">
      
      {/* Tab Bar (Login vs Signup Switch) */}
      <div className="flex items-center p-1 rounded bg-[var(--surface-base)] border border-[var(--border)] mb-6">
        <button
          type="button"
          onClick={() => handleTabChange("login")}
          className={cn(
            "flex-1 py-2 text-xs font-display font-bold uppercase tracking-wider rounded transition-all focus:outline-none cursor-pointer",
            activeTab === "login"
              ? "bg-[var(--primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:text-white"
          )}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("signup")}
          className={cn(
            "flex-1 py-2 text-xs font-display font-bold uppercase tracking-wider rounded transition-all focus:outline-none cursor-pointer",
            activeTab === "signup"
              ? "bg-[var(--primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:text-white"
          )}
        >
          Create Account
        </button>
      </div>

      {/* Animated Validation Messages */}
      <AnimatePresence mode="wait">
        {errorMessage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 p-3 rounded bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Social Google Login Button & Continue as Guest */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs font-bold uppercase tracking-wider text-white hover:border-[var(--primary)] transition-colors focus:outline-none cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Continue as Guest Button */}
          <button
            type="button"
            onClick={handleGuestClick}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded bg-[var(--surface-base)] border border-[var(--border)] text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] hover:text-white hover:border-[var(--primary)] transition-colors focus:outline-none cursor-pointer"
          >
            <User className="w-4 h-4 text-[var(--primary)]" />
            <span>Continue as Guest</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-3">
          <div className="border-t border-[var(--border)] w-full" />
          <span className="bg-[var(--surface-elevated)] px-2 text-[10px] uppercase font-bold text-[var(--text-secondary)] absolute">
            or email
          </span>
        </div>

        {/* Full Name Field (Signup Only) */}
        {activeTab === "signup" && (
          <div className="space-y-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Full Name
            </label>
            <div className="flex items-center px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] focus-within:border-[var(--primary)]">
              <User className="w-4 h-4 text-[var(--text-secondary)] mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Alex Vance"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder:text-[var(--text-secondary)]"
              />
            </div>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Email Address
          </label>
          <div className="flex items-center px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] focus-within:border-[var(--primary)]">
            <Mail className="w-4 h-4 text-[var(--text-secondary)] mr-2 shrink-0" />
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder:text-[var(--text-secondary)]"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            Password
          </label>
          <div className="flex items-center px-3 py-2 rounded bg-[var(--surface-base)] border border-[var(--border)] focus-within:border-[var(--primary)]">
            <Lock className="w-4 h-4 text-[var(--text-secondary)] mr-2 shrink-0" />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder:text-[var(--text-secondary)]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded bg-[var(--primary)] text-white font-heading text-xs uppercase tracking-wider hover:bg-[var(--primary-hover)] transition-all shadow-md focus:outline-none cursor-pointer mt-2"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>{activeTab === "login" ? "Sign In Now" : "Create My Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </form>

      {/* Security Note */}
      <div className="mt-6 pt-4 border-t border-[var(--border)] text-center text-[10px] text-[var(--text-secondary)] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
        <span>Secure authentication powered by Firebase Auth</span>
      </div>

    </div>
  );
}
