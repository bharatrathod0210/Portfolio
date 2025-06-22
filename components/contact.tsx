"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slideIn");
          }
        });
      },
      { threshold: 0.2 }
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
      card.style.transform = `perspective(800px) rotateY(${
        x * 12
      }deg) rotateX(${y * -12}deg) scale(1.02)`;
    };

    const handleMouseLeave = (card: HTMLElement) => {
      card.style.transform =
        "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    };

    cards.forEach((card) => {
      const htmlCard = card as HTMLElement; // Cast to HTMLElement
      card.addEventListener("mousemove", (e) =>
        handleMouseMove(e as MouseEvent, htmlCard)
      );
      card.addEventListener("mouseleave", () => handleMouseLeave(htmlCard));

      // Cleanup
      return () => {
        card.removeEventListener("mousemove", (e) =>
          handleMouseMove(e as MouseEvent, htmlCard)
        );
        card.removeEventListener("mouseleave", () =>
          handleMouseLeave(htmlCard)
        );
      };
    });
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 bg-black relative overflow-hidden"
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
            Get In Touch
            <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          </h2>
          <p className="mt-6 text-base text-gray-300 max-w-2xl mx-auto">
            Feel free to contact me for any work or suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information Card */}
          <div className="animate-on-scroll opacity-0">
            <div
              className="card bg-black/30 backdrop-blur-md border-2 border-gray-800/50 rounded-xl p-6 h-full relative overflow-hidden group hover:bg-black/40 hover:border-gradient-blue-purple hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
              style={{ minHeight: "420px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-xl font-semibold mb-6 text-gray-100 group-hover:text-blue-400 transition-colors duration-200 relative z-10">
                Contact Information
              </h3>
              <div className="space-y-6 relative z-10">
                {[
                  {
                    icon: <Mail className="h-5 w-5 text-blue-400" />,
                    title: "Email",
                    value: "bharat.rathod0210@gmail.com",
                    delay: "0ms",
                  },
                  {
                    icon: <Phone className="h-5 w-5 text-blue-400" />,
                    title: "Phone",
                    value: "+91 9898515206",
                    delay: "100ms",
                  },
                  {
                    icon: <MapPin className="h-5 w-5 text-blue-400" />,
                    title: "Location",
                    value: "Bhavnagar, Gujarat, India",
                    delay: "200ms",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start transform transition-transform duration-300 group-hover:translate-x-3"
                    style={{ transitionDelay: item.delay }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-black/60 flex items-center justify-center mr-4 relative border border-blue-500/50 group-hover:border-blue-600">
                      {item.icon}
                      <div
                        className="absolute inset-0 rounded-lg border border-blue-500/40 animate-spin-slow opacity-50 group-hover:opacity-100"
                        style={{ animationDuration: "5s" }}
                      ></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 relative z-10">
                <h4 className="text-sm font-medium mb-4 text-gray-100 group-hover:text-blue-400 transition-colors duration-200">
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  {[
                    {
                      icon: <Github className="h-5 w-5" />,
                      href: "https://github.com/bharatrathod0210",
                    },
                    {
                      icon: <Linkedin className="h-5 w-5" />,
                      href: "https://www.linkedin.com/in/bharat-rathod-876b2a288/",
                    },
                    {
                      icon: <Instagram className="h-5 w-5" />,
                      href: "https://www.instagram.com/theindia_rathod/",
                    },
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-black/60 border-blue-500/50 hover:bg-black/70 hover:border-blue-600 text-blue-400 relative overflow-hidden group"
                      asChild
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="absolute inset-0 w-full h-full bg-blue-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                        {social.icon}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-500/30 rounded-xl group-hover:scale-130 transition-transform duration-300"></div>
              <div
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 opacity-70 animate-ping"
                style={{ animationDuration: "1.2s" }}
              ></div>
            </div>
          </div>

          {/* Send Message Card */}
          <div
            className="animate-on-scroll opacity-0"
            style={{ animationDelay: "50ms" }}
          >
            <div
              className="card bg-black/30 backdrop-blur-md border-2 border-gray-800/50 rounded-xl p-6 relative overflow-hidden group hover:bg-black/40 hover:border-gradient-blue-purple hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300"
              style={{ minHeight: "420px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-xl font-semibold mb-6 text-gray-100 group-hover:text-blue-400 transition-colors duration-200 relative z-10">
                Send Me a Message
              </h3>
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: "name", placeholder: "Your Name", type: "text" },
                    { name: "email", placeholder: "Your Email", type: "email" },
                    { name: "subject", placeholder: "Subject", type: "text" },
                  ].map((field, index) => (
                    <div key={field.name} className="relative group">
                      <Input
                        name={field.name}
                        type={field.type}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="bg-black/60 border-gray-800/50 focus:border-blue-500 focus:ring-blue-500/50 text-gray-200 transition-all duration-300 group-hover:border-blue-500/50"
                        required
                      />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                    </div>
                  ))}
                  <div className="relative group">
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      className="bg-black/60 border-gray-800/50 focus:border-blue-500 focus:ring-blue-500/50 text-gray-200 min-h-[120px] transition-all duration-300 group-hover:border-blue-500/50"
                      required
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient-x"></span>
                          <span className="relative z-10">Message Sent!</span>
                        </>
                      ) : (
                        <>
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-500/30 rounded-xl group-hover:scale-130 transition-transform duration-300"></div>
              <div
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 opacity-70 animate-ping"
                style={{ animationDuration: "1.2s" }}
              ></div>
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
          0%,
          100% {
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
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes gradient-x {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
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
        .animate-gradient-x {
          animation: gradient-x 3s linear infinite;
        }
        .border-gradient-blue-purple {
          border-image: linear-gradient(to right, #3b82f6, #a855f7) 1;
        }
      `}</style>
    </section>
  );
}
