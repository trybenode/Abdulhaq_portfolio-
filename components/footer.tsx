import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { NEXT_HMR_REFRESH_HEADER } from "next/dist/client/components/app-router-headers"
import Link from "next/link"
import Contact from "./contact"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/Abdul1013" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/abdulthedev/" },
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "https://x.com/abdulthedev?s=21&t=UjMu7J55mFPoIq0r6jZmNg" },
    { icon: <Mail className="h-5 w-5" />, label: "Email", href: "mailto:abdulhaqabdulrasheed@gmail.com" },
     {
        icon: <Phone className="h-5 w-5" />,
        label: "Phone",
        NEXT_HMR_REFRESH_HEADER: "+234 7083186357",
      },
  ]
    

  return (
    <footer className="bg-primary/5 border-t border-primary/10 mt-16 w-full">
      <div className="max-w-7xl mx-auto  items-center px-4 py-12 sm:px-6 lg:px-8">
        <Contact/>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Abdulrasheed Olabanji</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Software engineer specializing in web development, mobile applications, AI integration, and cybersecurity
              solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
           <span className="flex"> <MapPin/> <p className="text-muted-foreground ml-2"> Abuja, Nigeria</p> </span>
            <p className="text-muted-foreground mt-2">Available for remote work, collaboration and full time work worldwide</p>
            
          </div>
        </div>

        <div className="pt-8 border-t border-muted/10 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Abdulrasheed Olabanji. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
