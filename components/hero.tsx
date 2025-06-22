"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, FileText, Github } from "lucide-react";

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const text = "MERN Stack Developer";
    let index = 0;
    let direction = 1;
    let timer: NodeJS.Timeout;

    const typeText = () => {
      if (!textElement) return;

      if (direction === 1) {
        index++;
        textElement.textContent = text.substring(0, index);

        if (index >= text.length) {
          direction = 0;
          timer = setTimeout(typeText, 1500);
          return;
        }
      } else {
        index--;
        textElement.textContent = text.substring(0, index);

        if (index <= 0) {
          direction = 1;
          timer = setTimeout(typeText, 500);
          return;
        }
      }

      const speed = direction === 1 ? 100 : 50;
      timer = setTimeout(typeText, speed);
    };

    timer = setTimeout(typeText, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      container.style.transform = `perspective(1000px) rotateY(${
        x * 5
      }deg) rotateX(${y * -5}deg)`;
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black"
      style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-blue-900/20 animate-float top-10 left-10"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-900/20 animate-float bottom-20 right-20" style={{ animationDelay: "1s" }}></div>
        <div className="absolute w-48 h-48 rounded-full bg-green-900/20 animate-float top-1/3 right-1/4" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col items-center text-center bg-black/30 rounded-2xl py-10 px-6 shadow-xl">
          {/* Welcome badge */}
          <div
            className="mb-4 px-4 py-2 text-sm text-white font rounded-full bg-gradient-to-r from-blue-800 to-purple-800 shadow-lg animate-bounce-slow border border-white/20"
            style={{ fontFamily: "'Brush Script MT', cursive", fontSize: "1.4rem" }}
          >
            Welcome to my portfolio
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl md:text-5xl font-semibold mb-4 animate-gradient"
            style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
          >
            Hi, I'm{" "}
            <span
              className="relative text-5xl md:text-6xl text-white"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Bharat Rathod
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></span>
            </span>
          </h1>

          {/* Typing animation */}
          <h2
            ref={textRef}
            className="text-xl md:text-2xl mb-6 h-8 text-gray-200 tracking-tight"
            style={{ fontFamily: "'Brush Script MT', cursive", minHeight: "2rem" }}
          ></h2>

          {/* Description */}
          <p
            className="max-w-3xl text-sm md:text-base mb-8 text-gray-300 leading-relaxed animate-fadeInUp"
            style={{ fontFamily: "'Helvetica', 'Arial', sans-serif", animationDelay: "200ms" }}
          >
            Crafting responsive web applications with cutting-edge MERN stack technologies. With over a year of experience, I specialize in seamless third-party integrations and complex project solutions.
          </p>

          {/* Buttons */}
          <div
            ref={containerRef}
            className="flex flex-col sm:flex-row gap-4 animate-fadeInUp transition-transform duration-300 ease-out"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              onClick={scrollToProjects}
              className="bg-gradient-to-r from-blue-800 to-purple-800 hover:from-blue-900 hover:to-purple-900 text-white font-semibold text-sm py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border border-white/20"
              style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
            >
              <span className="relative z-10">View Projects</span>
              <ArrowDown className="ml-2 h-3 w-3 animate-bounce" />
            </Button>

            <Button
              variant="outline"
              className="border-2 border-blue-300 text-blue-300 hover:bg-blue-300/10 font-semibold text-sm py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 bg-black/20"
              style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
              asChild
            >
              <a
                href="https://github.com/bharatrathod0210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-1 h-3 w-3" /> GitHub Profile
              </a>
            </Button>

            <Button
              variant="outline"
              className="border-2 border-purple-300 text-purple-300 hover:bg-purple-300/10 font-semibold text-sm py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 bg-black/20"
              style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
              asChild
            >
              <a
                href="https://drive.google.com/file/d/1_CMeQ72y5W9mJ3S-yJypK3E4bb8d8EgU/view?usp=drive_link"
                download="Bharat_Rathod_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-1 h-3 w-3" /> Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <ArrowDown className="h-6 w-6 text-blue-300" />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}