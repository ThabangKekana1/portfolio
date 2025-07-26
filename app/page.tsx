"use client"

import { motion, useScroll, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { ArrowRight, X } from "lucide-react"

const designs = [
  {
    id: 1,
    title: "Welcome Experience",
    description: "Immersive onboarding with dramatic visuals",
    image: "/designs/welcome-screen.png",
    category: "Mobile App",
    theme: "dark",
  },
  {
    id: 2,
    title: "Chaos to Clarity",
    description: "AI-powered emotional intelligence",
    image: "/designs/chaos-clarity.png",
    category: "Mobile App",
    theme: "dark",
  },
  {
    id: 3,
    title: "Conversational AI",
    description: "Clean chat interface design",
    image: "/designs/chat-interface.png",
    category: "Mobile App",
    theme: "dark",
  },
  {
    id: 4,
    title: "Wiinta OS Preview",
    description: "Minimalist splash screen",
    image: "/designs/wiinta-os.png",
    category: "Operating System",
    theme: "dark",
  },
  {
    id: 5,
    title: "Banking Account",
    description: "Clean financial interface with virtual card design",
    image: "/designs/account-screen.png",
    category: "FinTech App",
    theme: "light",
  },
  {
    id: 6,
    title: "Cash+ Voucher",
    description: "Vibrant voucher redemption interface",
    image: "/designs/cash-plus.png",
    category: "FinTech App",
    theme: "light",
  },
  {
    id: 7,
    title: "Artist Platform",
    description: "Creative app with immersive background imagery",
    image: "/designs/artist-app.png",
    category: "Creative App",
    theme: "light",
  },
]

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTheme, setCurrentTheme] = useState("dark")
  const [expandedDesign, setExpandedDesign] = useState<(typeof designs)[0] | null>(null)
  const yOffsetTransforms = designs.map((_, index) => [index / designs.length, (index + 1) / designs.length])
  const yOffsetValues = yOffsetTransforms.map(([start, end]) => [start, end])

  const transformedYOffsets = yOffsetValues.map(([start, end]) => [50, -50])

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Theme switching based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const designIndex = Math.floor(latest * designs.length)
      const currentDesign = designs[designIndex]
      if (currentDesign && currentDesign.theme !== currentTheme) {
        setCurrentTheme(currentDesign.theme)
      }
    })
    return unsubscribe
  }, [scrollYProgress, currentTheme])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (expandedDesign) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [expandedDesign])

  const isDark = currentTheme === "dark"
  const bgColor = isDark ? "#000000" : "#ffffff"
  const textColor = isDark ? "#ffffff" : "#000000"
  const mutedTextColor = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
  const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"

  const handleViewProject = (design: (typeof designs)[0]) => {
    setExpandedDesign(design)
  }

  const handleCloseModal = () => {
    setExpandedDesign(null)
  }

  return (
    <motion.div
      className="min-h-screen font-['Inter',sans-serif] overflow-x-hidden transition-colors duration-1000"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {/* Floating cursor follower */}
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference transition-colors duration-500"
        style={{ backgroundColor: isDark ? "#ffffff" : "#000000" }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Hero Section */}
      <motion.section className="relative h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="text-center z-10 w-full max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight mb-6 md:mb-8 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            DESIGN
          </motion.h1>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.p
              className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-3 md:mb-4"
              style={{ color: mutedTextColor }}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              PORTFOLIO
            </motion.p>
            <motion.p
              className="text-base sm:text-lg md:text-xl font-medium tracking-wide"
              style={{ color: textColor }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              by Karman Kekana
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll indicator - Hidden on mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-px h-16 transition-colors duration-500"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.section>

      {/* Professional Summary Section */}
      <motion.section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-light mb-12 tracking-tight text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Professional Summary
          </motion.h2>

          <motion.div
            className="space-y-8 text-left max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-lg sm:text-xl leading-relaxed font-light"
              style={{ color: textColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Product designer specialising in AI-assisted design, rapid development, and human-AI interaction models.
              Proficient in using advanced AI tools to accelerate product design, prototyping, and development workflows
              across AI-native applications, fintech, and general software platforms.
            </motion.p>

            <motion.p
              className="text-lg sm:text-xl leading-relaxed font-light"
              style={{ color: textColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Designed and shipped AI products and non-AI applications in fintech, enterprise, and operating systems,
              driving over 80% reduction in product development time and contributing to venture funding success.
            </motion.p>

            <motion.p
              className="text-lg sm:text-xl leading-relaxed font-light"
              style={{ color: textColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              Proven track record of scaling products from concept to production with regulatory alignment, robust UX
              frameworks, and cross-functional leadership.
            </motion.p>

            <motion.div
              className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-light mb-6 text-left">Proficiencies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Figma', description: 'Advanced UI/UX design and prototyping' },
                  { name: 'V0', description: 'AI-powered rapid prototyping' },
                  { name: 'Lovable.dev', description: 'AI-assisted development workflows' },
                  { name: 'Cursor AI', description: 'AI coding assistance and pair programming' },
                  { name: 'Windsurf', description: 'AI development and deployment' },
                  { name: 'Vercel', description: 'Cloud deployment and serverless functions' },
                ].map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    className="p-4 rounded-lg text-left"
                    style={{
                      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -4,
                      boxShadow: isDark 
                        ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <h4 className="font-medium text-lg mb-1" style={{ color: isDark ? '#fff' : '#000' }}>{tool.name}</h4>
                    <p className="text-sm opacity-80" style={{ color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)' }}>
                      {tool.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.div className="text-center mx-[-47px]" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <motion.div
                className="text-3xl sm:text-4xl font-light mb-2 text-left mr-[0]"
                style={{ color: textColor }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                viewport={{ once: true }}
              >
                80%
              </motion.div>
              <p className="text-sm tracking-wide uppercase whitespace-nowrap text-left" style={{ color: mutedTextColor }}>
                Development Time Reduction
              </p>
            </motion.div>

            <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <motion.div
                className="text-3xl sm:text-4xl font-light mb-2 text-left"
                style={{ color: textColor }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                viewport={{ once: true }}
              >
                AI-Native
              </motion.div>
              <p className="text-sm tracking-wide uppercase text-left" style={{ color: mutedTextColor }}>
                Design Approach
              </p>
            </motion.div>

            <motion.div className="text-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <motion.div
                className="text-3xl sm:text-4xl font-light mb-2 whitespace-nowrap"
                style={{ color: textColor }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                viewport={{ once: true }}
              >
                Multi-Platform
              </motion.div>
              <p className="text-sm tracking-wide uppercase text-left" style={{ color: mutedTextColor }}>
                Product Experience
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Continuous Scroll Designs */}
      <div ref={containerRef} className="relative">
        {designs.map((design, index) => {
          const isEven = index % 2 === 0
          const yOffset = transformedYOffsets[index]
          const isCurrentTheme = design.theme === currentTheme

          return (
            <motion.div
              key={design.id}
              className={`relative min-h-screen flex items-center px-4 sm:px-6 md:px-8 transition-opacity duration-1000 ${
                isEven ? "justify-start" : "justify-end"
              }`}
              style={{
                y: yOffset[0], // Use the first value of the array
                opacity: isCurrentTheme ? 1 : 0.3,
              }}
            >
              <motion.div
                className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 w-full max-w-7xl mx-auto ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Design Image */}
                <motion.div
                  className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] aspect-[9/16] group cursor-pointer flex-shrink-0 mx-auto md:mx-0 overflow-visible"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  layoutId={`design-${design.id}`}
                  style={{
                    boxShadow: "none",
                    WebkitBoxShadow: "none",
                    filter: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <Image
                    src={design.image || "/placeholder.svg"}
                    alt={design.title}
                    fill
                    className="object-contain p-0 m-0"
                    sizes="(max-width: 640px) 300px, (max-width: 768px) 400px, (max-width: 1024px) 500px, (max-width: 1280px) 600px, 700px"
                    priority={index < 3}
                    style={{
                      filter: "none",
                      boxShadow: "none",
                      WebkitBoxShadow: "none",
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  />

                  {/* Floating number */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg z-10 transition-colors duration-500"
                    style={{
                      backgroundColor: isDark ? "#ffffff" : "#000000",
                      color: isDark ? "#000000" : "#ffffff",
                      boxShadow: "none",
                    }}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>
                </motion.div>

                {/* Design Info */}
                <motion.div
                  className={`flex-1 max-w-lg mt-8 md:mt-0 ${
                    isEven ? "text-left" : "md:text-right text-left"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <motion.p
                    className="text-xs sm:text-sm mb-2 sm:mb-3 tracking-widest uppercase"
                    style={{ color: mutedTextColor }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {design.category}
                  </motion.p>

                  <motion.h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    {design.title}
                  </motion.h2>

                  <motion.p
                    className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed"
                    style={{ color: mutedTextColor }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {design.description}
                  </motion.p>

                  <motion.button
                    className="group inline-flex items-center gap-2 sm:gap-3 border px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 text-base sm:text-lg w-full sm:w-auto justify-center md:justify-start"
                    style={{
                      color: textColor,
                      borderColor: borderColor,
                      backgroundColor: "transparent",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    viewport={{ once: true }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewProject(design)}
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Final CTA Section */}
      <motion.section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8">
        <motion.div
          className="text-center w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 sm:mb-8 tracking-tight leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's make the internet
            <br />
            <span style={{ color: mutedTextColor }}>feel again.</span>
          </motion.h2>

          <motion.button
            className="group inline-flex items-center gap-2 sm:gap-3 border px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-500 text-base sm:text-lg mb-8 sm:mb-12 w-full sm:w-auto justify-center mx-auto"
            style={{
              color: textColor,
              borderColor: borderColor,
              backgroundColor: "transparent",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = 'mailto:thabang@emerg.co.za?subject=Let\'s make the internet feel again.'}
          >
            <span>Get In Touch</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 sm:group-hover:translate-x-2" />
          </motion.button>

          {/* Copyright */}
          <motion.p
            className="text-sm tracking-wide"
            style={{ color: mutedTextColor }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            &copy; 2025 Karman Kekana. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Expanded Design Modal */}
      <AnimatePresence>
        {expandedDesign && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 touch-none"
            style={{ backgroundColor: `${bgColor}CC` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleCloseModal}
          >
            {/* Backdrop blur */}
            <motion.div
              className="absolute inset-0 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-4xl max-h-[90vh] mx-2 sm:mx-4 md:mx-8"
              layoutId={`design-${expandedDesign.id}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
                layout: { duration: 0.6 },
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute -top-4 -right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 backdrop-blur-sm"
                style={{
                  backgroundColor: `${isDark ? "#ffffff" : "#000000"}20`,
                  color: textColor,
                  border: `1px solid ${borderColor}`,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: isDark ? "#ffffff" : "#000000",
                  color: isDark ? "#000000" : "#ffffff",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseModal}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>

              {/* Expanded Image */}
              <motion.div
                className="relative w-full aspect-[9/16] max-h-[70vh] mx-auto overflow-visible"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  boxShadow: "none",
                  WebkitBoxShadow: "none",
                  filter: "none",
                  backgroundColor: "transparent",
                }}
              >
                <Image
                  src={expandedDesign.image || "/placeholder.svg"}
                  alt={expandedDesign.title}
                  fill
                  className="object-contain p-0 m-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                  priority
                  style={{
                    filter: "none",
                    boxShadow: "none",
                    WebkitBoxShadow: "none",
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                />
              </motion.div>

              {/* Design Info */}
              <motion.div
                className="mt-4 sm:mt-6 text-center px-2 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <p className="text-xs sm:text-sm tracking-widest uppercase mb-1 sm:mb-2" style={{ color: mutedTextColor }}>
                  {expandedDesign.category}
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-1 sm:mb-2" style={{ color: textColor }}>
                  {expandedDesign.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg" style={{ color: mutedTextColor }}>
                  {expandedDesign.description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
