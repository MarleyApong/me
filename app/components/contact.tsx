"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Youtube,
  Github,
  Send,
  MapPin,
} from "lucide-react";
import SectionNumber from "./section-number";

const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "marlexapong90@gmail.com",
    href: "mailto:marlexapong90@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Marley Apong",
    href: "https://linkedin.com/in/marley-apong",
  },
  {
    icon: Youtube,
    label: "YouTube",
    value: "@amatutoriel",
    href: "https://youtube.com/@amatutoriel",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "MarleyApong",
    href: "https://github.com/MarleyApong",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-24 md:px-16"
    >
      <SectionNumber number="05" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-hand text-2xl text-accent">&ldquo;</span>
          <h2 className="font-display text-6xl md:text-8xl">
            GET IN{" "}
            <span className="text-accent">TOUCH</span>.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Vous avez un projet en tete ? Discutons-en.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-display text-sm tracking-wider">
                  NOM
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-foreground/10 bg-card-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="mb-2 block font-display text-sm tracking-wider">
                  EMAIL
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-foreground/10 bg-card-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block font-display text-sm tracking-wider">
                SUJET
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-foreground/10 bg-card-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="Sujet du message"
              />
            </div>
            <div>
              <label className="mb-2 block font-display text-sm tracking-wider">
                MESSAGE
              </label>
              <textarea
                rows={5}
                className="w-full resize-none rounded-xl border border-foreground/10 bg-card-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                placeholder="Votre message..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center gap-2 rounded-full bg-accent px-8 py-3 font-display text-lg tracking-wider text-black transition-colors hover:bg-accent-dark"
            >
              ENVOYER
              <Send className="h-4 w-4" />
            </motion.button>
          </motion.form>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center gap-6"
          >
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-4 rounded-xl bg-card-bg p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                  <social.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-sm tracking-wider text-muted">
                    {social.label}
                  </p>
                  <p className="font-medium">{social.value}</p>
                </div>
              </motion.a>
            ))}

            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4" />
              <span>Cameroun</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
