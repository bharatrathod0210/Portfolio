"use client";

import { useEffect, useRef, useState } from "react";

interface TechLogo {
  name: string;
  color: string;
  icon: string;
  rotation: number;
  scale: number;
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const logosContainerRef = useRef<HTMLDivElement>(null);
  const [logos, setLogos] = useState<TechLogo[]>([
    { name: "HTML5", icon: "/placeholder.svg?height=50&width=50", color: "#E34F26", rotation: 0, scale: 1 },
    { name: "CSS3", icon: "/placeholder.svg?height=50&width=50", color: "#1572B6", rotation: 0, scale: 1 },
    { name: "JavaScript", icon: "/placeholder.svg?height=50&width=50", color: "#F7DF1E", rotation: 0, scale: 1 },
    { name: "TypeScript", icon: "/placeholder.svg?height=50&width=50", color: "#3178C6", rotation: 0, scale: 1 },
    { name: "React", icon: "/placeholder.svg?height=50&width=50", color: "#61DAFB", rotation: 0, scale: 1 },
    { name: "Node.js", icon: "/placeholder.svg?height=50&width=50", color: "#339933", rotation: 0, scale: 1 },
    { name: "Express", icon: "/placeholder.svg?height=50&width=50", color: "#000000", rotation: 0, scale: 1 },
    { name: "MongoDB", icon: "/placeholder.svg?height=50&width=50", color: "#47A248", rotation: 0, scale: 1 },
    { name: "Redux", icon: "/placeholder.svg?height=50&width=50", color: "#764ABC", rotation: 0, scale: 1 },
    { name: "Next.js", icon: "/placeholder.svg?height=50&width=50", color: "#000000", rotation: 0, scale: 1 },
    { name: "Tailwind CSS", icon: "/placeholder.svg?height=50&width=50", color: "#06B6D4", rotation: 0, scale: 1 },
    { name: "Git", icon: "/placeholder.svg?height=50&width=50", color: "#F05032", rotation: 0, scale: 1 },
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideIn");
          }
        });
      },
      { threshold: 0.2 },
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const animateLogos = () => {
      setLogos((prevLogos) =>
        prevLogos.map((logo) => ({
          ...logo,
          rotation: Math.random() * 5 - 2.5,
          scale: 0.95 + Math.random() * 0.1,
        })),
      );
    };

    const interval = setInterval(animateLogos, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = logosContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      const logoElements = container.querySelectorAll(".logo-item");
      logoElements.forEach((el) => {
        const rotateY = x * 12;
        const rotateX = y * -12;
        el.setAttribute(
          "style",
          `transform: perspective(600px) rotateY(${rotateY}deg) rotateX(${rotateX}deg);`,
        );
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          <div
            className="absolute top-12 left-12 w-48 h-48 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 animate-glow"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute bottom-16 right-16 w-64 h-64 rounded-lg bg-gradient-to-br from-green-600 to-teal-600 animate-glow"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-40 h-40 rounded-lg bg-gradient-to-br from-orange-600 to-pink-600 animate-glow"
            style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 relative inline-block text-white"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            My Skills
            <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          </h2>
          <p className="text-base text-gray-300 max-w-3xl mx-auto">
            A showcase of the technologies and tools I leverage to build modern, scalable web applications.
          </p>
        </div>

        <div
          ref={logosContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 perspective-600"
        >
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="logo-item animate-on-scroll opacity-0 bg-black/40 border-2 border-gray-800 rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:bg-black/60 hover:border-gradient-blue-purple hover:shadow-xl hover:shadow-blue-500/30 group"
              style={{
                animationDelay: `${index * 50}ms`,
                width: "110px",
                height: "110px",
                transition:
                  "transform 0.8s ease-in-out, border-color 0.3s, box-shadow 0.3s, background-color 0.3s",
              }}
            >
              <div
                className="w-14 h-14 mb-2 flex items-center justify-center rounded-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: `${logo.color}10` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div
                  className="w-10 h-10 bg-black/70 rounded-lg flex items-center justify-center relative z-10 border border-gray-700 group-hover:border-blue-500"
                  style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)" }}
                >
                  <span
                    className="text-xl font-bold transition-all duration-200 group-hover:scale-110"
                    style={{ color: logo.color }}
                  >
                    {logo.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-blue-500/15 rounded-lg group-hover:scale-120 transition-transform duration-400"></div>
              </div>
              <h3
                className="text-xs font-semibold text-gray-200 group-hover:text-blue-400 transition-colors duration-200"
                style={{ fontFamily: "'Helvetica', 'Arial', sans-serif", fontSize: "0.8rem" }}
              >
                {logo.name}
              </h3>
              <div
                className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-blue-500 opacity-70 animate-ping"
                style={{ animationDuration: "1.5s", animationDelay: `${index * 0.05}s` }}
              ></div>
            </div>
          ))}
        </div>

        <div className="mt-16 animate-on-scroll opacity-0">
          <div className="bg-black/40 border-2 border-gray-800 rounded-xl p-6 relative overflow-hidden group hover:border-gradient-blue-purple transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

            <h3
              className="text-xl font-bold mb-4 relative text-white"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Development Workflow
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-400"></span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {[
                {
                  step: 1,
                  title: "Planning & Design",
                  desc: "Analyzing requirements, creating wireframes, and architecting scalable solutions.",
                },
                {
                  step: 2,
                  title: "Development",
                  desc: "Crafting clean, efficient, and modular code adhering to industry standards.",
                },
                {
                  step: 3,
                  title: "Testing & Deployment",
                  desc: "Rigorous testing, optimization, and seamless deployment to production.",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="bg-black/60 rounded-lg p-4 border-2 border-gray-800 transition-all duration-300 hover:bg-black/70 hover:border-gradient-blue-purple hover:shadow-lg hover:shadow-blue-500/20 group/item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-black/80 flex items-center justify-center mb-3 relative border border-blue-500/40 group-hover/item:border-blue-500">
                    <span
                      className="text-blue-400 font-bold text-lg relative z-10 group-hover/item:scale-105 transition-transform duration-200"
                      style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
                    >
                      {item.step}
                    </span>
                    <div
                      className="absolute inset-0 rounded-lg border border-blue-500/30 animate-spin-slow opacity-50 group-hover/item:opacity-100"
                      style={{ animationDuration: "6s", animationDelay: `${index * 0.5}s` }}
                    ></div>
                  </div>
                  <h4
                    className="text-sm font-semibold mb-2 text-gray-200 group-hover/item:text-blue-400 transition-colors duration-200"
                    style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-xs text-gray-400 group-hover/item:text-gray-300 transition-colors duration-200"
                    style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.15;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
        }
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes ping {
          0% {
            transform: scale(0.5);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.5);
            opacity: 0.7;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-ping {
          animation: ping ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        .perspective-600 {
          perspective: 600px;
        }
        .border-gradient-blue-purple {
          border-image: linear-gradient(to right, #3b82f6, #a855f7) 1;
        }
      `}</style>
    </section>
  );
}