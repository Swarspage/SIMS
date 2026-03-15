import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaGlobe, FaArrowLeft, FaCode, FaServer, FaPaintBrush, FaFileAlt } from "react-icons/fa";

// Import Assets
import dmceLogo from "../assets/dmce_logo_new.png";
import dmceBuilding from "../assets/dmce_building.png";

// Developer Images
import yashImg from "../assets/Yash.JPG";
import sanikaImg from "../assets/Sanika.png";
import atharvImg from "../assets/Atharv.png";
import aasthaImg from "../assets/Aastha.png";
import shrutiImg from "../assets/Shruti.png";
import swarImg from "../assets/swar.png";

const teamGroups = [
  {
    category: "Backend Developers",
    color: "from-indigo-600 to-purple-500",
    shadow: "shadow-purple-200",
    icon: <FaServer />,
    description: "Building robust servers and secure data management.",
    members: [
      { name: "Aastha Oswal", role: "Backend Developer", image: aasthaImg, linkedin: "#", github: "#", portfolio: "#" },
      { name: "Sanika Salunkhe", role: "Backend Developer", image: sanikaImg, linkedin: "https://www.linkedin.com/in/sanika-salunkhe-18a237329/", github: "https://github.com/SanikaSalunkhe1", portfolio: "#" },
    ]
  },
  {
    category: "UI/UX Designers",
    color: "from-rose-600 to-orange-500",
    shadow: "shadow-rose-200",
    icon: <FaPaintBrush />,
    description: "Designing beautiful and intuitive user interfaces.",
    members: [
      { name: "Atharv Santosh Kotwal", role: "UI/UX Designer", image: atharvImg, linkedin: "https://www.linkedin.com/in/atharv-kotwal-b95559330?", github: "https://github.com/GrandPredator", portfolio: "#" },
    ]
  },
  {
    category: "Frontend Developers",
    color: "from-blue-600 to-cyan-400",
    shadow: "shadow-blue-200",
    icon: <FaCode />,
    description: "Architecting the visual experience and user interactions.",
    members: [
      { name: "Swar Shinde", role: "Team Lead & Frontend", image: swarImg, linkedin: "https://www.linkedin.com/in/swar-shinde-91131a2b9/", github: "https://github.com/Swarspage", portfolio: "https://swarspage.github.io/My-Portfolio/" },
      { name: "Yash Sunder Bawari", role: "Frontend Developer", image: yashImg, linkedin: "https://www.linkedin.com/in/yash-bawari-5a3379313/", github: "https://github.com/YashBawari18", portfolio: "https://my-portfolio-six-alpha-47.vercel.app/" },
    ]
  },
  {
    category: "Documentation",
    color: "from-emerald-600 to-teal-500",
    shadow: "shadow-teal-200",
    icon: <FaFileAlt />,
    description: "Writing comprehensive guides and technical specs.",
    members: [
      { name: "Shruti Gaonkar", role: "Documentation Specialist", image: shrutiImg, linkedin: "https://github.com/ShrutiGaonkar19", github: "#", portfolio: "#" },
    ]
  }
];

const MeetDevelopers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-500/30 overflow-x-hidden relative">

      {/* 
        ========================================
        MATCHING HOME PAGE BACKGROUND
        ========================================
      */}
      <div className="fixed inset-0 z-0 opacity-30 select-none pointer-events-none">
        <img src={dmceBuilding} alt="DMCE Building" className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      {/* Decorative Blobs & Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[150px] animate-blob translate-z-0"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100/30 rounded-full blur-[150px] animate-blob animation-delay-2000 translate-z-0"></div>

        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#1D3EA1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* 
        ========================================
        HEADER
        ========================================
      */}
      <header className="sticky top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-gray-100 py-4 px-6 md:px-12 backdrop-saturate-150">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <img src={dmceLogo} alt="DMCE Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain relative" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#1D3EA1] leading-none tracking-tighter uppercase transition-colors group-hover:text-blue-600">DMCE</h1>
              <p className="text-[10px] md:text-[11px] font-bold text-gray-400 tracking-[0.3em] uppercase">Computer Engg</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-black hover:bg-blue-600 transition-all shadow-xl hover:-translate-x-1"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">BACK TO HOME</span>
            <span className="sm:hidden">BACK</span>
          </button>
        </div>
      </header>

      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <section className="pt-24 pb-20 px-6 relative overflow-hidden z-10">
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="reveal reveal-y active">
            <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.4em] text-blue-600 uppercase bg-blue-50/80 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Engineering the Future
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-10 text-[#182137] tracking-tight leading-[0.9]">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D3EA1] via-blue-500 to-cyan-400">DEVELOPERS</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium">
              A collective of passionate developers and designers from the Computer Engineering batch of DMCE.
            </p>
          </div>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none opacity-[0.05] -z-10 translate-y-[-20%]">
          <FaCode className="absolute top-10 left-[10%] text-[10vw] rotate-12" />
          <FaServer className="absolute bottom-20 right-[5%] text-[8vw] -rotate-12" />
          <FaPaintBrush className="absolute top-40 right-[15%] text-[6vw] rotate-45" />
          <FaGlobe className="absolute bottom-40 left-[20%] text-[7vw] -rotate-45" />
        </div>
      </section>

      {/* 
        ========================================
        TEAM GROUPS
        ========================================
      */}
      <main className="container mx-auto px-6 md:px-12 space-y-40 mb-40 relative z-10">
        {teamGroups.map((group, gIdx) => (
          <div key={gIdx} className="reveal reveal-y">
            {/* Group Header */}
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 pb-12">
              <div className="max-w-2xl">
                <div className={`inline-flex items-center gap-3 text-sm font-black tracking-[0.3em] uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-r ${group.color}`}>
                  <span className="p-2 rounded-lg bg-white/50 backdrop-blur-sm text-gray-800 shadow-sm">{group.icon}</span>
                  {group.category}
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#182137] tracking-tighter mb-4">
                  Crafting {group.category.split(' ')[0]}
                </h2>
                <p className="text-gray-500 text-lg font-medium">{group.description}</p>
              </div>
              <div className="hidden lg:block text-right">
                <span className="text-8xl font-black text-gray-200/30 pointer-events-none uppercase tracking-tighter">0{gIdx + 1}</span>
              </div>
            </div>

            {/* Members Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 ${group.members.length === 1 ? 'lg:grid-cols-1 max-w-2xl mx-auto' : 'lg:grid-cols-2'} gap-12 lg:gap-20`}>
              {group.members.map((member, mIdx) => (
                <div
                  key={mIdx}
                  className="group perspective-1000"
                >
                  <div className="relative transform-gpu transition-all duration-700 preserve-3d group-hover:rotate-y-12 group-hover:scale-[1.02]">

                    {/* Shadow Layer */}
                    <div className={`absolute inset-0 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br ${group.color} -z-10`}></div>

                    <div className="bg-white/90 rounded-[3.5rem] p-10 md:p-14 border border-white shadow-xl relative overflow-hidden backdrop-blur-md backdrop-saturate-150">

                      {/* Inner Decorative Shapes */}
                      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${group.color} opacity-[0.05] rounded-full translate-x-1/2 -translate-y-1/2`}></div>

                      <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">

                        {/* Image Section */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
                          <div className={`absolute inset-0 bg-gradient-to-br ${group.color} rounded-[2.5rem] rotate-6 scale-105 opacity-20 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700 shadow-2xl`}></div>
                          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white shadow-xl z-20">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 scale-110 group-hover:scale-100"
                            />
                          </div>

                          {/* Floating Badge */}
                          <div className={`absolute -bottom-4 -right-4 px-4 py-2 rounded-xl bg-white shadow-lg border border-gray-50 z-30 transform-gpu transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-2`}>
                            <div className={`text-[10px] font-black tracking-widest text-[#1D3EA1]`}>verified_dev</div>
                          </div>
                        </div>

                        {/* Info Section */}
                        <div className="text-center md:text-left flex-1">
                          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <span className={`w-2 h-2 rounded-full animate-pulse bg-gradient-to-r ${group.color}`}></span>
                            <span className="text-[10px] font-black text-gray-400 tracking-[0.4em] uppercase">{member.role}</span>
                          </div>
                          <h3 className="text-3xl md:text-5xl font-black text-[#182137] tracking-tighter mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                            {member.name}
                          </h3>

                          {/* Socials */}
                          <div className="flex items-center justify-center md:justify-start gap-5">
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-md flex items-center justify-center text-2xl text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 border border-gray-100 shadow-sm"
                            >
                              <FaLinkedin />
                            </a>
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-md flex items-center justify-center text-2xl text-gray-400 hover:text-white hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 border border-gray-100 shadow-sm"
                            >
                              <FaGithub />
                            </a>
                            {member.portfolio !== "#" && (
                              <a
                                href={member.portfolio}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-md flex items-center justify-center text-2xl text-gray-400 hover:text-white hover:bg-cyan-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 border border-gray-100 shadow-sm"
                              >
                                <FaGlobe />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* 
        ========================================
        BIG CTA / FOOTER DECOR
        ========================================
      */}
      <section className="container mx-auto px-6 md:px-12 mb-20 reveal reveal-y z-10 relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-blue-600 blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-[#182137]/90 backdrop-blur-xl rounded-[4rem] p-16 md:p-32 text-center text-white overflow-hidden shadow-2xl border border-white/10">

            {/* Decorative Animated Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]" style={{ backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-none">
                BUILT WITH <br /> <span className="text-cyan-300 italic">PURPOSE.</span>
              </h2>
              <p className="text-xl md:text-2xl text-blue-100/60 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
                This platform is a testament to the skills and dedication of the DMCE Computer Engineering students. Designed for excellence, built for you.
              </p>
              <button
                onClick={() => navigate("/")}
                className="group relative px-12 py-5 bg-white text-[#1D3EA1] font-black rounded-full transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> TAKE ME BACK HOME
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final Tiny Footer */}
      <footer className="py-12 border-t border-gray-100 z-10 relative">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-10 opacity-60 hover:opacity-100 transition-opacity">
            <p className="text-[12px] md:text-[14px] font-black tracking-[0.5em] text-[#182137] uppercase">DMCE COMP DEPT © 2024</p>
            <div className="h-[1px] flex-1 bg-gray-200 hidden md:block mx-10"></div>
            <p className="text-[12px] md:text-[14px] font-black tracking-[0.5em] text-[#1D3EA1] uppercase">HANDCRAFTED IN AIROLI</p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-12 { transform: rotateY(12deg); }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        .reveal {
          opacity: 0;
          transition: all 1s cubic-bezier(0.17, 0.55, 0.55, 1);
        }
        .reveal-y { transform: translateY(100px); }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }

        /* Glass Cards Support */
        .glass-nav {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
      `}} />
    </div>
  );
};

export default MeetDevelopers;
