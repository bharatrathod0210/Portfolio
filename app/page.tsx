"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import FloatingCode from "@/components/floating-code"
import AnimatedRibbons from "@/components/animated-ribbons"
import FloatingShapes from "@/components/floating-shapes"
import { ThemeProvider } from "@/components/theme-provider"

const AttractiveLoader = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-t-[#58a6ff] border-[#1a1a1a] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        animate={{
          background: [
            "linear-gradient(45deg, #000000, #1a1a1a, #000000)",
            "linear-gradient(45deg, #000000, #0f172a, #000000)",
            "linear-gradient(45deg, #000000, #1a1a1a, #000000)",
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#58a6ff] rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Loader Container */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Central Loading Animation */}
        <div className="relative flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <motion.div
            className="w-32 h-32 border-4 border-transparent border-t-[#58a6ff] border-r-[#58a6ff] rounded-full absolute"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Middle Ring with Pulse */}
          <motion.div
            className="w-24 h-24 border-2 border-[#58a6ff]/40 rounded-full absolute"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4],
              borderColor: ["#58a6ff40", "#58a6ff80", "#58a6ff40"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Inner Ring Counter Rotation */}
          <motion.div
            className="w-16 h-16 border-2 border-transparent border-b-[#7c3aed] border-l-[#7c3aed] rounded-full absolute"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          {/* Center Glowing Core */}
          <motion.div
            className="w-6 h-6 bg-[#58a6ff] rounded-full relative"
            animate={{
              scale: [1, 1.4, 1],
              boxShadow: ["0 0 20px #58a6ff", "0 0 40px #58a6ff, 0 0 60px #58a6ff", "0 0 20px #58a6ff"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-white rounded-full"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Orbiting Dots */}
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-[#58a6ff] rounded-full"
              style={{
                transformOrigin: "50px 0px",
              }}
              animate={{
                rotate: 360,
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.5,
                },
                scale: {
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.25,
                },
              }}
            />
          ))}
        </div>

        {/* Loading Text Animation */}
        <div className="text-center space-y-4">
          <motion.div
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#7c3aed]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.span
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Loading
            </motion.span>
            <motion.span
              className="ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            >
              ...
            </motion.span>
          </motion.div>

          {/* Animated Progress Bar */}
          <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#58a6ff] via-[#7c3aed] to-[#58a6ff] rounded-full relative"
              initial={{ width: "0%", x: "-100%" }}
              animate={{
                width: "100%",
                x: "0%",
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          </div>

          {/* Status Text */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.p
              className="text-gray-400 text-lg font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Preparing your experience
            </motion.p>
            <motion.p
              className="text-[#58a6ff] text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Almost there...
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { code: "</>", delay: 0 },
            { code: "{ }", delay: 0.5 },
            { code: "=>", delay: 1 },
            { code: "[]", delay: 1.5 },
            { code: "()", delay: 2 },
            { code: "fn", delay: 2.5 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-[#58a6ff]/30 font-mono text-xl font-bold"
              style={{
                left: `${20 + i * 15}%`,
                top: "80%",
              }}
              initial={{ y: 0, opacity: 0, scale: 0.5 }}
              animate={{
                y: -400,
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: item.delay,
                ease: "easeOut",
              }}
            >
              {item.code}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-[#58a6ff]/30"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-[#58a6ff]/30"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
      />
    </motion.div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <AttractiveLoader />
        ) : (
          <motion.main
            className="min-h-screen bg-black text-white overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AnimatedRibbons />
            <FloatingShapes />
            <ParticleBackground />
            <FloatingCode />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
