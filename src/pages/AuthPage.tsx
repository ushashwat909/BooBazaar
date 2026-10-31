import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HostelBlock } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight,
  Flame,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

interface AuthPageProps {
  onBackToPantry: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ 
  onBackToPantry,
  defaultTab = 'signin' 
}) => {
  const { login, demoLogin, signUp } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign In State
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('password123');

  // Sign Up State
  const [fullName, setFullName] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('password123');
  const [hostelBlock, setHostelBlock] = useState<HostelBlock>('Block B');
  const [roomNumber, setRoomNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signInUsername.trim()) {
      setErrorMsg('Please enter a username or click a 1-Click Demo button below!');
      return;
    }

    setIsSubmitting(true);
    const result = await login(signInUsername, signInPassword);
    setIsSubmitting(false);

    if (result.success) {
      onBackToPantry();
    } else {
      setErrorMsg(result.error || 'Failed to sign in. Try 1-Click Demo login!');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !signUpUsername.trim() || !roomNumber.trim() || !rollNumber.trim()) {
      setErrorMsg('All fields are required to verify your hostel identity.');
      return;
    }

    setIsSubmitting(true);
    const result = await signUp({
      full_name: fullName.trim(),
      username: signUpUsername.trim(),
      password: signUpPassword,
      hostel_block: hostelBlock,
      room_number: roomNumber.trim(),
      roll_number: rollNumber.trim().toUpperCase(),
    });
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMsg('Account created! Entering the Archival Vault...');
      setTimeout(() => onBackToPantry(), 800);
    } else {
      setErrorMsg(result.error || 'Failed to create account.');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Vignette Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-coven/20 rounded-full blur-[130px]" />
      </div>

      {/* Back button */}
      <button
        onClick={onBackToPantry}
        className="relative z-10 mb-6 px-4 py-2 rounded-xl bg-obsidian-surface border border-gold/30 text-gold-bright text-xs font-cinzel font-semibold hover:border-gold hover:bg-gold/10 flex items-center gap-2 transition-all shadow-sm"
      >
        <ArrowLeft className="w-4 h-4 text-gold" />
        <span>Return to Archival Vault</span>
      </button>

      {/* Main Centered Archival Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-obsidian-card border border-gold/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-coven via-obsidian to-gold-dark border border-gold/40 shadow-gold-glow mb-3">
            <Sparkles className="w-6 h-6 text-gold fill-gold" />
          </div>
          <span className="text-[10px] font-cinzel tracking-widest text-gold uppercase block">Verified Campus Inscriber Chamber</span>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-cream tracking-wide">
            Hostel Authentication
          </h1>
          <p className="text-xs text-lavender-muted mt-1">
            Hostel Essentials Barter • Instant Peer Verification
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-obsidian-surface border border-gold/20 mb-6">
          <button
            type="button"
            onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
            className={`py-2 text-xs font-cinzel font-bold tracking-wider rounded-xl transition-all ${
              activeTab === 'signin'
                ? 'bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian shadow-gold-glow'
                : 'text-lavender-muted hover:text-cream'
            }`}
          >
            Sign In to the Coven
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
            className={`py-2 text-xs font-cinzel font-bold tracking-wider rounded-xl transition-all ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian shadow-gold-glow'
                : 'text-lavender-muted hover:text-cream'
            }`}
          >
            Create Hostel Account
          </button>
        </div>

        {/* Error / Success messages */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-gold/15 border border-gold/30 text-gold-bright text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            {successMsg}
          </div>
        )}

        {/* Form: Sign In */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1.5 uppercase">
                Username / Handle
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={signInUsername}
                  onChange={(e) => setSignInUsername(e.target.value)}
                  placeholder="e.g. aarav or meera"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1.5 uppercase">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Archival Coven</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 1-Click Demo Login bar */}
            <div className="pt-4 border-t border-gold/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-cinzel font-bold text-gold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-gold" />
                <span>1-Click Demo Credentials for Judges</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { demoLogin('aarav'); onBackToPantry(); }}
                  className="p-2.5 rounded-xl bg-obsidian-surface border border-gold/30 hover:border-gold hover:bg-gold/10 text-left transition-all"
                >
                  <p className="text-xs font-cinzel font-bold text-cream">Aarav Sharma</p>
                  <p className="text-[10px] text-lavender-muted">Block B • 204 (80 Karma)</p>
                </button>
                <button
                  type="button"
                  onClick={() => { demoLogin('meera'); onBackToPantry(); }}
                  className="p-2.5 rounded-xl bg-obsidian-surface border border-gold/30 hover:border-gold hover:bg-gold/10 text-left transition-all"
                >
                  <p className="text-xs font-cinzel font-bold text-cream">Meera Nair</p>
                  <p className="text-[10px] text-lavender-muted">Block C • 112 (65 Karma)</p>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Form: Sign Up */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1 uppercase">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Maya Patel"
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1 uppercase">
                  Username
                </label>
                <input
                  type="text"
                  value={signUpUsername}
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  placeholder="mayap"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1 uppercase">
                  Roll Number
                </label>
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="23IT044"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream uppercase focus:outline-none focus:border-gold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1 uppercase">
                  Hostel Block
                </label>
                <select
                  value={hostelBlock}
                  onChange={(e) => setHostelBlock(e.target.value as HostelBlock)}
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold"
                >
                  <option value="Block A">Block A</option>
                  <option value="Block B">Block B</option>
                  <option value="Block C">Block C</option>
                  <option value="Block D">Block D</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1 uppercase">
                  Room Number
                </label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="305"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1 uppercase">
                Password
              </label>
              <input
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/30 flex items-center gap-2 text-xs text-lavender-muted">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Instant verification. 50 Karma points credited automatically!</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <span>Create Account & Enter Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};