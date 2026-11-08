"use client";
import { useEffect, useState, Suspense } from "react";
import { Fireworks } from "@fireworks-js/react";
import { useParams } from "next/navigation";

const backgrounds = [
  '/diwali-bg1.jpg',
  '/diwali-bg2.jpg',
  '/diwali-bg3.jpg', 
  '/diwali-bg4.jpg'
];

function GreetingContent() {
  const params = useParams();
  const code = params?.code as string;
  
  const [decodedName, setDecodedName] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (!code) return;
    try {
      const cleanCode = decodeURIComponent(code);
      setDecodedName(atob(cleanCode));
    } catch (e) {
      setDecodedName("Friend");
    }
  }, [code]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); 
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 1. IMAGE FIX: w-full and h-full ensures it perfectly bounds to the parent container */}
      {backgrounds.map((bg, index) => (
        <div 
          key={bg}
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 z-0 ${
            index === bgIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${bg}')` }}
        />
      ))}

      {/* 2. LIGHTING EFFECT: A pulsing radial gradient simulating a glowing Diya from the bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-600/40 via-black/50 to-black/80 z-0 animate-pulse mix-blend-multiply"></div>

      {/* 3. CRACKER EFFECT: High-performance canvas fireworks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Fireworks
          options={{
            opacity: 0.5,
            particles: 150,
            explosion: 7,
            intensity: 40,
            friction: 0.96,
            traceSpeed: 3,
            brightness: { min: 50, max: 80, decay: { min: 0.015, max: 0.03 } },
            mouse: { click: false, move: false, max: 1 }
          }}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
      </div>

      {/* Foreground Text with heavy glowing shadows */}
      <div className="z-10 flex flex-col items-center justify-center w-full h-full text-center relative p-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 mb-2 drop-shadow-[0_0_20px_rgba(255,165,0,1)] animate-bounce">
          Happy Diwali
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-200 mb-8 drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]">
          from the Jadhav family!
        </h2>
        
        <p className="text-xl md:text-3xl font-medium text-gray-100 mt-6 drop-shadow-md">
          Wishing joy and prosperity to
        </p>
        <p className="text-5xl md:text-7xl font-bold mt-4 text-white capitalize drop-shadow-[0_0_25px_rgba(255,255,255,1)] border-b-4 border-orange-500 pb-2">
          {decodedName}
        </p>
      </div>
    </>
  );
}

export default function GreetingPage() {
  return (
    // IMAGE FIX: Replaced min-h-screen with h-[100dvh] (Dynamic Viewport Height). 
    // This strictly locks the height to exactly what the mobile browser shows, ignoring the search bar.
    <div className="flex flex-col items-center justify-center h-[100dvh] w-full relative overflow-hidden bg-black">
      <Suspense fallback={<div className="text-2xl font-bold text-orange-400 animate-pulse">Loading Greeting...</div>}>
        <GreetingContent />
      </Suspense>
    </div>
  );
}