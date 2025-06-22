"use client";

import { useEffect, useRef } from "react";
import { GraduationCap, Briefcase, Award } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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
  const cards = sectionRef.current?.querySelectorAll(".card");
  if (!cards) return;

  const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${y * -12}deg) scale(1.02)`;
  };

  const handleMouseLeave = (card: HTMLElement) => {
    card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  cards.forEach((card) => {
    const htmlCard = card as HTMLElement; // Cast to HTMLElement
    card.addEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent, htmlCard));
    card.addEventListener("mouseleave", () => handleMouseLeave(htmlCard));

    // Cleanup
    return () => {
      card.removeEventListener("mousemove", (e) => handleMouseMove(e as MouseEvent, htmlCard));
      card.removeEventListener("mouseleave", () => handleMouseLeave(htmlCard));
    };
  });
}, []);
  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 bg-transparent relative overflow-hidden"
      style={{ fontFamily: "'Helvetica', 'Arial', sans-serif" }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div
            className="absolute top-10 left-10 w-64 h-64 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 animate-glow"
            style={{ animationDuration: "2.5s" }}
          ></div>
          <div
            className="absolute bottom-12 right-12 w-72 h-72 rounded-lg bg-gradient-to-br from-green-600 to-teal-600 animate-glow"
            style={{ animationDuration: "3s", animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-56 h-56 rounded-lg bg-gradient-to-br from-orange-600 to-pink-600 animate-glow"
            style={{ animationDuration: "2.8s", animationDelay: "0.8s" }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 relative inline-block text-white"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            About Me
            <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Education Card */}
          <div className="animate-on-scroll opacity-0">
            <div
              className="card bg-black/30 backdrop-blur-md border-2 border-gray-800/50 rounded-xl p-6 relative overflow-hidden group hover:bg-black/40 hover:border-gradient-blue-purple hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
              style={{ height: "300px", width: "100%", maxWidth: "820px", margin: "auto" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-black/60 flex items-center justify-center mr-4 relative border border-blue-500/50 group-hover:border-blue-600">
                  <GraduationCap className="h-7 w-7 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                  <div
                    className="absolute inset-0 rounded-xl border border-blue-500/40 animate-spin-slow opacity-50 group-hover:opacity-100"
                    style={{ animationDuration: "5s" }}
                  ></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
                  Education
                </h3>
              </div>
              <div className="pl-18 relative z-10">
                <div className="mb-4 transform transition-transform duration-300 group-hover:translate-x-3">
                  <h4 className="text-blue-400 font-medium text-base">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
                    Shree Swaminarayan College of Computer Science, Bhavnagar
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-black/60 text-gray-300 group-hover:bg-black/70 group-hover:text-gray-200 transition-all duration-200">
                      2021 - 2024
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-500/30 rounded-xl group-hover:scale-130 transition-transform duration-300"></div>
              <div
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 opacity-70 animate-ping"
                style={{ animationDuration: "1.2s" }}
              ></div>
            </div>
          </div>

          <div className="animate-on-scroll opacity-0" style={{ animationDelay: "50ms" }}>
            <div
              className="card bg-black/30 backdrop-blur-md border-2 border-gray-800/50 rounded-xl p-6 relative overflow-hidden group hover:bg-black/40 hover:border-gradient-blue-purple hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
              style={{ height: "300px", width: "100%", maxWidth: "820px", margin: "auto" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center mb-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-black/60 flex items-center justify-center mr-4 relative border border-blue-500/50 group-hover:border-blue-600">
                  <Briefcase className="h-7 w-7 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
                  <div
                    className="absolute inset-0 rounded-xl border border-blue-500/40 animate-spin-slow opacity-50 group-hover:opacity-100"
                    style={{ animationDuration: "5s" }}
                  ></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
                  Experience
                </h3>
              </div>
              <div className="pl-18 relative z-10">
                <div className="mb-4 transform transition-transform duration-300 group-hover:translate-x-3">
                  <h4 className="text-blue-400 font-medium text-base">MERN Stack Developer</h4>
                  <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
                    1 Year of Experience
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-300 mt-2 space-y-1 group-hover:text-gray-200 transition-colors duration-200">
                    <li className="transform transition-all duration-200 hover:translate-x-1 hover:text-blue-400">
                      Developed responsive web applications
                    </li>
                    <li className="transform transition-all duration-200 hover:translate-x-1 hover:text-blue-400">
                      Implemented complex features and tasks
                    </li>
                    <li className="transform transition-all duration-200 hover:translate-x-1 hover:text-blue-400">
                      Integrated third-party services
                    </li>
                    <li className="transform transition-all duration-200 hover:translate-x-1 hover:text-blue-400">
                      Worked on full-stack development
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-500/30 rounded-xl group-hover:scale-130 transition-transform duration-300"></div>
              <div
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 opacity-70 animate-ping"
                style={{ animationDuration: "1.2s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* About Me Card */}
        <div
          className="mt-12 bg-black/30 backdrop-blur-md border-2 border-gray-800/50 rounded-xl p-6 animate-on-scroll opacity-0 relative overflow-hidden group hover:bg-black/40 hover:border-gradient-blue-purple hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
          style={{ animationDelay: "100ms" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="flex items-center mb-4 relative z-10">
            <div className="w-14 h-14 rounded-xl bg-black/60 flex items-center justify-center mr-4 relative border border-blue-500/50 group-hover:border-blue-600">
              <Award className="h-7 w-7 text-blue-400 group-hover:scale-110 transition-transform duration-200" />
              <div
                className="absolute inset-0 rounded-xl border border-blue-500/40 animate-spin-slow opacity-50 group-hover:opacity-100"
                style={{ animationDuration: "5s" }}
              ></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
              About Me
            </h3>
          </div>
          <div className="pl-18 relative z-10">
            <p className="text-sm text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-200 transform transition-transform duration-300 group-hover:translate-x-3">
              I am a passionate MERN Stack Developer with a strong foundation in building web applications. My journey
              in web development began during my BCA studies at Shree Swaminarayan College of Computer Science in
              Bhavnagar, where I developed a keen interest in creating interactive and user-friendly web experiences.
            </p>
            <p
              className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200 transform transition-transform duration-300 group-hover:translate-x-3"
              style={{ transitionDelay: "50ms" }}
            >
              With 1 year of professional experience, I've had the opportunity to work on various projects, tackle
              complex tasks, and implement third-party integrations. I'm constantly learning and improving my skills to
              stay updated with the latest technologies and best practices in web development.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-500/30 rounded-xl group-hover:scale-130 transition-transform duration-300"></div>
          <div
            className="absolute -bottom-1 -left-1 text-[8px] text-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {`const developer = { name: 'Bharat', skills: ['React', 'Node', 'MongoDB'] }`}
          </div>
          <div
            className="absolute -top-1 -right-1 text-[8px] text-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {`function createApp() { return new Promise(resolve => resolve('Success!')) }`}
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
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
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
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-ping {
          animation: ping ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 1.2s ease-in-out infinite;
        }
        .border-gradient-blue-purple {
          border-image: linear-gradient(to right, #3b82f6, #a855f7) 1;
        }
      `}</style>
    </section>
  );
}