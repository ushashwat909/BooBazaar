import React, { useEffect, useRef } from 'react';
import { ArrowRight, Scroll, Sparkles, ShieldCheck, History, Award } from 'lucide-react';
import { Magnetic } from '../ui/Magnetic';
import { gsap } from '../../utils/animations';

interface ImmersiveStorySectionProps {
  onDiscoverStory?: () => void;
}

export const ImmersiveStorySection: React.FC<ImmersiveStorySectionProps> = ({
  onDiscoverStory,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const largeImgRef = useRef<HTMLDivElement>(null);
  const smallImgRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. Intersection Observer for Smooth Scroll Reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Animate Text Column Elements
            if (textColRef.current) {
              const elements = textColRef.current.querySelectorAll('.story-anim');
              tl.fromTo(
                elements,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }
              );
            }

            // Animate Large Image
            if (largeImgRef.current) {
              tl.fromTo(
                largeImgRef.current,
                { opacity: 0, scale: 0.94, y: 25 },
                { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'power3.out' },
                '-=0.8'
              );
            }

            // Animate Overlapping Small Image
            if (smallImgRef.current) {
              tl.fromTo(
                smallImgRef.current,
                { opacity: 0, scale: 0.9, y: 35, x: -15 },
                { opacity: 1, scale: 1, y: 0, x: 0, duration: 1, ease: 'back.out(1.4)' },
                '-=0.7'
              );
            }

            // Animate Floating Stamp Badge
            if (badgeRef.current) {
              tl.fromTo(
                badgeRef.current,
                { opacity: 0, scale: 0.6, rotate: -20 },
                { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(2)' },
                '-=0.5'
              );
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    // 2. Restrained Parallax Physics on Mouse Movement
    const largeX = gsap.quickTo(largeImgRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
    const largeY = gsap.quickTo(largeImgRef.current, 'y', { duration: 1.4, ease: 'power2.out' });

    const smallX = gsap.quickTo(smallImgRef.current, 'x', { duration: 1.1, ease: 'power2.out' });
    const smallY = gsap.quickTo(smallImgRef.current, 'y', { duration: 1.1, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;

      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Restrained differential movement creates authentic photographic depth
      largeX(-normX * 8);
      largeY(-normY * 6);

      smallX(normX * 14);
      smallY(normY * 12);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleCtaClick = () => {
    if (onDiscoverStory) {
      onDiscoverStory();
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full py-24 sm:py-32 bg-obsidian-surface/40 overflow-hidden select-none border-y border-gold/15"
    >
      {/* Background Cinematic Atmosphere & Light Beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-coven/15 rounded-full blur-[170px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(197, 160, 89, 0.4) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: ASYMMETRICAL OVERLAPPING EDITORIAL IMAGERY */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 relative pb-12 sm:pb-16 lg:pb-0">
            {/* Ambient Backing Glow */}
            <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-2xl pointer-events-none" />

            {/* 1. Large Primary Historical Photograph */}
            <div
              ref={largeImgRef}
              className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-gold/30 shadow-2xl group will-change-transform z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85"
                alt="Subterranean 18th-century arches where the barter covenant was born"
                className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent pointer-events-none" />

              {/* Bottom Inscription Caption on Image */}
              <div className="absolute bottom-6 inset-x-6 z-20">
                <span className="text-[10px] font-cinzel tracking-widest text-gold uppercase block">
                  Archive Plate IV • Subterranean Vaults
                </span>
                <p className="text-xs text-cream/90 font-cinzel italic mt-0.5">
                  "Where whispered negotiations bypassed textbook cartels since the winter of 1928."
                </p>
              </div>
            </div>

            {/* 2. Smaller Overlapping Photograph */}
            <div
              ref={smallImgRef}
              className="absolute -bottom-6 -right-3 sm:-bottom-10 sm:-right-8 w-3/5 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-gold/50 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-20 group will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=85"
                alt="Preserved handwritten manuscripts and student formula scrolls"
                className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-[10px] font-cinzel font-semibold text-gold-bright truncate">
                Handwritten Valedictorian Folio • Circulating
              </div>
            </div>

            {/* 3. Floating Vintage Wax Seal / Heritage Stamp */}
            <div
              ref={badgeRef}
              className="absolute -top-5 -left-3 sm:-top-8 sm:-left-6 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-obsidian-surface via-obsidian to-gold-dark/40 border border-gold/60 shadow-gold-glow flex flex-col items-center justify-center text-center p-2 backdrop-blur-md"
            >
              <div className="w-full h-full rounded-full border border-dashed border-gold/40 flex flex-col items-center justify-center p-1">
                <History className="w-4 h-4 text-gold mb-0.5" />
                <span className="text-[8px] font-cinzel font-bold text-gold uppercase tracking-widest leading-tight">
                  EST. 1928
                </span>
                <span className="text-[7px] font-cinzel text-cream/70 uppercase tracking-tighter">
                  CAMPUS PACT
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: DOCUMENTARY STORYTELLING & THREE FACTS */}
          {/* ========================================================= */}
          <div ref={textColRef} className="lg:col-span-6 space-y-7">
            {/* Small Uppercase Section Label */}
            <div className="story-anim inline-flex items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-cinzel font-bold tracking-[0.25em] uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>CHAPTER II • THE ARCHIVAL ORIGINS</span>
              </div>
            </div>

            {/* Powerful Headline */}
            <div className="story-anim space-y-2">
              <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-cream tracking-tight leading-[1.12]">
                BENEATH THE STONE ARCS,{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-bright via-gold to-potion-gold">
                  A CENTURY OF SECRETS.
                </span>
              </h2>
            </div>

            {/* Storytelling Paragraph */}
            <p className="story-anim text-sm sm:text-base text-cream/90 font-normal leading-relaxed">
              In the freezing winter of 1928, when textbook fees exceeded a scholar’s monthly stipend
              and laboratory instruments were hoarded behind locked department doors, students
              discovered the forgotten 18th-century subterranean stone chambers beneath the Quad.
              Gathering by candlelight in total darkness, they struck a solemn covenant: no student
              would fail for lack of tools, and no paper currency would ever change hands in the
              vaults.
            </p>

            {/* Three Interesting Historical Facts with Editorial Hierarchy */}
            <div className="story-anim space-y-4 pt-2">
              {/* Fact 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card/80 border border-gold/20 flex gap-4 items-start shadow-md group hover:border-gold/50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold border border-gold/30 font-cinzel font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  I
                </div>
                <div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-cream">
                    The 1928 Winter Covenant
                  </h3>
                  <p className="text-xs text-lavender-muted leading-relaxed mt-0.5">
                    Over 8,400 sacred exam guides and drafting kits have circulated continuously
                    through nine campus generations without a single rupee or pound exchanged.
                  </p>
                </div>
              </div>

              {/* Fact 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card/80 border border-gold/20 flex gap-4 items-start shadow-md group hover:border-gold/50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold border border-gold/30 font-cinzel font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  II
                </div>
                <div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-cream">
                    Subterranean Acoustic Shielding
                  </h3>
                  <p className="text-xs text-lavender-muted leading-relaxed mt-0.5">
                    The porous 18th-century stone arches absorb acoustic reverberations, allowing
                    whispering barter conclaves to remain completely undetected by night wardens
                    above.
                  </p>
                </div>
              </div>

              {/* Fact 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-obsidian-card/80 border border-gold/20 flex gap-4 items-start shadow-md group hover:border-gold/50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold border border-gold/30 font-cinzel font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  III
                </div>
                <div>
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-cream">
                    The Living Relic Pedigree
                  </h3>
                  <p className="text-xs text-lavender-muted leading-relaxed mt-0.5">
                    Every bartered relic carries the handwritten room inscriptions of its previous
                    owners—forming an unbroken historical lineage of student camaraderie spanning 96
                    years.
                  </p>
                </div>
              </div>
            </div>

            {/* Discover Our Story CTA */}
            <div className="story-anim pt-3">
              <Magnetic strength={0.8}>
                <button
                  onClick={handleCtaClick}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold via-gold-bright to-gold-dark text-obsidian font-cinzel font-bold text-xs uppercase tracking-[0.2em] shadow-gold-glow hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group"
                >
                  <span>DISCOVER OUR FULL STORY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

