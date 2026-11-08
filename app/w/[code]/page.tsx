"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useParams } from "next/navigation"; // 1. Import the client-side hook

export default function GreetingPage() {
  // 2. Safely grab the code from the URL using the hook
  const params = useParams();
  const code = params?.code as string;
  
  const [decodedName, setDecodedName] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!code) return;

    try {
      // 3. Clean the URL-encoded characters (like %3D back to =) before decoding
      const cleanCode = decodeURIComponent(code);
      setDecodedName(atob(cleanCode));
    } catch (e) {
      setDecodedName("Friend");
    }

    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, [code]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white text-center p-4">
      {windowSize.width > 0 && (
        <Confetti width={windowSize.width} height={windowSize.height} colors={['#ffaa00', '#ff0000', '#00ff00']} />
      )}
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-6 drop-shadow-lg">
        Happy Diwali!
      </h1>
      <p className="text-2xl md:text-4xl font-medium">
        Wishing you joy and prosperity,
      </p>
      <p className="text-4xl md:text-6xl font-bold mt-8 text-yellow-300 capitalize">
        {decodedName}
      </p>
    </div>
  );
}