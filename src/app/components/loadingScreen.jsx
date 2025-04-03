'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import '../style/style.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef(null);
  const progressRef = useRef(null);
  const dotsRef = useRef(null);

  useEffect(() => {
    // Initial GSAP setup
    gsap.from(loadingRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Animated dots
    gsap.to(dotsRef.current.children, {
      opacity: 0.3,
      y: -5,
      duration: 0.6,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    const loadAssets = async () => {
      try {
        // Phase 1: 0-50% with variable timing
        await animateProgress(0, 50, 1.5 + Math.random() * 1);
        
        const fontLoaded = await checkFontLoaded('agatho', '/agatho/Agatho_Light.otf');
        
        // Phase 2: 50-80% with variable timing
        await animateProgress(50, 80, 1 + Math.random() * 1.5);
        
        const imageLoaded = await checkImageLoaded('/bg.png');
        
        // Final phase: 80-100% with variable timing
        await animateProgress(80, 100, 0.8 + Math.random() * 0.7);
        
        // Complete animation
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            setTimeout(onLoadingComplete, 300);
          }
        });
      } catch (error) {
        console.error('Loading error:', error);
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setTimeout(onLoadingComplete, 300)
        });
      }
    };

    loadAssets();
  }, [onLoadingComplete]);

  const animateProgress = (start, end, duration) => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;
      
      const updateProgress = () => {
        const now = Date.now();
        const progressTime = Math.min(1, (now - startTime) / (duration * 1000));
        const currentProgress = start + (end - start) * progressTime;
        
        setProgress(Math.floor(currentProgress));
        
        // Animate the progress bar with GSAP
        gsap.to(progressRef.current, {
          width: `${currentProgress}%`,
          duration: 0.3,
          ease: 'sine.out'
        });
        
        if (now < endTime) {
          requestAnimationFrame(updateProgress);
        } else {
          setProgress(end);
          resolve();
        }
      };
      
      requestAnimationFrame(updateProgress);
    });
  };

  const checkFontLoaded = (fontName, fontUrl) => {
    return new Promise((resolve) => {
      const font = new FontFace(fontName, `url(${fontUrl})`);
      
      font.load().then(() => {
        document.fonts.add(font);
        resolve(true);
      }).catch(() => {
        resolve(false);
      });
    });
  };

  const checkImageLoaded = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageUrl;
      
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  return (
    <div 
      ref={loadingRef}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #000 100%)'
      }}
    >
      <div className="relative w-full max-w-[400px] px-8">
        <div className="h-[2px] bg-gray-700 w-full mb-4 overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-white"
            style={{ width: '0%' }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white text-xs uppercase tracking-widest">Loading</span>
          <span className="text-white text-xs uppercase tracking-widest">{progress}%</span>
        </div>
        
        <div ref={dotsRef} className="flex justify-center gap-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-2 bg-white rounded-full opacity-30"
              style={{
                backgroundColor: i === 0 ? '#be5b2a' : i === 1 ? '#b6a897' : '#828d94'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}