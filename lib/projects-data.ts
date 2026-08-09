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

const placeholderProjectImage = "/placeholder.svg?height=400&width=600";

function normalizeProjectImagePath(image: string) {
  if (!image) return null;

  const trimmed = image.trim();

  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return trimmed;
  }

  const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  const knownImageAliases = new Map<string, string>([
    ["/trybemarketmobile.png", "/trybemarketm.png"],
  ]);

  const knownMissingImages = new Set([
    "/janco1.png",
    "/janco2.png",
    "/janco3.png",
    "/ibms2.png",
    "/ldx-mobile.png",
  ]);

  if (knownImageAliases.has(normalizedPath.toLowerCase())) {
    return knownImageAliases.get(normalizedPath.toLowerCase()) || normalizedPath;
  }

  return knownMissingImages.has(normalizedPath.toLowerCase())
    ? placeholderProjectImage
    : normalizedPath;
}

export function getProjectImages(project: Partial<ProjectRecord>) {
  const rawImages: (string | undefined)[] = [];

  if (Array.isArray(project.images)) {
    rawImages.push(...project.images);
  } else if (project.images && typeof project.images === "object") {
    rawImages.push(...Object.values(project.images));
  }

  if (project.image) rawImages.push(project.image);
  if (project.mobileImage) rawImages.push(project.mobileImage);

  const images = rawImages
    .map((image) => normalizeProjectImagePath(image ?? ""))
    .filter((image): image is string => Boolean(image));

  return images.length > 0 ? images : [placeholderProjectImage];
}

export const projectsData: ProjectRecord[] = [
  {
    id: 1,
    title: "TrybeMarket",
    description:
      "A decentralized, cross-platform campus marketplace ecosystem. It enables students to buy/sell goods, hire services, and build personal brands, utilizing a unified backend to serve both web and mobile users seamlessly.",
    platforms: ["web", "mobile"],
    images: ["/trybemarketWeb.png", "/trybemarketMobile.png", "/ldx.png"],
    github: "https://github.com/trybenode/trybemarket-web",
    live: "https://trybemarket.vercel.app/",

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
    platforms: ["web", "mobile"],
    images: ["/janco1.png", "/janco2.png", "/janco3.png"],

    github: "",

    live: "",

    tags: [
      "AI",
      "React Native",
      "FastAPI",
      "Supabase",
      "Machine Learning",
      "Logistics",
      "Marketplace",
    ],
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
    collaborated: false,
    challenge:
      "JANCO needed to transform a fragmented cleaning marketplace into a trustworthy, scalable, and reliable platform that could handle fair pricing, janitor verification, worker matching, payments, and low-bandwidth environments.",
    solution:
      "Designed JANCO around a backend-first FastAPI architecture, centralizing authentication, pricing, trust scoring, and worker dispatch. A weighted matching system considers distance, quality, fairness, and skills, while configurable pricing and verification improve security, scalability, transparency, and reliability.",
  },
  {
    id: 3,
    title: "Vigalentee",
    description:
      "Vigalentee is a full-stack campus safety platform that enables students and staff to report incidents anonymously, receive AI-assisted severity classification, and trigger real-time alerts for campus security through a mobile app and web dashboard.",
    platforms: ["web", "mobile"],
    images: [
      "/Vgl1.png",
      "/Vgl2.png",
      "/Vgl3.png",
      "vgl4.jpeg",
      "/Vgl5.jpeg",
      "/Vgl6.jpeg",
    ],

    github: "https://github.com/Abdul1013/vigalentee.git",

    live: "https://vigalentee-web-dashboard.vercel.app/",

    tags: [
      "Campus Safety",
      "Incident Reporting",
      "AI",
      "Real-Time Alerts",
      "Security",
      "Full-Stack",
    ],
    features: [
      "Anonymous incident reporting",
      "One-tap SOS emergency reporting",
      "AI-based incident severity classification",
      "GPS-based location capture",
      "Real-time security dashboard alerts",
      "Role-based authentication and access control",
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
    collaborated: false,
    challenge:
      "Architecting a secure, scalable campus incident reporting ecosystem that spans both web and mobile devices, while balancing fast student onboarding with strict trust, privacy, and synchronized performance requirements.",
    solution:
      "Built a centralized backend using Node.js, PostgreSQL, and Firebase-integrated services, with a Python-based AI incident classification and priority rating system secured with JWT authentication and role-based access control, paired with modular React web and React Native mobile applications.",
  },
  {
    id: 4,
    title: "LibraFlow AI",
    description:
      "LibraFlow AI is an intelligent library resource management system built for Lead City University. It streamlines book cataloguing, circulation, borrowing, returns, and overdue tracking while integrating fuzzy book search and personalized recommendations for a smarter library experience.",
    platforms: ["web"],
    images: ["lb1.png", "lb2.png", "lb3.png", "lb4.png"],

    github: "https://github.com/abdul1013/libraflow",

    live: "https://libraflow-beta.vercel.app/",

    tags: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Library Tech",
      "AI Recommendations",
      "Full-Stack",
      "University Project",
    ],
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
    collaborated: false,
    challenge:
      "The main technical problem was creating a reliable library management system that could handle concurrent borrow/return actions, fuzzy book discovery, and personalized recommendations without data inconsistency or poor performance. The codebase shows this was solved in a real production-style setup using async database access, rule-heavy business logic, and a full-stack architecture",
    solution:
      "The solution was a FastAPI + SQLModel + PostgreSQL backend with transaction-safe services, including row-level locking in the circulation logic to prevent race conditions on available copies and overdue status updates. Search uses a hybrid DB filter + rapidfuzz Levenshtein scoring for typo-tolerant results, and recommendations combine collaborative filtering with category popularity; the frontend is a Next.js app that surfaces admin/student flows in a clean, responsive interface.",
  },
  {
    id: 5,
    title: "EventFlow",
    description:
      "EventFlow is a full-stack event ticketing and check-in platform that helps organizers manage events, issue QR tickets, optimize seating, and handle high-traffic check-ins reliably.",
    platforms: ["web", "mobile"],
    images: [
      "evf1.png",
      "evf2.png",
      "evf3.png",
      "evf4.png",
      "evf5.jpeg",
      "evf6.png",
      "evf7.jpeg",
      "evf8.jpeg",
    ],
 
      github:  "https://github.com/abdul1013/eventflow_backend",
    
 
      live: "https://eventflowng.store/events",
    
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
    features: [
      "Monorepo architecture with shared types and UI packages",
      "Admin dashboard for event, venue, ticket, and attendee management",
      "Attendee web experience for event discovery and ticket access",
      "React Native staff app for fast QR-based check-in",
      "Python seat-allocation microservice for smart utilization",
      "Redis-backed QR token validation and high-concurrency support",
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
    collaborated: false,
    challenge:
      "The main technical problem was scaling event check-in and seat allocation under high concurrency without making the API slow or inconsistent. QR validation and allocation logic were both latency-sensitive and database-heavy, so peak traffic could create long p99 latency, ticket replay risk, and poor seat utilization under load.",
    solution:
      "The project split the system into a TypeScript API backed by PostgreSQL and Redis, plus a separate Python SAO microservice for heavy seat-allocation compute. QR tokens are short-lived, HMAC-signed, and validated atomically in Redis to avoid expensive DB checks and prevent reuse; allocations run asynchronously through the SAO service so the API stays responsive. Shared type contracts in the monorepo and Prisma-based data access keep the stack consistent and reduce integration drift.",
  },
  {
    id: 6,
    title: "Interactive Bulletin Management System",
    description:
      "A role-aware full-stack bulletin platform designed to replace fragmented WhatsApp and memo-based communication at Lead City University with a single, secure, real-time announcement system for students, staff, and administrators.",
    platforms: ["web"],
    images: [
      "/ibms1.png",
      "/ibms2.png",
      "/ibms3.png",
      "/ibms4.png",
      "/ibms5.png",
      "/ibms6.png",
      "/ibms7.png",
      "/ibms8.png",
    ],
   
      github: 
       "https://github.com/abdul1013/IBMS",
     
      live: "https://ibms.online/",
     
    tags: [
      "University",
      "Bulletin Board",
      "Role-Based Access Control",
      "Real-Time",
      "Analytics",
      "Full-Stack",
    ],
    features: [
      "Role-based access control for guest, student, staff, and admin interfaces",
      "Drafting, approval, publishing, and archival workflow for announcements",
      "Real-time updates and notifications powered by Socket.IO",
      "Comments, reactions, and acknowledgement tracking for engagement",
      "Analytics dashboard for admin monitoring and post-performance insights",
      "Secure authentication and API protection with JWT, Redis, and rate limiting",
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
    collaborated: false,
    challenge:
      "The university had fragmented communication across memos, WhatsApp, and manual approval chains, making it hard to publish and track official updates securely. Technically, the system needed one role-aware platform with strong access control, secure auth, real-time updates, file uploads, analytics, and consistent data handling across MongoDB, Redis, and a React frontend.",
    solution:
      "The project implemented a TypeScript full-stack architecture: Express + Node.js for the API, React + Vite for the UI, MongoDB for persistent bulletin data, Redis for session/refresh-token support and live cache, and Socket.IO for real-time bulletin notifications. Auth is enforced with JWTs and refresh cookies, role-based middleware restricts access by user type, API security includes rate limiting and NoSQL input sanitization, Cloudinary handles attachments, and automated archiving keeps older content manageable. Frontend rendering is role-specific, while Render and Vercel host the backend and frontend separately.",
  },
  {
    id: 7,
    title: "Voxza",
    description:
      "A full-stack AI-powered video journaling platform that lets users record short video entries, and receive automatic transcription, summarization, mood analysis, and semantic search insights through a React Native mobile app.",
    platforms: ["mobile"],
    images: [],

      github: "https://github.com/abdul1013/voxza",
      live:"",
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
    features: [
      "Short-video capture and upload",
      "AI transcription and content analysis",
      "Emotion, mood, and action-item extraction",
      "Semantic search across journal entries",
      "Secure authentication, storage, and sharing",
      "Background processing with Celery",
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
    collaborated: false,
    challenge:
      "The core technical problem was that video upload and AI analysis were too heavy to run inline in the FastAPI request path: ffmpeg audio extraction, Google Speech transcription, and Gemini summarization/insight generation create long latency, high memory usage, and fragile failure handling when the user waits for the upload to finish",
    solution:
      "The project separated the fast path from the expensive path by moving analysis into a Celery + Redis background pipeline. The API accepts uploads quickly, stores metadata in PostgreSQL/Supabase, and queues processing jobs; workers then stream video from GCS, extract audio in parallel with ffmpeg, transcribe with Google Cloud Speech, and analyze content with Gemini, updating result state asynchronously for processed or failed jobs.",
  },
  {
    id: 8,
    title: "LDX Streetwear",
    description:
      "A modern e-commerce platform for LDX — a contemporary streetwear fashion brand offering curated collections of urban apparel, accessories, and limited-edition drops for fashion-forward individuals.",
    platforms: ["web"],
    images: ["/ldx.png", "/ldx-mobile.png"],
    
      github:  "",
       
      live: "https://ldx-fashion.vercel.app/",
   
    tags: ["Next.js", "Paystack", "TailwindCSS", "Firebase"],
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
      "Firebase",
      "MongoDB",
      "Paystack API",
      "TailwindCSS",
      "Redux",
      "Cloudinary",
      "SendGrid",
    ],
    collaborated: false,
    challenge:
      "Creating a visually stunning, high-performance e-commerce platform that captures the brand's edgy streetwear aesthetic while handling inventory management, secure payments, and providing an engaging shopping experience across devices.",
    solution:
      "Built a headless e-commerce solution using Next.js for optimal performance and SEO, integrated payment processing, implemented real-time inventory tracking with MongoDB, and designed a mobile-first interface that showcases products with high-quality imagery and smooth animations to enhance the brand's urban identity.",
  },
  {
    id: 9,
    title: "ChillinPay",
    description:
      "A frictionless fintech payment platform built for Nigerian businesses to eliminate payment losses, inaccurate sales records, and time waste — enabling instant, no-signup payments with cutting-edge security and seamless integration.",
    platforms: ["web"],
    images: ["/chillingpay.png"],
   
      github:  "https://github.com/Abdul1013/payee",
     
      live: "https://dashboard-ky1tfd13t-abdul1013s-projects.vercel.app/",
    
    tags: ["Next.js", "TailwindCSS"],
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
    collaborated: false,
    challenge:
      "Creating a payment solution that eliminates customer friction by removing signup requirements while maintaining security, building trust in Nigeria's fintech space, and providing businesses with accurate, real-time payment tracking without complex integration processes.",
    solution:
      "Developed a lightweight, algorithm-driven payment platform with order tag-based transactions that allow instant payments without user accounts, implemented encryption for security, designed an engaging interface to communicate simplicity and trust, built a merchant API, and created an intuitive dashboard for real-time payment and sales insights.",
  },
  {
    id: 10,
    title: "VEHICULARS",
    description:
      "A comprehensive vehicle management platform delivering technology-driven solutions across Nigeria — from vehicle registration and driver's licenses to peer-to-peer auto financing, spare parts marketplace, roadside assistance, and auto port clearing services.",
    platforms: ["web", "mobile"],
    images: ["/Vehicular.jpg"],
   
      github:  "https://github.com/yourusername/vehiculars",
      
      live:  "https://vehicula.vercel.app/",
   
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Paystack"],
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
    collaborated: false,
    challenge:
      "Migrating legacy PHP codebase to modern stack while reducing cognitive overload from complex, multi-service workflows; ensuring seamless integration of diverse vehicle-related services; and building trust in a market with fragmented service providers and documentation processes.",
    solution:
      "Re-architected the platform using Next.js and TypeScript for type safety and performance, redesigned the UX with intuitive step-by-step workflows, implemented a unified service dashboard, integrated real-time tracking, and built a robust API layer connecting multiple service providers.",
  },
  {
    id: 11,
    title: "Car E-commerce Platform",
    description:
      "A scalable and secure Django-based platform featuring advanced search, inventory management, payment integration, user authentication, order tracking, and an admin dashboard for dealers.",
    platforms: ["web"],
    images: ["/carEcommerce.png"],
    links: {
      github: {
        web: "https://github.com/Abdul1013/Car-Selling-Web-App",
        mobile: "",
      },
      live: {
        web: "https://car-ecommerce-demo.vercel.app",
      },
    },
    tags: ["Django", "SQL", "Bootstrap"],
    features: [
      "Advanced search and filtering system",
      "Secure payment processing with PayPal",
      "Comprehensive inventory management",
      "User authentication and profiles",
      "Order tracking and history",
      "Admin dashboard for dealers",
    ],
    technologies: ["Django", "SQLite", "Bootstrap", "PayPal API"],
    collaborated: true,
    challenge:
      "Creating a scalable platform that could handle thousands of vehicle listings with complex filtering options while maintaining performance.",
    solution:
      "Implemented efficient database indexing, query optimization, and caching strategies to ensure fast search results even with large datasets.",
  },
  {
    id: 12,
    title: "Student Planning App",
    description:
      "An intuitive app to help students manage their organization, planning, and academic schedules with smart reminders and progress tracking.",
    platforms: ["web"],
    images: ["/plannerZ.png"],
    links: {
      github: {
        web: "https://github.com/Abdul1013/Student-Organizing-App",
        mobile: "",
      },
      live: {
        web: "https://student-planner-demo.vercel.app",
      },
    },
    tags: ["HTML", "CSS", "JavaScript", "MongoDB"],
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
    collaborated: false,
    challenge:
      "Designing an intuitive interface that would appeal to students while providing comprehensive planning features without overwhelming users.",
    solution:
      "Conducted extensive user research with students to create a minimalist yet powerful interface with progressive disclosure of advanced features.",
  },
  {
    id: 13,
    title: "StudyHub",
    description:
      "A learning platform for students to prepare for exams using AI with tools like study cards and quizzes.",
    platforms: ["web"],
    images: ["studentHub.png"],
    links: {
      github: {
        web: "https://github.com/Abdul1013/studyhub",
        mobile: "",
      },
      live: {
        web: "https://studenthub-delta.vercel.app/",
      },
    },
    tags: ["Next.js", "Groq", "Material UI", "Firebase"],
    features: [
      "AI-powered study cards and quizzes",
      "Different study modes",
      "Real-time collaborative document editing",
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
    collaborated: false,
    challenge:
      "Building a platform that could facilitate meaningful connections between students with similar academic interests and enable effective collaboration.",
    solution:
      "Developed an AI-powered matching algorithm that analyzes study habits, academic interests, and learning styles to suggest compatible study partners.",
  },
  {
    id: 14,
    title: "BiteBuzz",
    description:
      "A food delivery responsive web app for a snack restaurant to connect with customers, accept custom orders, and provide personalized recommendations.",
    platforms: ["web", "mobile"],
    images: ["/Bitbuzz.png"],
    links: {
      github: {
        web: "https://github.com/Abdul1013/bitebuzz",
        mobile: "",
      },
      live: {
        web: "",
      },
    },
    tags: ["React", "Firebase", "Material UI"],
    features: [
      "Personalized restaurant recommendations",
      "In-app payment processing",
      "Meal rating and review system",
      "Loyalty program for frequent customers",
      "Multi-language support",
    ],
    technologies: ["React Native", "Firebase", "Push Notifications", "i18n"],
    collaborated: true,
    challenge:
      "Creating a seamless experience for both customers and restaurant owners while ensuring accurate real-time order tracking.",
    solution:
      "Implemented a robust real-time database with Firebase and integrated location services for precise tracking and delivery time estimation.",
  },
  {
    id: 15,
    title: "EasyTopUp",
    description:
      "A mobile app built with React Native for students and everyday users to easily buy airtime, data, and make subscriptions for utilities like cable TV and electricity, all in one secure platform.",
    platforms: ["mobile"],
    images: ["/easyTopUp.png"],
    links: {
      github: {
        web: "https://github.com/Abdul1013/EasyTopUp",
        mobile: "",
      },
      live: {
        web: "",
      },
    },
    tags: ["React Native", "Firebase", "Paystack"],
    features: [
      "Airtime top-up for all major Nigerian networks",
      "Mobile data purchase by bundle type",
      "Cable TV (DSTV, GOTV, Startimes) subscriptions",
      "Electricity bill payments",
      "In-app payment with Paystack",
      "User authentication and transaction history",
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
      "Used Firebase for real-time database and authentication, Paystack for secure payments, Expo for a clean responsive UI, and modular service APIs for utility transactions.",
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
