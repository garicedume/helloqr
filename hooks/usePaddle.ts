"use client";

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function usePaddle(): Paddle | undefined {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    const environment = "production";
    const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;

    if (!token) return;

    initializePaddle({ environment, token })
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      })
      .catch((error) => {
        console.error("Error al inicializar Paddle:", error);
      });
  }, []);

  return paddle;
}