"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/lib/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Music,
  Users,
  Building,
  Trophy,
  Piano,
  Guitar,
  AudioLines as Violin,
  Mic,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react"



// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
}

interface EmailFormData {
  name: string
  email: string
  phone: string
  message: string
}

export default function MusicAcademyLanding() {
  const { toasts, addToast, removeToast } = useToast()
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [emailFormOpen, setEmailFormOpen] = useState(false)
  const [formData, setFormData] = useState<EmailFormData>({
    name: "",
    email: "",
    phone: "",
    message: "I am interested in starting music lessons at Manuel's Music Academy and would like to book a session.",
  })

  // Theme persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode")
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])



  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(
      `Music Lesson Inquiry from ${formData.name}`
    )
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone || "Not provided"}\n\n` +
      `Message:\n${formData.message}`
    )

    window.open(
      `mailto:manuelsmusicschool@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    )

    setEmailFormOpen(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      message:
        "I am interested in starting music lessons at Manuel's Music Academy and would like to book a session.",
    })

    addToast({
      title: "Email client opened!",
      description: "Your message has been pre-filled — just hit send.",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("manuelsmusicschool@gmail.com")
      addToast({
        title: "Email copied!",
        description: "manuelsmusicschool@gmail.com has been copied to your clipboard.",
      });
    } catch (error) {
      addToast({
        title: "Failed to copy",
        description: "Please try copying the email manually.",
        variant: "destructive",
      });
    }
  }

  const copyPhoneToClipboard = async (phoneNumber: string) => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      addToast({
        title: "Phone number copied!",
        description: `${phoneNumber} has been copied to your clipboard.`,
      });
    } catch (error) {
      addToast({
        title: "Failed to copy",
        description: "Please try copying the phone number manually.",
        variant: "destructive",
      });
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${darkMode ? "dark" : ""}`}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px var(--color-green-glow, hsl(160, 84%, 39% / 0.5))" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <img
              src="/manuel-s-music-academy-logo-with-musical-notes-and.jpg"
              alt="Manuel's Music Academy Logo"
              className="h-10 w-auto"
            />
          </motion.button>

          {/* Desktop Navigation */}

          <div className="flex items-center space-x-4">
            {/* Enroll Now Button */}
            <Dialog open={emailFormOpen} onOpenChange={setEmailFormOpen}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-green-glow hover:bg-green-glow text-white hover:shadow-green-glow transition-all duration-300">
                    Enroll Now
                  </Button>
                </motion.div>
              </DialogTrigger>
            </Dialog>

            {/* Mobile Menu Button */}
          </div>
        </div>

        {/* Mobile Menu */}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Piano watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 transform rotate-12">
            <Piano className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance text-foreground">
              Unleash Your Musical <span className="text-green-glow">Potential</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto text-pretty">
              Professional music education with world-class instructors. From beginner to virtuoso, your journey starts
              here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={emailFormOpen} onOpenChange={setEmailFormOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-green-glow hover:bg-green-glow text-white hover:shadow-green-glow transition-all duration-300"
                    >
                      Start Learning
                    </Button>
                  </motion.div>
                </DialogTrigger>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-background">
        {/* Guitar watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute bottom-10 left-10 w-40 h-40 transform -rotate-12">
            <Guitar className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Why Choose This Academy</h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Users,
                title: "Expert Instructors",
                description:
                  "Learn from internationally acclaimed musicians with decades of performance and teaching experience.",
              },
              {
                icon: Building,
                title: "Modern Facilities",
                description:
                  "State-of-the-art studios equipped with premium instruments and cutting-edge recording technology.",
              },
              {
                icon: Trophy,
                title: "Performance Opportunities",
                description: "Regular recitals, competitions, and showcases to build confidence and stage presence.",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-green-glow transition-all duration-300 bg-card border-border">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mx-auto mb-4 p-3 bg-green-glow/10 rounded-full w-fit"
                    >
                      <feature.icon className="w-8 h-8 text-green-glow" />
                    </motion.div>
                    <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About the Founder Section */}
      <section className="py-20 bg-muted/30 relative">
        {/* Piano watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
            <Piano className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Meet the Founder</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={scaleIn}
              className="md:w-1/2"
            >
              <img
                src="/founder1.jpeg"
                alt="Manuel, Founder of Manuel's Music Academy"
                className="w-full max-w-md mx-auto rounded-lg shadow-md object-cover aspect-square"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="md:w-1/2 md:pl-8"
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                Manuel, the passionate founder of Manuel's Music Academy, has over 15 years of experience as a pianist
                and educator. Inspired by his own journey from a small town in Ghana to international stages, Manuel
                established the academy to make world-class music education accessible to all.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                "Music is the universal language that brings harmony to our lives," he says. Under his guidance,
                hundreds of students have discovered their talents and achieved their musical dreams.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 relative bg-background">
        {/* Drum set watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 right-20 w-48 h-48 transform rotate-45">
            <Music className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Music Programs</h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Piano,
                title: "Piano",
                description: "Classical to contemporary styles for all skill levels",
              },
              {
                icon: Guitar,
                title: "Guitar",
                description: "Acoustic and electric guitar mastery",
              },
              {
                icon: Violin,
                title: "Violin",
                description: "Orchestral excellence and solo performance",
              },
              {
                icon: Mic,
                title: "Voice",
                description: "Vocal techniques and performance skills",
              },
            ].map((program, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-green-glow transition-all duration-300 bg-card border-border">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="mx-auto mb-4 p-3 bg-green-glow/10 rounded-full w-fit"
                    >
                      <program.icon className="w-8 h-8 text-green-glow" />
                    </motion.div>
                    <CardTitle className="text-xl text-card-foreground">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground">
                      {program.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30 relative">
        {/* Musical notes watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-20 left-20 w-16 h-16">
            <Music className="w-full h-full text-green-glow" />
          </div>
          <div className="absolute bottom-20 right-20 w-12 h-12">
            <Music className="w-full h-full text-green-glow" />
          </div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8">
            <Music className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Student Success Stories</h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {[
              {
                quote:
                  "The instructors at Manuel's Music Academy completely transformed my piano skills. Their personalized approach and patience helped me achieve levels I never thought possible.",
                author: "Brian Nkrow",
              },
              {
                quote:
                  "The supportive environment and world-class facilities helped me prepare for my conservatory auditions. I couldn't have done it without Manuel's guidance.",
                author: "Johnson Akortsu",
              },
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-green-glow transition-all duration-300 bg-card border-border">
                  <CardContent className="p-6">
                    <blockquote className="text-lg italic mb-4 text-muted-foreground">"{testimonial.quote}"</blockquote>
                    <cite className="text-green-glow font-semibold">— {testimonial.author}</cite>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-glow/10 to-background relative">
        {/* Instrument watermarks */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-24 h-24 transform -rotate-12">
            <Guitar className="w-full h-full text-green-glow" />
          </div>
          <div className="absolute bottom-10 right-10 w-32 h-32 transform rotate-12">
            <Violin className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Start Your Musical Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of students who have discovered their musical potential with us.
            </p>
            <div className="flex justify-center">
              <Dialog open={emailFormOpen} onOpenChange={setEmailFormOpen}>
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-green-glow hover:bg-green-glow text-white hover:shadow-green-glow transition-all duration-300 border-2 border-green-glow"
                    >
                      Book Your Session
                    </Button>
                  </motion.div>
                </DialogTrigger>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative bg-background">
        {/* Phone/music icon watermark */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
            <Phone className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Get in Touch</h2>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-green-glow" />
                    <div>
                      <p className="font-semibold text-card-foreground">Phone</p>
                      <div className="space-y-1">
                        <motion.button
                          onClick={() => copyPhoneToClipboard("+233553974246")}
                          className="block text-muted-foreground hover:text-green-glow hover:shadow-green-glow transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          +233 55 397 4246
                        </motion.button>
                        <motion.button
                          onClick={() => copyPhoneToClipboard("+233265779952")}
                          className="block text-muted-foreground hover:text-green-glow hover:shadow-green-glow transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          +233 26 577 9952
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-green-glow" />
                    <div>
                      <p className="font-semibold text-card-foreground">Email</p>
                      <motion.button
                        onClick={copyEmailToClipboard}
                        className="text-muted-foreground hover:text-green-glow hover:shadow-green-glow transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Copy email to clipboard"
                      >
                        manuelsmusicschool@gmail.com
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MessageCircle className="w-6 h-6 text-green-glow" />
                    <div>
                      <p className="font-semibold mb-2 text-card-foreground">WhatsApp Community</p>
                      <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          asChild
                          className="bg-green-glow hover:bg-green-glow text-white hover:shadow-green-glow transition-all duration-300 border-2 border-green-glow"
                        >
                          <a
                            href="https://chat.whatsapp.com/l898oDQtxdVBSIG0WKWqkq"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join WhatsApp Community
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 relative">
        {/* Note watermarks */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute bottom-5 left-10 w-8 h-8">
            <Music className="w-full h-full text-green-glow" />
          </div>
          <div className="absolute bottom-5 right-10 w-8 h-8">
            <Music className="w-full h-full text-green-glow" />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">© 2025 Manuel's Music Academy. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <motion.button
              onClick={() => copyPhoneToClipboard("+233553974246")}
              className="text-muted-foreground hover:text-green-glow hover:shadow-green-glow transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              aria-label="Copy phone number +233 55 397 4246 to clipboard"
            >
              +233 55 397 4246
            </motion.button>
            <motion.button
              onClick={() => copyPhoneToClipboard("+233265779952")}
              className="text-muted-foreground hover:text-green-glow hover:shadow-green-glow transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              aria-label="Copy phone number +233 26 577 9952 to clipboard"
            >
              +233 26 577 9952
            </motion.button>
            <motion.button
              onClick={copyEmailToClipboard}
              className="text-muted-foreground hover:text-green-glow hover:shadow-green-glow transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              aria-label="Copy email to clipboard"
            >
              <Mail className="w-5 h-5" />
            </motion.button>
            <motion.a
              href="https://chat.whatsapp.com/l898oDQtxdVBSIG0WKWqkq"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-green-glow hover:shadow-green-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              aria-label="Join WhatsApp community"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </footer>

      {/* Email Form Modal */}
      <Dialog open={emailFormOpen} onOpenChange={setEmailFormOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border opacity-100">
          <DialogHeader>
            <DialogTitle className="text-foreground">Start Your Musical Journey</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Fill out the form below and we'll get back to you as soon as possible to schedule your session.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-foreground">
                Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-foreground">
                Phone (Optional)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>
            <div>
              <Label htmlFor="message" className="text-foreground">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEmailFormOpen(false)}
                className="border-border text-foreground hover:text-green-glow"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-glow hover:bg-green-glow text-white hover:shadow-green-glow transition-all duration-300"
              >
                Send Message
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <Toaster toasts={toasts} removeToast={removeToast} />
    </div>
  )
}