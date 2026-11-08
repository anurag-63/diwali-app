"use client";
import { useEffect, useState, Suspense } from "react";
import Confetti from "react-confetti";
import { useParams } from "next/navigation";

// 1. We create an array of your background images
const backgrounds = [
  '/diwali-bg1.jpg',
  '/diwali-bg2.jpg',
  '/diwali-bg3.jpg'
];

function GreetingContent() {
  const params = useParams();
  const code = params?.code as string;
  
  const [decodedName, setDecodedName] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  // State to track which background image is currently showing
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!code) return;
    try {
      const cleanCode = decodeURIComponent(code);
      setDecodedName(atob(cleanCode));
    } catch (e) {
      setDecodedName("Friend");
    }
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, [code]);

  // 2. This creates the slideshow effect, changing the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); 
    
    return () => clearInterval(interval); // Cleanup when the user leaves the page
  }, []);

  return (
    <>
      {/* 3. Render all backgrounds but only make the active one visible via smooth opacity transition */}
      {backgrounds.map((bg, index) => (
        <div 
          key={bg}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-0 ${
            index === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${bg}')` }}
        />
      ))}

      {/* Dark overlay to ensure text is always readable regardless of the background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-0"></div>

      <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center relative p-4">
        
        {/* 4. Immersive Confetti: Added more pieces, extra colors, and reduced gravity for a magical floaty effect */}
        <div className="absolute inset-0 pointer-events-none">
          {windowSize.width > 0 && (
            <Confetti 
              width={windowSize.width} 
              height={windowSize.height} 
              colors={['#ffaa00', '#ff0000', '#00ff00', '#ffd700', '#ff69b4', '#ffffff']} 
              numberOfPieces={250}
              gravity={0.06}
            />
          )}
        </div>
        
        {/* 5. Added animate-pulse to make the title glow like a diya, and deeper shadows for 3D depth */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] animate-pulse">
          Happy Diwali
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-200 mb-8 drop-shadow-lg">
          from the Jadhav family!
        </h2>
        
        <p className="text-xl md:text-3xl font-medium text-gray-200 mt-6">
          Wishing joy and prosperity to
        </p>
        <p className="text-5xl md:text-7xl font-bold mt-4 text-white capitalize drop-shadow-2xl border-b-4 border-orange-500 pb-2">
          {decodedName}
        </p>
      </div>
    </>
  );
}

export default function GreetingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-slate-900">
      <Suspense fallback={<div className="text-2xl font-bold text-orange-400 animate-pulse">Loading Greeting...</div>}>
        <GreetingContent />
      </Suspense>
    </div>
  );
}