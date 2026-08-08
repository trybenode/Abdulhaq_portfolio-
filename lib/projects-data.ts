export type ProjectImageCollection = string[] | Record<string, string>;

export type ProjectRecord = {
  id: number | string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  mobileImage?: string;
  images?: ProjectImageCollection;
  platforms?: string[];
  links?: Record<string, Record<string, string>>;
  github?: string;
  gitHub?: string;
  live?: string;
  mobileGithub?: string | null;
  tags: string[];
  features: string[];
  technologies: string[];
  collaborated?: boolean;
  challenge?: string;
  solution?: string;
};

export function getProjectImages(project: Partial<ProjectRecord>) {
  if (Array.isArray(project.images)) {
    return project.images.filter(Boolean);
  }

  if (project.images && typeof project.images === "object") {
    return Object.values(project.images).filter(Boolean);
  }

  if (project.image) {
    return [project.image];
  }

  if (project.mobileImage) {
    return [project.mobileImage];
  }

  return ["/placeholder.svg?height=400&width=600"];
}

export const projectsData: ProjectRecord[] = [
  {
    id: 1,
    title: "TrybeMarket",
    description:
      "A decentralized, cross-platform campus marketplace ecosystem. It enables students to buy/sell goods, hire services, and build personal brands, utilizing a unified backend to serve both web and mobile users seamlessly.",
    platforms: ["web", "mobile"],
    images: ["/trybemarketWeb.png", "/trybemarketMobile.png", "/ldx.png"],
    links: {
      github: {
        web: "https://github.com/trybenode/trybemarket-web",
        mobile: "https://github.com/trybenode/marketTrybe",
      },
      live: {
        web: "https://trybemarket.vercel.app/",
      },
    },
    tags: ["React Ecosystem", "Firebase", "TailwindCSS"],
    features: [
      "Cross-platform product/service listing and management dashboard",
      "Real-time, cross-platform chat and secure order tracking",
      "Integrated safe payment workflows (Paystack/Flutterwave)",
      "Campus-specific onboarding, segmentation, and school-based filtering",
      "Strict seller verification system for ecosystem trust and safety",
    ],
    technologies: [
      "GCP",
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "TailwindCSS",
      "Firebase/Firestore",
      "Expo",
    ],
    collaborated: true,
    challenge:
      "Architecting a secure, scalable ecosystem that supports diverse student businesses across both web and mobile devices, balancing low onboarding friction with high system trust and synchronized performance.",
    solution:
      "Engineered a centralized Firebase backend serving both a modular Next.js web application and a lightweight React Native mobile app, ensuring real-time data synchronization and a consistent user experience regardless of the device.",
  },
  {
    id: 2,
    title: "Janco",
    description:
      "AI-powered janitorial services platform for Nigeria with on-demand and subscription cleaning, intelligent janitor matching, area-based pricing, and admin operations.",
    image: "",
    category: "AI-enabled service marketplace",
    features: [
      "Cross-platform mobile booking app",
      "FastAPI backend with async Python services",
      "AI-powered area estimation using OpenCV + YOLO",
      "Location-based cleaner assignment",
      "Wallet and subscription billing",
      "Supabase authentication and storage",
      "Push notifications via Firebase and WhatsApp",
      "Admin dashboard for operations and monitoring",
    ],
    tags: [
      "AI",
      "React Native",
      "FastAPI",
      "Supabase",
      "Machine Learning",
      "Logistics",
      "Marketplace",
    ],
    technologies: [
      "React Native",
      "Expo",
      "Next.js",
      "FastAPI",
      "Python",
      "Supabase",
      "PostgreSQL",
      "OpenCV",
      "YOLOv8",
      "PyTorch",
      "Firebase",
      "Termii",
      "Paystack",
    ],
    github: "",
    live: "",
  },
  {
    id: 3,
    title: "Vigalentee",
    description:
      "Vigalentee is a full-stack campus safety platform that enables students and staff to report incidents anonymously, receive AI-assisted severity classification, and trigger real-time alerts for campus security through a mobile app and web dashboard.",
    images: ["/Vgl1.png", "/Vgl2.png", "/Vgl3.png","vgl4.jpeg","/Vgl5.jpeg","/Vgl6.jpeg"],
    category: "Full-Stack / AI Safety Platform",
    features: [
      "Anonymous incident reporting",
      "One-tap SOS emergency reporting",
      "AI-based incident severity classification",
      "GPS-based location capture",
      "Real-time security dashboard alerts",
      "Role-based authentication and access control",
    ],
    tags: [
      "Campus Safety",
      "Incident Reporting",
      "AI",
      "Real-Time Alerts",
      "Security",
      "Full-Stack",
    ],
    technologies: [
      "TypeScript",
      "React",
      "React Native",
      "Expo",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "PostGIS",
      "Python",
      "FastAPI",
      "Scikit-learn",
      "Firebase Cloud Messaging",
      "Leaflet",
      "Zustand",
      "Zod",
    ],
    github: "https://github.com/Abdul1013/vigalentee.git",
    live: "https://vigalentee-web-dashboard.vercel.app/",
  },
  {
    id: 4,
    title: "LibraFlow AI",
    description:
      "LibraFlow AI is an intelligent library resource management system built for Lead City University. It streamlines book cataloguing, circulation, borrowing, returns, and overdue tracking while integrating fuzzy book search and personalized recommendations for a smarter library experience.",
    images: ["lb1.png", "lb2.png", "lb3.png","lb4.png"],
    category: "AI-Powered Library Management System",
    features: [
      "Intelligent fuzzy search for books",
      "Real-time book availability tracking",
      "Personalized recommendations based on reading history",
      "Automated due-date and overdue notifications",
      "Role-based access for students and librarians",
      "Analytics dashboard for library usage insights",
      "Mobile-friendly responsive interface",
      "Secure authentication and protected user access",
    ],
    tags: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Library Tech",
      "AI Recommendations",
      "Full-Stack",
      "University Project",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "SQLModel",
      "PostgreSQL",
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "Alembic",
      "Railway",
      "Vercel",
    ],
    github: "https://github.com/abdul1013/libraflow",
    live: "https://libraflow-beta.vercel.app/",
  },
  {
    id: 5,
    title: "EventFlow",
    description:
      "EventFlow is a full-stack event ticketing and check-in platform that helps organizers manage events, issue QR tickets, optimize seating, and handle high-traffic check-ins reliably.",
    images:["evf1.png","evf2.png","evf3.png","evf4.png","evf5.png","evf6.png","evf7.png", "evf8.png"],category: "Full-Stack Event Management Platform",
    features: [
      "Monorepo architecture with shared types and UI packages",
      "Admin dashboard for event, venue, ticket, and attendee management",
      "Attendee web experience for event discovery and ticket access",
      "React Native staff app for fast QR-based check-in",
      "Python seat-allocation microservice for smart utilization",
      "Redis-backed QR token validation and high-concurrency support",
    ],
    tags: [
      "EventTech",
      "Ticketing",
      "QR Check-in",
      "Seat Allocation",
      "Monorepo",
      "TypeScript",
      "React",
      "React Native",
      "FastAPI",
      "Prisma",
      "PostgreSQL",
      "Redis",
    ],
    technologies: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "React",
      "Vite",
      "Tailwind CSS",
      "React Native",
      "Expo",
      "Python",
      "FastAPI",
      "Docker",
      "GitHub Actions",
      "Render",
      "Vercel",
    ],
    gitHub: "https://github.com/abdul1013/eventflow_backend",
    live: "https://eventflowng.store/events",
  },
  {
    id: 6,
    title: "Interactive Bulletin Management System",
    description:
      "A role-aware full-stack bulletin platform designed to replace fragmented WhatsApp and memo-based communication at Lead City University with a single, secure, real-time announcement system for students, staff, and administrators.",
    category: "Full-Stack Web Application",
    images: ["/ibms1.png", "/ibms2.png", "/ibms3.png", "/ibms4.png", "/ibms5.png", "/ibms6.png", "/ibms7.png", "/ibms8.png"],
    features: [
      "Role-based access control for guest, student, staff, and admin interfaces",
      "Drafting, approval, publishing, and archival workflow for announcements",
      "Real-time updates and notifications powered by Socket.IO",
      "Comments, reactions, and acknowledgement tracking for engagement",
      "Analytics dashboard for admin monitoring and post-performance insights",
      "Secure authentication and API protection with JWT, Redis, and rate limiting",
    ],
    tags: [
      "University",
      "Bulletin Board",
      "Role-Based Access Control",
      "Real-Time",
      "Analytics",
      "Full-Stack",
    ],
    technologies: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Node.js 20",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "Redis",
      "Socket.IO",
      "JWT",
      "Cloudinary",
      "Resend",
      "React Query",
      "shadcn/ui",
      "TipTap",
      "Recharts",
    ],
    gitHub: "https://github.com/abdul1013/IBMS",
    live: "https://ibms.online/",
  },
  {
    id: 7,
    title: "Voxza",
    description:
      "A full-stack AI-powered video journaling platform that lets users record short video entries, and receive automatic transcription, summarization, mood analysis, and semantic search insights through a React Native mobile app.",
    image: "",
    category: "Full-Stack AI App",
    features: [
      "Short-video capture and upload",
      "AI transcription and content analysis",
      "Emotion, mood, and action-item extraction",
      "Semantic search across journal entries",
      "Secure authentication, storage, and sharing",
      "Background processing with Celery",
    ],
    tags: [
      "AI",
      "Video",
      "FastAPI",
      "React Native",
      "Expo",
      "Python",
      "Celery",
      "PostgreSQL",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Celery",
      "Redis",
      "React Native",
      "Expo",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "OpenAI/Whisper",
      "Google Cloud Storage",
      "Supabase",
    ],
    gitHub: "",
    live: "",
  },

  {
    id: 8,
    title: "LDX Streetwear",
    description:
      "A modern e-commerce platform for LDX — a contemporary streetwear fashion brand offering curated collections of urban apparel, accessories, and limited-edition drops for fashion-forward individuals.",
    image: "/ldx.png",
    mobileImage: "/ldx-mobile.png",
    tags: ["Next.js", "Paystack", "TailwindCSS", "Firebase"],
    category: "fullstack",
    github: "",
    live: "https://ldx-fashion.vercel.app/",
    features: [
      "Product catalog with advanced filtering (size, color, style, collection)",
      "Interactive lookbook and style guides",
      "Secure checkout with multiple payment methods (Stripe, PayPal)",
      "Order tracking and delivery notifications",
      "User accounts with wishlist and order history",
      "Size guide and fit recommendations",
      "Limited edition drop alerts and countdown timers",
      "Responsive mobile shopping experience",
      "Customer reviews and ratings system",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Firebase MongoDB",
      "Paystack API",
      "TailwindCSS",
      "Redux",
      "Cloudinary",
      "SendGrid",
    ],
    platforms: ["Web"],
    collaborated: false,
    challenge:
      "Creating a visually stunning, high-performance e-commerce platform that captures the brand's edgy streetwear aesthetic while handling inventory management, secure payments, and providing an engaging shopping experience across devices.",
    solution:
      "Built a headless e-commerce solution using Next.js for optimal performance and SEO, integrated Stripe for seamless payments, implemented real-time inventory tracking with MongoDB, and designed a mobile-first interface that showcases products with high-quality imagery and smooth animations to enhance the brand's urban identity.",
  },
  {
    id: 4,
    title: "ChillinPay",
    description:
      "A frictionless fintech payment platform built for Nigerian businesses to eliminate payment losses, inaccurate sales records, and time waste — enabling instant, no-signup payments with cutting-edge security and seamless integration.",
    image: "/chillingpay.png",
    tags: ["Next.js", "TailwindCSS"],
    category: "web",
    github: "https://github.com/Abdul1013/payee",
    mobileGithub: null,
    live: "https://dashboard-ky1tfd13t-abdul1013s-projects.vercel.app/",
    features: [
      "No-signup payment experience for customers",
      "Order tag-based instant payment processing",
      "Multi-bank payment gateway integration",
      "Real-time transaction tracking and notifications",
      "Automated sales record management for businesses",
      "Waitlist onboarding with email verification",
      "Merchant dashboard for payment analytics",
      "State-of-the-art encryption for secure transactions",
      "Simple API integration for existing systems",
      "Mobile-responsive payment interface",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "SendGrid",
      "Vercel",
    ],
    platforms: ["Web"],
    collaborated: false,
    challenge:
      "Creating a payment solution that eliminates customer friction by removing signup requirements while maintaining security, building trust in Nigeria's fintech space, and providing businesses with accurate, real-time payment tracking without complex integration processes.",
    solution:
      "Developed a lightweight, algorithm-driven payment platform with order tag-based transactions that allow instant payments without user accounts, implemented enterprise-grade encryption for security, designed a beautiful landing page with engaging animations to communicate simplicity and trust, built a seamless merchant API that integrates in minutes, and created an intuitive dashboard that gives businesses real-time insights into their payment flows and sales records.",
  },
  {
    id: 5,
    title: "VEHICULARS",
    description:
      "A comprehensive vehicle management platform delivering technology-driven solutions across Nigeria — from vehicle registration and driver's licenses to peer-to-peer auto financing, spare parts marketplace, roadside assistance, and auto port clearing services.",
    image: "/Vehicular.jpg",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Paystack"],
    category: "fullstack",
    github: "https://github.com/yourusername/vehiculars",
    live: "https://vehicula.vercel.app/",
    features: [
      "Vehicle registration and documentation management",
      "Driver's license application and renewal processing",
      "Peer-to-peer auto financing marketplace",
      "Spare parts marketplace with vendor verification",
      "24/7 roadside assistance request and tracking",
      "Auto port clearing and customs documentation",
      "Real-time service status updates and notifications",
      "Multi-service dashboard with simplified workflows",
      "Secure payment integration for all services",
      "Document upload and verification system",
      "Service provider ratings and reviews",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "React Native",
      "Node.js",
      "PostgreSQL",
      "Prisma ORM",
      "Paystack API",
      "TailwindCSS",
      "Redis",
      "AWS S3",
      "Socket.io",
    ],
    platforms: ["Web", "Mobile (iOS/Android)"],
    collaborated: false,
    challenge:
      "Migrating legacy PHP codebase to modern stack while reducing cognitive overload from complex, multi-service workflows; ensuring seamless integration of diverse vehicle-related services; and building trust in a market with fragmented service providers and documentation processes.",
    solution:
      "Re-architected the entire platform using Next.js and TypeScript for type safety and better performance, redesigned the UX with intuitive step-by-step workflows to simplify complex processes, implemented a unified service dashboard that reduces navigation complexity, integrated real-time tracking for transparency, and built a robust API layer that connects multiple service providers while maintaining a consistent user experience across all vehicle management needs.",
  },

  {
    id: 6,
    title: "Car E-commerce Platform",
    description:
      "A scalable and secure Django-based platform featuring advanced search, inventory management, payment integration, user authentication, order tracking, and an admin dashboard for dealers.",
    image: "/carEcommerce.png",
    tags: ["Django", "SQL", "Bootstrap"],
    category: "web",
    github: "https://github.com/Abdul1013/Car-Selling-Web-App",
    live: "https://car-ecommerce-demo.vercel.app",
    features: [
      "Advanced search and filtering system",
      "Secure payment processing with Paypal",
      "Comprehensive inventory management",
      "User authentication and profiles",
      "Order tracking and history",
      "Admin dashboard for dealers",
    ],
    technologies: ["Django", "SQLlite", "Bootstrap", "PayPall API"],
    collaborated: true,
    challenge:
      "Creating a scalable platform that could handle thousands of vehicle listings with complex filtering options while maintaining performance.",
    solution:
      "Implemented efficient database indexing, query optimization, and caching strategies to ensure fast search results even with large datasets.",
  },
  {
    id: 7,
    title: "Student Planning App",
    description:
      "An intuitive app to help students manage their organization, planning, and academic schedules with smart reminders and progress tracking.",
    image: "/plannerZ.png",
    tags: ["HTML", "CSS", "JavaScript", "MongoDB"],
    category: "web",
    github: "https://github.com/Abdul1013/Student-Organizing-App",
    live: "https://student-planner-demo.vercel.app",
    features: [
      "Customizable academic calendar",
      "Assignment tracking with priority levels",
      "Smart reminders and notifications",
      "Progress tracking of GPA and analytics",
      "Study session timer with Pomodoro technique",
      "Collaborative study group features",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "MongoDB",
      "Express.js",
      "Node.js",
      "Chart.js",
      "PWA",
    ],
    challenge:
      "Designing an intuitive interface that would appeal to students while providing comprehensive planning features without overwhelming users.",
    solution:
      "Conducted extensive user research with students to create a minimalist yet powerful interface with progressive disclosure of advanced features.",
  },
  {
    id: 8,
    title: "StudyHub",
    description:
      "A Learning platform for student to prepare for exams using AI with tools like study/flashcards and quize .",
    image: "studentHub.png",
    tags: ["Next.js", "Groq", "Material UI", "Firebase"],
    category: "web",
    github: "https://github.com/Abdul1013/studyhub",
    live: "https://studenthub-delta.vercel.app/",
    features: [
      "AI-powered study card and quiz",
      "Different study Mode",
      "Real-time collaborative document editing",
      // "Video conferencing integration",
      // "Resource library with search functionality",
      // "Discussion forums for each subject",
      "Achievement system to encourage participation",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Material UI",
      "Groq API",
      "WebRTC",
      "Socket.io",
    ],
    challenge:
      "Building a platform that could facilitate meaningful connections between students with similar academic interests and enable effective collaboration.",
    solution:
      "Developed an AI-powered matching algorithm that analyzes study habits, academic interests, and learning styles to suggest compatible study partners.",
  },
  {
    id: 9,
    title: "BiteBuzz",
    description:
      "A food delivery responsive webapp for a snack restaurants to connect with their customers, make custom order and featuring real-time order tracking and personalized recommendations.",
    image: "/Bitbuzz.png",
    tags: ["React", "Firebase", "Material UI"],
    category: "web",
    github: "https://github.com/Abdul1013/bitebuzz",
    live: "", // Add TestFlight or APK link if available
    features: [
      // "Real-time order tracking with map integration",
      "Personalized restaurant recommendations",
      "In-app payment processing",
      "Meal rating and review system",
      "Loyalty program for frequent customers",
      "Multi-language support",
    ],
    // , "Redux", "Google Maps API", "Stripe"
    technologies: ["React Native", "Firebase", "Push Notifications", "i18n"],
    collaborated: true,
    challenge:
      "Creating a seamless experience for both customers and restaurant owners while ensuring accurate real-time order tracking.",
    solution:
      "Implemented a robust real-time database with Firebase and integrated Google Maps API for precise location tracking and delivery time estimation.",
  },
  {
    id: 10,
    title: "EasyTopUp",
    description:
      "A mobile app built with React Native for students and everyday users to easily buy airtime, data, and make subscriptions for utilities like cable TV and electricity, all in one secure platform.",
    image: "/easyTopUp.png", // update with the correct preview image
    tags: ["React Native", "Firebase", "Paystack"],
    category: "mobile",
    github: "https://github.com/Abdul1013/EasyTopUp",
    live: "", // Add TestFlight or APK link if available
    features: [
      "Airtime top-up for all major Nigerian networks",
      "Mobile data purchase by bundle type",
      "Cable TV (DSTV, GOTV, Startimes) subscriptions",
      "Electricity bill payments",
      "In-app payment with Paystack",
      "User auth and transaction history",
    ],
    technologies: [
      "React Native",
      "Firebase",
      "Paystack API",
      "Expo",
      "Redux Toolkit",
    ],
    collaborated: true,
    challenge:
      "Designing a user-friendly interface that simplifies mobile top-ups while ensuring secure transactions and accurate service delivery.",
    solution:
      "Used Firebase for real-time database and authentication, and Paystack for handling secure, verified payments. Built a clean, responsive UI with Expo and integrated modular service APIs (e.g., VTpass).",
  },

  // {
  //   id: 5,
  //   title: "SecurePass",
  //   description:
  //     "A cybersecurity tool that helps users generate and manage secure passwords with encryption and breach detection features.",
  //   image: "/placeholder.svg?height=300&width=500",
  //   tags: ["Python", "Django", "Encryption"],
  //   category: "security",
  //   github: "https://github.com/username/securepass",
  //   live: "https://securepass-demo.vercel.app",
  //   features: [
  //     "AES-256 encryption for password storage",
  //     "Password strength analyzer",
  //     "Data breach detection and alerts",
  //     "Two-factor authentication",
  //     "Secure password sharing",
  //     "Auto-fill browser extension",
  //   ],
  //   technologies: ["Python", "Django", "PostgreSQL", "AES Encryption", "REST API", "Browser Extension", "OAuth"],
  //   challenge:
  //     "Ensuring the highest level of security for stored passwords while maintaining a user-friendly interface and cross-platform compatibility.",
  //   solution:
  //     "Implemented end-to-end encryption where passwords are encrypted on the client side before being stored, ensuring that even in case of a data breach, passwords remain secure.",
  // },
  // {
  //   id: 6,
  //   title: "AI Content Assistant",
  //   description:
  //     "An AI-powered writing assistant that helps users generate, edit, and optimize content for different platforms and audiences.",
  //   image: "/placeholder.svg?height=300&width=500",
  //   tags: ["Next.js", "OpenAI", "TailwindCSS"],
  //   category: "ai",
  //   github: "https://github.com/username/ai-content-assistant",
  //   live: "https://ai-content-assistant-demo.vercel.app",
  //   features: [
  //     "AI-powered content generation",
  //     "Grammar and style checking",
  //     "Tone adjustment for different audiences",
  //     "SEO optimization suggestions",
  //     "Plagiarism detection",
  //     "Content readability analysis",
  //   ],
  //   technologies: ["Next.js", "OpenAI API", "TailwindCSS", "Vercel AI SDK", "TypeScript", "Zustand", "Edge Functions"],
  //   challenge:
  //     "Integrating multiple AI models to provide comprehensive writing assistance while keeping the application responsive and cost-effective.",
  //   solution:
  //     "Developed a hybrid approach that uses lightweight models for real-time feedback and more powerful models for in-depth analysis and generation, optimizing both performance and cost.",
  // },
  // {
  //   id: 7,
  //   title: "HealthTrack",
  //   description:
  //     "A comprehensive health monitoring application that helps users track fitness activities, nutrition, and wellness metrics with personalized insights.",
  //   image: "/placeholder.svg?height=300&width=500",
  //   tags: ["Flutter", "Firebase", "Health API"],
  //   category: "mobile",
  //   github: "https://github.com/username/healthtrack",
  //   live: "https://healthtrack-demo.vercel.app",
  //   features: [
  //     "Activity tracking with GPS",
  //     "Nutrition logging and analysis",
  //     "Sleep quality monitoring",
  //     "Hydration tracking",
  //     "Personalized health insights",
  //     "Goal setting and progress visualization",
  //   ],
  //   technologies: ["Flutter", "Dart", "Firebase", "Google Fit API", "Apple HealthKit", "ML Kit", "Charts"],
  //   challenge:
  //     "Creating a cross-platform application that integrates with various health APIs while providing accurate and personalized health insights.",
  //   solution:
  //     "Built a modular architecture that adapts to different health data sources and uses machine learning to generate personalized recommendations based on user data patterns.",
  // },
  // {
  //   id: 8,
  //   title: "SmartHome Hub",
  //   description:
  //     "An IoT platform that connects and controls various smart home devices through a unified interface with automation capabilities and energy monitoring.",
  //   image: "/placeholder.svg?height=300&width=500",
  //   tags: ["React", "Node.js", "IoT", "MQTT"],
  //   category: "web",
  //   github: "https://github.com/username/smarthome-hub",
  //   live: "https://smarthome-hub-demo.vercel.app",
  //   features: [
  //     "Unified control for multiple device brands",
  //     "Automation rules and scenes",
  //     "Voice control integration",
  //     "Energy usage monitoring",
  //     "Security camera feeds",
  //     "Remote access and control",
  //   ],
  //   technologies: ["React", "Node.js", "MQTT", "WebSockets", "Raspberry Pi", "Docker", "Zigbee/Z-Wave"],
  //   challenge:
  //     "Creating a platform that can communicate with various IoT protocols and devices while providing a seamless user experience and robust security.",
  //   solution:
  //     "Developed a modular adapter system that can interface with different IoT protocols and implemented end-to-end encryption for all device communications to ensure security.",
  // },
];
