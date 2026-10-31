import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HostelBlock } from '../types';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Building2
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    login, 
    demoLogin, 
    signUp 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(authModalTab || 'signin');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign In Form State
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('password123');

  // Sign Up Form State
  const [fullName, setFullName] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('password123');
  const [hostelBlock, setHostelBlock] = useState<HostelBlock>('Block B');
  const [roomNumber, setRoomNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  if (!isAuthModalOpen) return null;

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

    if (!result.success) {
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

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to create account.');
    } else {
      setSuccessMsg('Account created! Welcome to the Archival Coven.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-dark/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Centered Archival Card */}
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-obsidian-card border border-gold/30 shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-coven/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-lavender-muted hover:text-cream transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-coven via-obsidian to-gold-dark border border-gold/40 shadow-gold-glow mb-3">
            <Sparkles className="w-6 h-6 text-gold fill-gold" />
          </div>
          <span className="text-[10px] font-cinzel tracking-widest text-gold uppercase block">Verified Campus Chamber</span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-cream tracking-wide">
            Hostel Authentication
          </h2>
          <p className="text-xs text-lavender-muted mt-1">
            Zero friction, seamless student identity for judges & hostel peers.
          </p>
        </div>

        {/* Tabs: Sign In vs Create Account */}
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

        {/* Error / Success message */}
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

        {/* Tab 1: Sign In */}
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-cinzel font-semibold tracking-wider text-lavender-muted mb-1.5 uppercase">
                Password <span className="text-[10px] text-lavender-muted/60 normal-case">(any dummy text works)</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="Dummy password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Archival Coven</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 1-Click Demo Login Bar for Judges */}
            <div className="pt-4 border-t border-gold/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-cinzel font-bold text-gold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-gold" />
                <span>1-Click Demo Credentials for Judges</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => demoLogin('aarav')}
                  className="p-2.5 rounded-xl bg-obsidian-surface border border-gold/30 hover:border-gold hover:bg-gold/10 text-left transition-all group"
                >
                  <p className="text-xs font-cinzel font-bold text-cream group-hover:text-gold">
                    Aarav Sharma
                  </p>
                  <p className="text-[10px] text-lavender-muted">
                    Block B • Room 204 (80 Karma)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => demoLogin('meera')}
                  className="p-2.5 rounded-xl bg-obsidian-surface border border-gold/30 hover:border-gold hover:bg-gold/10 text-left transition-all group"
                >
                  <p className="text-xs font-cinzel font-bold text-cream group-hover:text-gold">
                    Meera Nair
                  </p>
                  <p className="text-[10px] text-lavender-muted">
                    Block C • Room 112 (65 Karma)
                  </p>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Tab 2: Create Hostel Account */}
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
                placeholder="e.g. Rohan Verma"
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-gold"
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
                  placeholder="rohan22"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-gold"
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
                  placeholder="24CS109"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-gold uppercase"
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
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream focus:outline-none focus:border-gold cursor-pointer"
                >
                  <option value="Block A">Block A (Men)</option>
                  <option value="Block B">Block B (Men)</option>
                  <option value="Block C">Block C (Women)</option>
                  <option value="Block D">Block D (Women)</option>
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
                  placeholder="Room 310"
                  className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-gold"
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
                placeholder="Dummy password"
                className="w-full px-3.5 py-2 rounded-xl bg-obsidian-surface border border-gold-subtle text-xs text-cream placeholder-lavender-muted/50 focus:outline-none focus:border-gold"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/30 flex items-center gap-2 text-xs text-lavender-muted">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Instant hostel verification. You will start with +50 Karma Points!</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
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