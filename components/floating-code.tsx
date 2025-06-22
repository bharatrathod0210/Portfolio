"use client";

import { useEffect, useRef } from "react";

interface CodeSnippet {
  x: number;
  y: number;
  text: string;
  opacity: number;
  speed: number;
}

export default function FloatingCode() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snippetsRef = useRef<CodeSnippet[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const codeSnippets = [
      "const App = () => { return <div>Bharat Rathod</div> }",
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSnippets();
    };

    const initSnippets = () => {
      snippetsRef.current = [];
      const numberOfSnippets = 15;

      for (let i = 0; i < numberOfSnippets; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const text =
          codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const opacity = Math.random() * 0.1 + 0.05;
        const speed = Math.random() * 0.3 + 0.1;

        snippetsRef.current.push({ x, y, text, opacity, speed });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snippetsRef.current.forEach((snippet) => {
        // Update position
        snippet.y += snippet.speed;

        // Reset if off screen
        if (snippet.y > canvas.height) {
          snippet.y = -30;
          snippet.x = Math.random() * canvas.width;
        }

        // Draw text
        ctx.font = "12px monospace";
        ctx.fillStyle = `rgba(88, 166, 255, ${snippet.opacity})`;
        ctx.fillText(snippet.text, snippet.x, snippet.y);
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
