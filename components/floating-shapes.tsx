"use client"

import { useEffect, useRef } from "react"

interface Shape {
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  rotationSpeed: number
  color: string
  type: "circle" | "square" | "triangle"
}

export default function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapesRef = useRef<Shape[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initShapes()
    }

    const initShapes = () => {
      shapesRef.current = []
      const numberOfShapes = 15

      const colors = [
        "rgba(88, 166, 255, 0.08)",
        "rgba(35, 134, 54, 0.08)",
        "rgba(240, 136, 62, 0.08)",
        "rgba(118, 74, 188, 0.08)",
      ]

      const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

      for (let i = 0; i < numberOfShapes; i++) {
        const size = Math.random() * 60 + 20
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const rotation = Math.random() * 360
        const speed = Math.random() * 0.3 + 0.1
        const rotationSpeed = Math.random() * 2 - 1
        const color = colors[Math.floor(Math.random() * colors.length)]
        const type = types[Math.floor(Math.random() * types.length)]

        shapesRef.current.push({
          x,
          y,
          size,
          rotation,
          speed,
          rotationSpeed,
          color,
          type,
        })
      }
    }

    const drawShape = (shape: Shape) => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      ctx.rotate((shape.rotation * Math.PI) / 180)
      ctx.filter = "blur(3px)"
      ctx.fillStyle = shape.color

      switch (shape.type) {
        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
        case "square":
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -shape.size / 2)
          ctx.lineTo(-shape.size / 2, shape.size / 2)
          ctx.lineTo(shape.size / 2, shape.size / 2)
          ctx.closePath()
          ctx.fill()
          break
      }
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapesRef.current.forEach((shape) => {
        // Update position
        shape.y += shape.speed
        shape.rotation += shape.rotationSpeed

        // Reset if off screen
        if (shape.y > canvas.height + shape.size) {
          shape.y = -shape.size
          shape.x = Math.random() * canvas.width
        }

        drawShape(shape)
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}
