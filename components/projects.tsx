"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  Code,
  Star,
  GitFork,
  Users,
  CreditCard,
  Link,
  Database,
  Shield,
  Zap,
} from "lucide-react";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Cloud Job Manager",
      description:
        "A comprehensive job management platform with 4 panels: Super Admin, Company, Worker, and Customer. Companies can create customers and workers, generate work quotes, contracts, and invoices with integrated payment gateways.",
      image: "/placeholder.svg?height=200&width=400",
      category: "fullstack",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Stripe",
        "PayPal",
        "Apple Pay",
      ],
      github: "#",
      demo: "https://app.cloudjobmanager.com",
      features: [
        "4-Panel System (Super Admin, Company, Worker, Customer)",
        "Quote & Contract Management",
        "Invoice Generation & Payment Processing",
        "Multiple Payment Gateways (Stripe, PayPal, Apple Pay)",
        "User Role Management",
        "Real-time Notifications",
      ],
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Track Backlinks",
      description:
        "An automated backlink monitoring system that runs on cron jobs to track backlink status, count, and provides success/failure reports with detailed analytics.",
      image: "/placeholder.svg?height=200&width=400",
      category: "fullstack",
      technologies: [
        "React",
        "Node.js",
        "Cron Jobs",
        "MongoDB",
        "Express",
        "Analytics",
      ],
      github: "#",
      demo: "https://app.trackbacklinks.io",
      features: [
        "Automated Cron Job Monitoring",
        "Backlink Count Tracking",
        "Success/Failure Reporting",
        "Link Discovery & Validation",
        "Real-time Analytics Dashboard",
        "Email Notifications",
      ],
      icon: <Link className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "API Service Platform",
      description:
        "A robust RESTful API service for data management with comprehensive authentication, authorization, and scalable architecture for enterprise applications.",
      image: "/placeholder.svg?height=200&width=400",
      category: "backend",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Redis", "Docker"],
      github: "#",
      demo: "#",
      features: [
        "RESTful API Architecture",
        "JWT Authentication & Authorization",
        "Rate Limiting & Security",
        "Data Validation & Sanitization",
        "Comprehensive Documentation",
        "Scalable Infrastructure",
      ],
      icon: <Database className="h-6 w-6" />,
    },
    {
      id: 4,
      title: "Task Management App",
      description:
        "A task management application with drag-and-drop functionality, user roles, and real-time updates for team collaboration.",
      image: "/placeholder.svg?height=200&width=400",
      category: "frontend",
      technologies: ["React", "Redux", "Socket.io", "Tailwind CSS"],
      github: "#",
      demo: "#",
      features: [
        "Drag & Drop Interface",
        "Real-time Collaboration",
        "User Role Management",
        "Task Priority System",
        "Progress Tracking",
        "Team Analytics",
      ],
      icon: <Zap className="h-6 w-6" />,
    },
    {
      id: 5,
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with user authentication, product management, cart functionality, and payment integration.",
      image: "/placeholder.svg?height=200&width=400",
      category: "fullstack",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Redux"],
      github: "#",
      demo: "#",
      features: [
        "Product Catalog Management",
        "Shopping Cart & Checkout",
        "User Authentication",
        "Payment Integration",
        "Order Management",
        "Admin Dashboard",
      ],
      icon: <CreditCard className="h-6 w-6" />,
    },
    {
      id: 6,
      title: "Security Dashboard",
      description:
        "A comprehensive security monitoring dashboard with real-time threat detection and automated response systems.",
      image: "/placeholder.svg?height=200&width=400",
      category: "fullstack",
      technologies: [
        "React",
        "Node.js",
        "Socket.io",
        "MongoDB",
        "Security APIs",
      ],
      github: "#",
      demo: "#",
      features: [
        "Real-time Threat Monitoring",
        "Automated Security Alerts",
        "Vulnerability Assessment",
        "Incident Response",
        "Security Analytics",
        "Compliance Reporting",
      ],
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

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
      id="projects"
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
          <pre
            className="text-[8px] text-blue-400 whitespace-pre-wrap opacity-15 absolute inset-0"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {`
              // Cloud Job Manager - Multi-panel System
              const panels = ['superAdmin', 'company', 'worker', 'customer'];
              
              function createQuote(workDetails) {
                return {
                  id: generateId(),
                  work: workDetails,
                  status: 'pending',
                  contract: null,
                  invoice: null
                };
              }
              
              // Track Backlinks - Cron Job System
              cron.schedule('0 */6 * * *', async () => {
                const links = await getBacklinks();
                const results = await Promise.all(
                  links.map(link => checkLinkStatus(link))
                );
              });
              
              // API Service - Authentication
              app.use('/api', authenticateToken);
              function authenticateToken(req, res, next) {
                const token = req.headers['authorization'];
                if (!token) return res.sendStatus(401);
                jwt.verify(token, process.env.JWT_SECRET);
              }
            `}
          </pre>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 relative inline-block text-white"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            My Projects
            <div className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          </h2>
          <p className="mt-6 text-base text-gray-300 max-w-2xl mx-auto">
            Here are some of the projects I've worked on, featuring real-world
            applications with complex functionality.
          </p>
        </div>

        <div className="flex justify-center mb-8 animate-on-scroll opacity-0">
          <div className="inline-flex p-1 bg-black/30 backdrop-blur-md rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient-x"></div>
            {["all", "frontend", "backend", "fullstack"].map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "ghost"}
                onClick={() => setFilter(category)}
                className={
                  filter === category
                    ? "bg-blue-600 hover:bg-blue-700 text-white relative z-10"
                    : "hover:bg-black/50 text-gray-300 relative z-10"
                }
                size="sm"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-on-scroll opacity-0"
              style={{ animationDelay: `${index * 50}ms` }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className="card bg-black/30 backdrop-blur-md border-2 border-gray-800/50 rounded-xl overflow-hidden h-full flex flex-col hover:bg-black/40 hover:border-gradient-blue-purple hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 group relative"
                style={{ minHeight: "460px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-black/60 rounded-lg flex items-center justify-center text-blue-400 backdrop-blur-sm border border-blue-500/50 group-hover:border-blue-600">
                    {project.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/80 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-black transform translate-y-10 group-hover:translate-y-0 transition-all duration-300"
                      onClick={() => window.open(project.demo, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> View Live
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-2 relative z-10">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-blue-400 group-hover:text-blue-300 transition-colors duration-200">
                      {project.title}
                      <span className="block w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                        <Star
                          className={`h-3 w-3 mr-1 ${
                            hoveredCard === project.id ? "animate-pulse" : ""
                          }`}
                        />
                        <span>24</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                        <GitFork
                          className={`h-3 w-3 mr-1 ${
                            hoveredCard === project.id ? "animate-pulse" : ""
                          }`}
                        />
                        <span>8</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-200">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-2 flex-grow relative z-10">
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-blue-400 mb-2">
                      Key Features:
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center transform transition-all duration-200 hover:translate-x-1"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-black/60 text-gray-300 group-hover:bg-black/70 group-hover:text-gray-200 transition-all duration-200 transform hover:scale-105"
                        style={{ transitionDelay: `${techIndex * 30}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-gray-800/50 relative z-10">
                  <div className="flex justify-between w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-300 hover:bg-black/50 hover:text-blue-400 transition-colors duration-200"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="h-3 w-3 mr-1" /> Code
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-300 hover:bg-black/50 hover:text-blue-400 transition-colors duration-200"
                      onClick={() => window.open(project.demo, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> Demo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-300 hover:bg-black/50 hover:text-blue-400 transition-colors duration-200"
                    >
                      <Code className="h-3 w-3 mr-1" /> Details
                    </Button>
                  </div>
                </CardFooter>
                <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-blue-500/30 rounded-xl group-hover:scale-130 transition-transform duration-300"></div>
                <div
                  className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-500 opacity-70 animate-ping"
                  style={{ animationDuration: "1.2s" }}
                ></div>
              </Card>
            </div>
          ))}
        </div>

        <div
          className="text-center mt-12 animate-on-scroll opacity-0"
          style={{ animationDelay: "100ms" }}
        >
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white relative overflow-hidden group"
            onClick={() => window.open("https://github.com", "_blank")}
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>
            <Github className="mr-2 h-4 w-4" /> View More on GitHub
          </Button>
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
