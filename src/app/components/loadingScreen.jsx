'use client';
import { useEffect, useState } from 'react';
import '../style/style.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const fontLoaded = await checkFontLoaded('agatho', '/agatho/Agatho_Light.otf');
        setProgress(50);
        
        const imageLoaded = await checkImageLoaded('/bg.png');
        setProgress(80);
        
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress(100);
        
        setTimeout(onLoadingComplete, 300);
      } catch (error) {
        console.error('Loading error:', error);
        setTimeout(onLoadingComplete, 500);
      }
    };

    loadAssets();
  }, [onLoadingComplete]);

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
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <span className="text-white loading-bar text-[2em]">{progress}%</span>
    </div>
  );
}