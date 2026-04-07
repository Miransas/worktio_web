'use client'

import { motion } from 'framer-motion'
import { Sparkles, RotateCcw, Settings, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function GridPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

export function AnimatedCta() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 lg:px-12 overflow-hidden" style={{ background: 'oklch(0.12 0.02 280)' }}>
      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="text-sm font-medium text-teal-400 bg-transparent px-4 py-1.5 rounded-full border border-teal-500/40">
              Experience
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
            Intelligence Management
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
            Experience seamless stock tracking, predictive insights,
            <br className="hidden sm:block" />
            and automation-driven efficiency.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          {/* Real-Time Tracking */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="relative bg-[#0d0d14] border border-white/[0.08] rounded-2xl overflow-hidden h-full">
              <GridPattern />
              {/* Card Visual */}
              <div className="relative p-5 pb-0">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#1a1a24] border border-white/10 rounded-full text-xs font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
                {/* Bar Chart - ScaleX from Left */}
                <div className="space-y-3 pr-12 relative">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      initial={{ scaleX: 0 }} 
                      whileInView={{ scaleX: 1 }} 
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      style={{ width: '85%', transformOrigin: 'left' }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500/50" 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div 
                      initial={{ scaleX: 0 }} 
                      whileInView={{ scaleX: 1 }} 
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      style={{ width: '70%', transformOrigin: 'left' }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500/50" 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div 
                      initial={{ scaleX: 0 }} 
                      whileInView={{ scaleX: 1 }} 
                      transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                      style={{ width: '55%', transformOrigin: 'left' }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500/50" 
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.div 
                      initial={{ scaleX: 0 }} 
                      whileInView={{ scaleX: 1 }} 
                      transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                      style={{ width: '40%', transformOrigin: 'left' }}
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600/50" 
                    />
                  </div>
                  {/* Numbers */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute right-0 top-0 flex flex-col gap-1 text-right"
                  >
                    <span className="text-white text-sm font-medium">234</span>
                    <span className="text-white text-sm font-medium mt-2">145</span>
                  </motion.div>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-5 pt-8">
                <h3 className="text-lg font-semibold text-white mb-2">Real-Time Tracking</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Stay updated with live stock levels across multiple locations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Automated Stock */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="relative bg-[#0d0d14] border border-white/[0.08] rounded-2xl overflow-hidden h-full">
              <GridPattern />
              {/* Card Visual - Flow Diagram */}
              <div className="relative p-5 pb-0 min-h-[180px]">
                {/* Curved connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 160" fill="none">
                  <path d="M100 20 Q140 20 140 50 Q140 80 100 80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                  <path d="M100 80 Q60 80 60 110 Q60 140 100 140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                  <path d="M30 70 Q50 70 60 90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
                </svg>
                {/* Badges - Floating In Sequentially */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2"
                >
                  <span className="px-4 py-1.5 bg-[#1a1a24] border border-white/10 rounded-full text-xs font-medium text-white shadow-lg">
                    Confirmation
                  </span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute top-16 right-4"
                >
                  <span className="px-3 py-1 bg-[#1a1a24]/80 border border-white/10 rounded-lg text-xs text-gray-400 shadow-lg">
                    Confirm
                  </span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="px-4 py-1.5 bg-[#1a1a24] border border-white/10 rounded-full text-xs font-medium text-white shadow-lg">
                    Confirmation
                  </span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute top-12 left-2"
                >
                  <span className="px-3 py-1 bg-[#1a1a24]/80 border border-white/10 rounded-lg text-xs text-gray-400 shadow-lg">
                    Refund
                  </span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute bottom-4 right-8"
                >
                  <span className="px-4 py-1.5 bg-[#1a1a24] border border-white/10 rounded-full text-xs font-medium text-white shadow-lg">
                    Confirmation
                  </span>
                </motion.div>
              </div>
              {/* Card Content */}
              <div className="p-5 pt-8">
                <h3 className="text-lg font-semibold text-white mb-2">Automated Stock</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Never run out of stock—AI detects low levels and automates restocking.
                </p>
              </div>
            </div>
          </motion.div>

          {/* AI Forecasting */}
          <motion.div variants={itemVariants} className="group relative">
            <div className="relative bg-[#0d0d14] border border-white/[0.08] rounded-2xl overflow-hidden h-full">
              <GridPattern />
              {/* Card Visual - Vertical Bars ScaleY */}
              <div className="relative p-5 pb-0 min-h-[180px] flex items-end justify-center gap-6 px-8">
                {/* Bar 1 */}
                <div className="flex flex-col items-center">
                  <motion.span 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}
                    className="text-xs text-white font-medium mb-2 bg-[#1a1a24] px-2 py-0.5 rounded"
                  >
                    60%
                  </motion.span>
                  <motion.div 
                    initial={{ scaleY: 0 }} 
                    whileInView={{ scaleY: 1 }} 
                    transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.3 }}
                    style={{ transformOrigin: 'bottom' }}
                    className="w-14 h-24 rounded-lg bg-gradient-to-t from-slate-700 via-slate-600 to-slate-500" 
                  />
                </div>
                {/* Bar 2 */}
                <div className="flex flex-col items-center">
                  <motion.span 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="text-xs text-white font-medium mb-2 bg-[#1a1a24] px-2 py-0.5 rounded"
                  >
                    45%
                  </motion.span>
                  <motion.div 
                    initial={{ scaleY: 0 }} 
                    whileInView={{ scaleY: 1 }} 
                    transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.3 }}
                    style={{ transformOrigin: 'bottom' }}
                    className="w-14 h-16 rounded-lg bg-gradient-to-t from-slate-700 via-slate-600 to-slate-500" 
                  />
                </div>
                {/* Bar 3 */}
                <div className="flex flex-col items-center">
                  <motion.span 
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.7 }}
                    className="text-xs text-white font-medium mb-2 bg-[#1a1a24] px-2 py-0.5 rounded"
                  >
                    80%
                  </motion.span>
                  <motion.div 
                    initial={{ scaleY: 0 }} 
                    whileInView={{ scaleY: 1 }} 
                    transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.3 }}
                    style={{ transformOrigin: 'bottom' }}
                    className="w-14 h-32 rounded-lg bg-gradient-to-t from-slate-700 via-slate-600 to-slate-500" 
                  />
                </div>
              </div>
              {/* Card Content */}
              <div className="p-5 pt-8">
                <h3 className="text-lg font-semibold text-white mb-2">AI Forecasting</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Predict future inventory needs with intelligent analytics and insights.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row - 2 Wider Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          {/* Multi-Channel Sync */}
          <motion.div variants={itemVariants} className="md:col-span-2 group relative">
            <div className="relative bg-[#0d0d14] border border-white/[0.08] rounded-2xl overflow-hidden h-full">
              <GridPattern />
              {/* Card Visual - Connected Icons & Moving Dots */}
              <div className="relative p-6 min-h-[200px]">
                {/* Base connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 180" fill="none">
                  <path d="M75 50 Q150 30 150 90 Q150 150 225 130" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                  <path d="M75 50 Q75 90 150 90" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                  <path d="M150 90 Q225 90 225 130" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
                  
                  {/* Animated Moving Dots along paths */}
                  <motion.path 
                    d="M75 50 Q150 30 150 90 Q150 150 225 130" 
                    stroke="#2dd4bf" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    fill="none"
                    initial={{ pathLength: 0.05, pathOffset: 0 }}
                    animate={{ pathOffset: [0, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.path 
                    d="M75 50 Q75 90 150 90" 
                    stroke="#fbbf24" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    fill="none"
                    initial={{ pathLength: 0.08, pathOffset: 0 }}
                    animate={{ pathOffset: [0, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  />
                </svg>
                
                {/* Pulsing Icons */}
                <div className="absolute top-6 left-8">
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20"
                  >
                    <RotateCcw className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
                <div className="absolute top-16 right-8">
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/20"
                  >
                    <Settings className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20"
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6 pt-2">
                <h3 className="text-xl font-semibold text-white mb-2">Multi-Channel Sync</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Seamlessly integrate and sync inventory across e-commerce, POS, and warehouses.
                </p>
              </div>
            </div>
          </motion.div>

          {/* AI Assistance */}
          <motion.div variants={itemVariants} className="md:col-span-3 group relative">
            <div className="relative bg-[#0d0d14] border border-white/[0.08] rounded-2xl overflow-hidden h-full">
              {/* Radial Glow Background */}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-pink-500/30 via-rose-500/10 to-transparent rounded-full blur-2xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-radial from-pink-400/20 via-transparent to-transparent rounded-full" />
              </div>
              {/* Card Visual - Glowing Orb */}
              <div className="relative p-6 min-h-[200px] flex items-center justify-center">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 40px rgba(236,72,153,0.3), 0 0 80px rgba(236,72,153,0.2)',
                      '0 0 60px rgba(236,72,153,0.4), 0 0 100px rgba(236,72,153,0.3)',
                      '0 0 40px rgba(236,72,153,0.3), 0 0 80px rgba(236,72,153,0.2)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-teal-400/50 flex items-center justify-center z-10"
                >
                  <Sparkles className="w-8 h-8 text-teal-400" />
                </motion.div>
              </div>
              {/* Card Content */}
              <div className="relative p-6 pt-2 z-10">
                <h3 className="text-xl font-semibold text-white mb-2">AI Assistance for Smarter Decisions</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Get AI-driven recommendations on purchasing, pricing, and inventory optimization.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <span className="text-sm font-medium text-pink-400/60 bg-transparent px-4 py-1.5 rounded-full border border-pink-500/20">
            Process
          </span>
        </motion.div>
      </div>
    </section>
  )
}