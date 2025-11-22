'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import '../style/style.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const loadingRef = useRef(null);
  const progressRef = useRef(null);
  const dotsRef = useRef(null);
  const refreshCount = useRef(0);

  useEffect(() => {
    // Désactiver le défilement
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    refreshCount.current = parseInt(localStorage.getItem('refreshCount') || '0');
    localStorage.setItem('refreshCount', (refreshCount.current + 1).toString());

    gsap.from(loadingRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

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
        let minDuration;
        if (refreshCount.current === 0) {
          minDuration = 4000;
        } else if (refreshCount.current === 1) {
          minDuration = 2000;
        } else {
          minDuration = 1000;
        }

        const startTime = Date.now();
        const fontPromise = checkFontLoaded('agatho', '/agatho/Agatho_Light.otf');
        const imagePromise = checkImageLoaded('/bg.png');

        while (true) {
          const elapsed = Date.now() - startTime;
          const [fontLoaded, imageLoaded] = await Promise.all([
            Promise.race([fontPromise, Promise.resolve(false)]),
            Promise.race([imagePromise, Promise.resolve(false)])
          ]);

          const assetsLoaded = fontLoaded && imageLoaded;
          const progressRatio = Math.min(1, elapsed / minDuration);

          let currentProgress;
          if (assetsLoaded) {
            currentProgress = Math.min(100, progressRatio * 100);
          } else {
            currentProgress = Math.min(80, progressRatio * 80);
          }

          setProgress(Math.floor(currentProgress));
          gsap.to(progressRef.current, {
            width: `${currentProgress}%`,
            duration: 0.3,
            ease: 'sine.out'
          });

          if ((assetsLoaded && progressRatio >= 1) || (!assetsLoaded && elapsed >= minDuration * 1.5)) {
            break;
          }

          await new Promise(resolve => requestAnimationFrame(resolve));
        }

        setProgress(100);
        gsap.to(progressRef.current, {
          width: '100%',
          duration: 0.3,
          ease: 'sine.out'
        });

        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            // Réactiver le défilement après l'animation de disparition
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            setTimeout(onLoadingComplete, 300);
          }
        });
      } catch (error) {
        console.error('Loading error:', error);
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            // Réactiver le défilement en cas d'erreur aussi
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
            setTimeout(onLoadingComplete, 300);
          }
        });
      }
    };

    loadAssets();

    // Cleanup function en cas de démontage du composant
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [onLoadingComplete]);

  const checkFontLoaded = (fontName, fontUrl) => {
    return new Promise((resolve) => {
      const font = new FontFace(fontName, `url(${fontUrl})`);
      font.load().then(() => {
        document.fonts.add(font);
        resolve(true);
      }).catch(() => resolve(false));
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