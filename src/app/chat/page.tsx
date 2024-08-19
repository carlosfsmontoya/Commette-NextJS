'use client'

import React, { useEffect, useState } from 'react';
import { GetMessage } from "@/services/chat";

export default function Page() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const data = await GetMessage();
        setMessage(data.message); // Asumiendo que la respuesta tiene una propiedad 'message'
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchMessage();
  }, []);

  return (
    <div>
      <h1>Page</h1>
      {error && <p>Error: {error}</p>}
      {message ? <p>Message: {message}</p> : <p>Loading...</p>}
    </div>
  );
}