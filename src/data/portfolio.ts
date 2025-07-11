export const personalInfo = {
  name: "Nihal Johann Thomas",
  title: "Open-source Advocate & CS Enthusiast",
  email: "nihaljohannthomas2003@gmail.com",
  phone: "+91 9840813965",
  linkedin: "linkedin.com/in/nihal-johann-thomas",
  website: "nihaljt.site",
  description: [
    "💻 Passionate Open-source advocate & CS enthusiast with a solid foundation in AI, cybersecurity, and system design",
    "🔐 Skilled in ML, system security, networking, and cloud, focused on solving real-world problems",
    "🧠 Builder of intelligent systems and full-stack applications that are practical and impactful",
    "🌍 Driven to create open, secure, and accessible tech that respects privacy and promotes innovation"
  ]
};

export const education = {
  university: {
    name: "Vellore Institute of Technology",
    location: "Vellore, India",
    degree: "M.Tech Integrated Computer Science Engineering",
    period: "July 2021 - Present",
    // gpa: "7.79"
  },
  school: {
    name: "St. Britto's Academy",
    location: "Chennai, India",
    // details: "CBSE – Class X: 83.4%, Class XII: 78.2%",
    year: "2021"
  }
};

export const skills = {
  "Languages & Libraries": [
    "Python", "C/C++", "Java", "JavaScript", "SQL", "Bash", "PowerShell",
    "NumPy", "Pandas", "Scikit-Learn", "OpenCV", "Matplotlib", "nltk", "SpaCy"
  ],
  "Frameworks & Tools": [
    "TensorFlow", "PyTorch", "React", "FastAPI", "Flask", "Django", "Spring Boot",
    "Maven", "TailwindCSS", "Selenium", "YOLO"
  ],
  "Platforms & Infrastructure": [
    "Proxmox", "Docker", "Jenkins", "Git", "KVM", "LXC", "Linux (Arch, Debian)",
    "AWS", "GCP", "Azure"
  ],
  "Databases & Platforms": [
    "PostgreSQL", "MySQL", "MongoDB", "Supabase", "Apache Server"
  ],
  "Networking & Security": [
    "Wireshark", "WireGuard", "Cloudflare Tunnels", "Nginx Proxy Manager",
    "CEH Concepts", "Noise Protocol"
  ]
};

export const certifications = [
  {
    name: "Certified Ethical Hacker (CEH) v12",
    issuer: "EC-Council",
    status: "Ongoing"
  },
  {
    name: "Advanced: Generative AI for Developers Learning Path",
    issuer: "Google",
    date: "Jun. 2024"
  },
  {
    name: "Gemini for Google Cloud Learning Path",
    issuer: "Google",
    date: "Jun. 2024"
  },
  {
    name: "Introduction to Generative AI Learning Path",
    issuer: "Google",
    date: "Jun. 2024"
  },
  {
    name: "Generative AI Applications using Vertex AI",
    issuer: "SmartBridge",
    date: "Jul. 2024"
  },
  {
    name: "MongoDB - The Complete Developer's Guide",
    issuer: "Udemy",
    date: "Oct. 2022"
  }
];

export const achievements = [
  {
    title: "Vice-Chairperson | DigitSquad VIT",
    period: "Jan. 2025 – Present",
    description: "Led and supported technical event execution, ensuring smooth operations and quick issue resolution."
  },
  {
    title: "Senior Core Committee Member | DigitSquad VIT",
    period: "Jan. 2022 – Jan. 2025",
    description: "Organized 10+ tech events/workshops to boost member engagement and hands-on learning."
  },
  {
    title: "Runners-up – Prudentia Hackathon | VIT University",
    period: "Mar. 2024",
    description: "Built and showcased a functional prototype in a national-level hackathon under tight deadlines."
  },
  {
    title: "1st Place – Synth AI | Jerusalem College of Engineering",
    period: "Oct. 2023",
    description: "Won top spot in a national AI event for practical and innovative solution."
  },
  {
    title: "2nd Place – Fixit Frenzy (Debugging) | Jerusalem College of Engineering",
    period: "Oct. 2023",
    description: "Secured 2nd place by resolving code bugs quickly in a time-bound challenge."
  }
];

export const projects = [
  {
    title: "Deepfake Detection Using Convolution Vision Transformer",
    category: "AI & Computer Vision",
    tags: ["CVT", "CNN", "Vision Transformer", "Image Forensics"],
    description: "Developed an efficient deepfake image classifier combining CNN, Linformer ViTs, SE Blocks, and Mish activation. Achieved high image classification accuracy on public datasets with real-time inference capabilities for edge devices.",
    icon: "🤖",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    title: "Private Cloud Using Proxmox",
    category: "Infrastructure & Security",
    tags: ["Proxmox", "Nextcloud", "Matrix", "Secure Messaging"],
    description: "Deployed a secure private cloud using Proxmox and Nextcloud with Nginx reverse proxy. Integrated Matrix server with Noise Protocol for encrypted real-time messaging across local infrastructure.",
    icon: "☁️",
    gradient: "from-green-500 to-teal-600"
  },
  {
    title: "Optimizing Data Security in Transmission",
    category: "Cryptography & IoT",
    tags: ["ChaCha20", "IoT", "NIST", "Cryptography"],
    description: "Designed lightweight encryption using ChaCha20 and Ikeda chaotic maps tailored for IoT transmissions. Achieved 99.6% NPCR on tile-based image encryption and validated randomness using NIST test suite.",
    icon: "🔐",
    gradient: "from-red-500 to-pink-600"
  },
  {
    title: "Zero-Knowledge Based ID Verification Using Blockchain",
    category: "Blockchain & Privacy",
    tags: ["ZKP", "Blockchain", "FastAPI", "React"],
    description: "Built PrivaProof: blockchain system using ZKPs for anonymous identity verification with QR-based proof. Used Hardhat for testnet, PoA consensus, FastAPI backend, and React-based frontend for verifiable credentials.",
    icon: "🔗",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    title: "FlexDiary – Social Habit Tracker",
    category: "Full Stack Development",
    tags: ["Next.js", "Docker", "Prisma", "PostgreSQL"],
    description: "Designed a Next.js-based habit tracking social platform promoting motivation via community engagement. Enabled goal setting, streak maintenance, and public sharing with Prisma ORM and PostgreSQL backend.",
    icon: "📱",
    gradient: "from-indigo-500 to-purple-600"
  },
  {
    title: "Phishing Site Detection Using Machine Learning",
    category: "Cybersecurity & ML",
    tags: ["MLP", "SVM", "Autoencoder", "Threat Detection"],
    description: "Compared MLP, Random Forest, Decision Tree, SVM, and Autoencoder models for phishing classification. Analyzed URL features like domain data, redirection, and protocol with comprehensive model evaluation.",
    icon: "🛡️",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    title: "Hostel Room Cleaning Scheduler",
    category: "Full Stack Development",
    tags: ["Flask", "HTML", "MongoDB", "Scheduling"],
    description: "Developed a comprehensive room-cleaning scheduling application using Flask framework with HTML templates. Implemented MongoDB for data storage and created an intuitive interface for dorm and office cleaning coordination with automated task assignment.",
    icon: "🏠",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    title: "Church Website with Content Management",
    category: "Full Stack Development",
    tags: ["WordPress", "Jetpack", "MySQL", "PHP"],
    description: "Built a modern church website using WordPress with Jetpack plugin for enhanced functionality. Implemented MySQL database for content storage and utilized PHP for custom programming features including event management, sermon archives, and community engagement tools.",
    icon: "⛪",
    gradient: "from-purple-500 to-violet-600"
  }
];