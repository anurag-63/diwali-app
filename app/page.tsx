"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const generateLink = () => {
    if (!name) return;
    // Convert the name to Base64 format
    const encodedName = btoa(name);
    // Send the user to their new custom URL
    router.push(`/w/${encodedName}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50">
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Create a Diwali Greeting</h1>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 border rounded-md mb-4 text-black"
      />
      <button 
        onClick={generateLink}
        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
      >
        Generate Magic Link
      </button>
    </div>
  );
}