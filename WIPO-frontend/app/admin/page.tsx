"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="bg-green-50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6 py-20 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6">
            Welcome to WIPO
          </h1>
          <p className="text-lg md:text-xl text-green-600 mb-8">
            A modern, scalable platform built with Next.js, light theme, and clean UI.
          </p>
          <Link
            href="/about"
            className="inline-block px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Learn More
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Clean Architecture",
              desc: "Scalable folder structure and reusable components for maintainable code.",
            },
            {
              title: "Admin Panel",
              desc: "Manage users, properties, enquiries, committees, and referrals easily.",
            },
            {
              title: "Responsive Design",
              desc: "Works beautifully on desktop, tablet, and mobile devices.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-green-50/40 border border-green-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-3">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-50 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Get Started with WIPO Today
          </h2>
          <p className="text-green-600 mb-6">
            Explore the platform, manage your data, and enjoy a clean, modern UI.
          </p>
          <Link
            href="/admin"
            className="inline-block px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Go to Admin Panel
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
