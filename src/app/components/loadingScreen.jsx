'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const assetsToLoad = [
      { name: 'font', weight: 20 },
      { name: 'bg-image', weight: 30 },
      { name: 'lenis', weight: 20 },
      { name: 'other-assets', weight: 30 },
    ];

    let loaded = 0;
    const totalWeight = assetsToLoad.reduce((sum, asset) => sum + asset.weight, 0);

    const loadAsset = (asset) => {
      setTimeout(() => {
        loaded += asset.weight;
        const newProgress = Math.min(Math.round((loaded / totalWeight) * 100), 100);
        setProgress(newProgress);

        if (newProgress === 100) {
          setTimeout(onLoadingComplete, 500)
        }
      }, Math.random() * 500 + 100);
    };

    assetsToLoad.forEach(loadAsset);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div className="w-64 h-1 bg-gray-700 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out loading-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-white text-lg">{progress}%</span>
    </div>
  );
}