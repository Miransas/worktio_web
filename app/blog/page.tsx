"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/shared/header";

// Örnek Veriler (Gerçek projede bir API veya CMS'den gelecektir)
const featuredPost = {
  title: "Introducing the Social Media Automation & Analytics Engine",
  description:
    "A modern automation and analytics platform for social media growth.",
  author: "Sardor Azimov",
  date: "January 21, 2025",
  // Görseldeki VR başlığına benzer bir placeholder görsel
  image: "./work.png",
  authorAvatar: "./author.png",
};

const morePosts = [
  {
    id: 1,
    title: "Changelog for 2025",
    description: "Modern social media growth is no longer about simply posting content.  Algorithms, audience behavior, and engagement trends are constantly evolving. To help creators and teams better understand their performance, we built a **Social Media Automation & Analytics Engine** — a system designed to combine **data analysis, automation workflows, and growth insights** in one platform.",
    date: "January 21, 2025",
    authorAvatar: "./author.png",
  },
  {
    id: 2,
    title: "How We Built Our Analytics Engine",
    description: "Without the right tools, answering these questions can take hours of manual analysis. Our platform connects **data collection, analytics, and automation** into a single workflow. By integrating with social media APIs, it continuously gathers performance data, analyzes trends, and triggers automated actions based on customizable rules. This allows creators to focus on content creation while the engine handles growth optimization.",
    date: "February 15, 2025",
    authorAvatar: "./author.png",
  },
];

// Animasyon Varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-neutral-800">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12 md:py-20">

        {/* Öne Çıkan Post */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mb-24"
        >
          {/* Sol: Görsel */}
          <motion.div variants={itemVariants} className="w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
          </motion.div>

          {/* Sağ: İçerik */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-100 mb-4">
              {featuredPost.title}
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed mb-8">
              {featuredPost.description}
            </p>
            <div className="flex items-center gap-3">
              <img
                src={featuredPost.authorAvatar}
                alt={featuredPost.author}
                className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700"
              />
              <div className="text-sm">
                <span className="text-neutral-200 font-medium">{featuredPost.author}</span>
                <span className="text-neutral-500 mx-2">•</span>
                <span className="text-neutral-500">{featuredPost.date}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Diğer Postlar Bölümü */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Başlık ve Arama Çubuğu */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-100">
              More Posts
            </h2>
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                placeholder="Search blogs"
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-neutral-300 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent transition-all"
              />
            </div>
          </motion.div>

          {/* Post Listesi */}
          <div className="flex flex-col">
            {morePosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className="group flex justify-between gap-4 py-8 border-b border-neutral-800/80 last:border-0 hover:bg-neutral-900/30 transition-colors px-4 -mx-4 rounded-2xl"
              >
                <div className="flex-col flex justify-between max-w-2xl">
                  <div>
                    <h3 className="text-xl font-medium text-neutral-200 mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                  <p className="text-neutral-500 text-sm mt-6">{post.date}</p>
                </div>

                <div className="flex items-end shrink-0">
                  <img
                    src={post.authorAvatar}
                    alt="Author"
                    className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

      </main>
    </div>
  );
}