import React from 'react';

/**
 * Authentic Victorian Gothic Cobweb for card & panel corners
 */
export const CobwebCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position = 'top-right', className = '', size = 56 }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return 'scale(1, 1)';
      case 'top-right':
        return 'scale(-1, 1)';
      case 'bottom-left':
        return 'scale(1, -1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'scale(1, 1)';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-10 opacity-30 ${getPositionClasses()} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="rgba(255, 138, 43, 0.45)"
        strokeWidth="1.2"
        style={{ transform: getTransform() }}
      >
        <path d="M0,0 L100,0 M0,0 L0,100" strokeWidth="2" stroke="rgba(255,138,43,0.3)" />
        <path d="M0,0 L100,100 M0,0 L35,100 M0,0 L70,100 M0,0 L100,70 M0,0 L100,35" strokeDasharray="2,3" />
        <path d="M0,25 Q25,25 25,0" />
        <path d="M0,50 Q50,50 50,0" />
        <path d="M0,75 Q75,75 75,0" />
        <path d="M0,100 Q100,100 100,0" />
      </svg>
    </div>
  );
};

/**
 * Animated Flying Bat silhouette
 */
export const SpookyBat: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28,
}) => {
  return (
    <svg
      viewBox="0 0 64 36"
      className={`fill-cream/80 drop-shadow-[0_2px_8px_rgba(123,44,191,0.6)] ${className}`}
      style={{ width: size, height: (size * 36) / 64 }}
    >
      <path d="M32,18 C28,12 20,4 6,10 C1,12 0,16 4,18 C8,20 14,19 16,24 C18,28 24,26 28,22 C30,20 31,19 32,20 C33,19 34,20 36,22 C40,26 46,28 48,24 C50,19 56,20 60,18 C64,16 63,12 58,10 C44,4 36,12 32,18 Z" />
    </svg>
  );
};

/**
 * Gothic Wax Seal Badge for verified items and senior notes
 */
export const WaxSealBadge: React.FC<{ label: string; className?: string }> = ({
  label,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-950/80 via-red-900/60 to-coven/60 border border-red-500/40 text-red-200 text-[11px] font-bold shadow-[0_2px_12px_rgba(180,30,30,0.35)] ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-red-400 animate-ping inline-block" />
      <span>{label}</span>
    </div>
  );
};

/**
 * Creeping Ambient Ghost Mist at footer and hero bases
 */
export const GhostMist: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden opacity-30 select-none">
      <div
        className="w-[200%] h-full animate-[pulse_6s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(46, 196, 182, 0.22) 0%, rgba(123, 44, 191, 0.12) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
};
