import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaGlobe, FaArrowLeft, FaCode, FaServer, FaPaintBrush, FaFileAlt } from "react-icons/fa";
import SEO from "../components/SEO";

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

const allDevelopers = [
  { name: "Aastha Oswal", role: "Backend Developer", image: aasthaImg, linkedin: "https://www.linkedin.com/in/aasthaoswal/", github: "https://github.com/AasthaOswal", portfolio: "#", category: "Backend", color: "from-indigo-600 to-purple-500" },
  { name: "Sanika Salunkhe", role: "Backend Developer", image: sanikaImg, linkedin: "https://www.linkedin.com/in/sanika-salunkhe-18a237329/", github: "https://github.com/SanikaSalunkhe1", portfolio: "#", category: "Backend", color: "from-indigo-600 to-purple-500" },
  { name: "Atharv Kotwal", role: "UI/UX Designer", image: atharvImg, linkedin: "https://www.linkedin.com/in/atharv-kotwal-b95559330?", github: "https://github.com/GrandPredator", portfolio: "#", category: "Design", color: "from-rose-600 to-orange-500" },
  { name: "Swar Shinde", role: "Frontend Developer", image: swarImg, linkedin: "https://www.linkedin.com/in/swar-shinde-91131a2b9/", github: "https://github.com/Swarspage", portfolio: "https://swarspage.github.io/My-Portfolio/", category: "Frontend", color: "from-blue-600 to-cyan-400" },
  { name: "Yash Bawari", role: "Frontend Developer", image: yashImg, linkedin: "https://www.linkedin.com/in/yash-bawari-5a3379313/", github: "https://github.com/YashBawari18", portfolio: "https://my-portfolio-six-alpha-47.vercel.app/", category: "Frontend", color: "from-blue-600 to-cyan-400" },
  { name: "Devang Bhattad", role: "UI/UX Designer", image: null, linkedin: "#", github: "#", portfolio: "#", category: "Design", color: "from-rose-600 to-orange-500" },
  { name: "Shruti Gaonkar", role: "Documentation Specialist", image: shrutiImg, linkedin: "https://github.com/ShrutiGaonkar19", github: "https://github.com/ShrutiGaonkar19", portfolio: "#", category: "Docs", color: "from-emerald-600 to-teal-500" },
];

const MeetDevelopers = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <SEO title="Meet The Developers" description="Meet the student development team behind the DMCE SIMS platform." url="/developers" />
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col relative selection:bg-blue-100">

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(#1D3EA1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      </div>

      {/* COMPACT HEADER */}
      <header className="z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 py-2 sm:py-3 px-4 sm:px-12 flex-none">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => navigate("/")}>
            <img src={dmceLogo} alt="DMCE Logo" className="w-8 h-8 object-contain" />
            <div>
              <h1 className="text-lg font-black text-[#1D3EA1] leading-none tracking-tighter uppercase">DMCE PORTAL</h1>
              <p className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">Computer Engineering</p>
            </div>
          </div>

          <div className="hidden md:block">
            <span className="text-[10px] font-black tracking-[0.5em] text-slate-300 uppercase">Developers</span>
          </div>

          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
          </button>
        </div>
      </header>

      {/* MAIN CONTENT - Natural Scrolling Grid */}
      <main className="flex-1 container mx-auto p-4 sm:p-8 md:p-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {allDevelopers.map((dev, idx) => (
            <div key={idx} className="reveal reveal-y group">
              <div className="h-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 relative flex flex-col justify-center items-center text-center hover:-translate-y-2">

                {/* Visual Flair */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${dev.color} rounded-t-2xl sm:rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                {/* Avatar */}
                <div className="relative mb-4 shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <div className={`absolute inset-0 bg-gradient-to-br ${dev.color} rounded-full blur-xl opacity-0 group-hover:opacity-15 transition-opacity`}></div>
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
                    {dev.image ? (
                      <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                    ) : (
                      <FaPaintBrush className="text-slate-300 text-3xl md:text-4xl" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <p className="text-[8px] sm:text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase">{dev.category}</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tighter leading-tight group-hover:text-blue-600 transition-colors">
                    {dev.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-500">{dev.role}</p>
                </div>

                {/* Socials - Simple & Elegant */}
                <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="transition-all hover:text-[#0077b5] text-slate-300"><FaLinkedin className="text-sm sm:text-lg" /></a>
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="transition-all hover:text-slate-900 text-slate-300"><FaGithub className="text-sm sm:text-lg" /></a>
                  {dev.portfolio !== "#" && (
                    <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="transition-all hover:text-blue-600 text-slate-300"><FaGlobe className="text-sm sm:text-lg" /></a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* TIGHT FOOTER */}
      <footer className="flex-none py-2 sm:py-3 border-t border-slate-200/60 bg-white/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 flex justify-between items-center opacity-40">
          <span className="text-[8px] font-black tracking-[0.3em] text-slate-900 uppercase">DMCE © 2026</span>
          <div className="h-px w-20 bg-slate-200 hidden md:block"></div>
          <span className="text-[8px] font-black tracking-[0.3em] text-blue-600 uppercase">PRECISION ENGINEERED</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        .reveal { opacity: 0; transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-y { transform: translateY(30px); }
        .reveal.active { opacity: 1; transform: translateY(0); }
      `}} />
    </div>
    </>
  );
};

export default MeetDevelopers;
