"use client";
import { useEffect, useState, Suspense } from "react";
import Confetti from "react-confetti";
import { useParams } from "next/navigation";

// 1. Create an inner component that handles the dynamic URL logic
function GreetingContent() {
  const params = useParams();
  const code = params?.code as string;
  
  const [decodedName, setDecodedName] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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

  return (
    <>
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
    </>
  );
}

// 2. The main page wraps the inner component in a Suspense boundary
export default function GreetingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white text-center p-4">
      <Suspense fallback={<div className="text-2xl font-bold text-orange-400 animate-pulse">Loading Greeting...</div>}>
        <GreetingContent />
      </Suspense>
    </div>
  );
}