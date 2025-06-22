"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        scrolled ? "bg-[#161b22]/80 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span
              className="text-xl font-bold text-[#58a6ff]"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              Bharat Rathod
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["home", "about", "skills", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm hover:text-[#58a6ff] transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://github.com/bharatrathod0210"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-[#30363d] hover:text-[#58a6ff]"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/bharat-rathod-876b2a288/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-[#30363d] hover:text-[#58a6ff]"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://www.instagram.com/theindia_rathod/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-[#30363d] hover:text-[#58a6ff]"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-md bg-[#161b22]/80 border-t border-[#30363d] animate-fadeIn">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {["home", "about", "skills", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm py-2 hover:text-[#58a6ff] transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}

            <div className="flex items-center space-x-4 pt-2">
              <Link
                href="https://github.com/bharatrathod0210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-[#30363d] hover:text-[#58a6ff]"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/bharat-rathod-876b2a288/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-[#30363d] hover:text-[#58a6ff]"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link
                href="https://www.instagram.com/theindia_rathod/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-[#30363d] hover:text-[#58a6ff]"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}