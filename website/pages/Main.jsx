"use client";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const Main = () => {
  const { user, logout, generateRandomQuote } = useUser();
  const router = useRouter();

  const [randomQuote, setRandomQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    const handleFetchQuote = async () => {
      if (randomQuote) return;

      try {
        setLoading(true);
        const quote = await generateRandomQuote();
        setRandomQuote(quote);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleFetchQuote();
  }, []);

  return (
    <div className="flex flex-col w-full h-screen">
      <header className="flex items-center py-2 justify-between px-10 bg-blue-500/10 border-b border-black/10">
        <h1>Hi {user?.email}</h1>

        <button
          onClick={logout}
          className="px-4 py-1 bg-blue-500 text-white rounded-full"
          type="button"
        >
          Logout
        </button>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <quote className="text-2xl">
          ”{loading ? "Loading..." : randomQuote}„
        </quote>
      </div>
    </div>
  );
};

export default Main;
