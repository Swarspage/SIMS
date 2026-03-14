import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaGlobe, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Assets
import dmceBuilding from "../assets/dmce_building.png";
import facultyGroup from "../assets/faculty_group.jpg";
import hodPhoto from "../assets/hod_photo.png";
import dmceLogo from "../assets/dmce_logo_new.png";
import csiLogo from "../assets/csi_logo_new.png";

// Developer Images
import yashImg from "../assets/Yash.JPG";
import sanikaImg from "../assets/Sanika.png";
import atharvImg from "../assets/Atharv.png";
import aasthaImg from "../assets/Aastha.png";
import shrutiImg from "../assets/Shruti.png";

const developers = [
  { name: "Yash Sunder Bawari", role: "Frontend Developer", image: yashImg, linkedin: "https://www.linkedin.com/in/yash-bawari-5a3379313/", github: "https://github.com/YashBawari18", portfolio: "https://my-portfolio-six-alpha-47.vercel.app/" },
  { name: "Sanika Salunkhe", role: "Backend Developer", image: sanikaImg, linkedin: "https://www.linkedin.com/in/sanika-salunkhe-18a237329/", github: "https://github.com/SanikaSalunkhe1", portfolio: "#" },
  { name: "Atharv Santosh Kotwal", role: "UI/UX Designer", image: atharvImg, linkedin: "https://www.linkedin.com/in/atharv-kotwal-b95559330?", github: "https://github.com/GrandPredator", portfolio: "#" },
  { name: "Aastha Oswal", role: "Backend Developer", image: aasthaImg, linkedin: "#", github: "#", portfolio: "#" },
  { name: "Shruti Gaonkar", role: "Documentation", image: shrutiImg, linkedin: "https://github.com/ShrutiGaonkar19", github: "#", portfolio: "#" },
];

const events = [
  { title: "Code Quest 2024", date: "March 25, 2024", image: facultyGroup, desc: "A 24-hour hackathon to solve real-world problems." },
  { title: "Tech Talk: AI & ML", date: "April 02, 2024", image: dmceBuilding, desc: "Insights into the future of Artificial Intelligence." },
  { title: "Annual Sports Meet", date: "April 15, 2024", image: facultyGroup, desc: "Celebrating athleticism and team spirit." },
  { title: "Cultural Fest", date: "May 05, 2024", image: dmceBuilding, desc: "A showcase of talent, art, and diversity." },
  { title: "Symposium 2024", date: "June 10, 2024", image: facultyGroup, desc: "Annual technical paper presentation competition." },
  { title: "Industry Visit: Tech Parks", date: "July 05, 2024", image: dmceBuilding, desc: "Exploring the heart of India's Silicon Valley." },
  { title: "Workshop: Cloud Computing", date: "August 20, 2024", image: facultyGroup, desc: "Hands-on session with AWS and Azure." },
  { title: "Alumni Meet 2024", date: "September 15, 2024", image: dmceBuilding, desc: "Connecting the leaders of tomorrow with legends of today." },
  { title: "Hack-a-thon: Green Future", date: "October 05, 2024", image: facultyGroup, desc: "Building sustainable solutions for a better world." },
  { title: "Graduation Ceremony", date: "November 20, 2024", image: dmceBuilding, desc: "Celebrating the journey and new beginnings." },
];

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);
  const [activeDev, setActiveDev] = useState(0);

  // Scroll Reveal Logic
  useEffect(() => {
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextEvent = () => setActiveEvent((prev) => (prev + 1) % events.length);
  const prevEvent = () => setActiveEvent((prev) => (prev - 1 + events.length) % events.length);

  const nextDev = () => setActiveDev((prev) => (prev + 1) % developers.length);
  const prevDev = () => setActiveDev((prev) => (prev - 1 + developers.length) % developers.length);

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* 
        ========================================
        HEADER SECTION
        ========================================
      */}
      <header className="fixed top-0 w-full z-50 glass-nav">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={dmceLogo} alt="DMCE Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-white leading-none tracking-tighter">DMCE</h1>
              <p className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase">Computer Engg</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-bold text-blue-400">HOME</a>
            <a href="#college" className="text-sm font-medium hover:text-blue-400 transition-colors uppercase">College</a>
            <a href="#about" className="text-sm font-medium hover:text-blue-400 transition-colors uppercase">About</a>
            <a href="#events" className="text-sm font-medium hover:text-blue-400 transition-colors uppercase">Events</a>
            <a href="#developers" className="text-sm font-bold flex items-center gap-2 text-white hover:text-blue-400 transition-colors group">
              <span className="status-dot"></span>
              DEVELOPER
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => navigate("/login")} 
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shine-effect"
              >
                Student
              </button>
              <button 
                onClick={() => navigate("/admin/login")} 
                className="px-4 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                Admin
              </button>
              <button 
                onClick={() => navigate("/division/login")} 
                className="px-4 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                Division
              </button>
            </div>
            <button className="p-2 text-white md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden glass-nav absolute top-full left-0 w-full p-6 space-y-4 animate-fadeIn max-h-[80vh] overflow-y-auto border-t border-white/5">
            <a href="#" className="block text-blue-400 font-bold" onClick={() => setIsMenuOpen(false)}>HOME</a>
            <a href="#college" className="block font-medium" onClick={() => setIsMenuOpen(false)}>COLLEGE</a>
            <a href="#about" className="block font-medium" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
            <a href="#events" className="block font-medium" onClick={() => setIsMenuOpen(false)}>EVENTS</a>
            <a href="#developers" className="flex items-center gap-3 font-bold text-white uppercase" onClick={() => setIsMenuOpen(false)}>
              <span className="status-dot"></span>
              Developer
            </a>
            <div className="pt-4 space-y-2 border-t border-white/10">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-2">Portals</p>
              <button onClick={() => navigate("/login")} className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-xl font-bold transition-colors">Student Login</button>
              <button onClick={() => navigate("/admin/login")} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-colors">Admin Login</button>
              <button onClick={() => navigate("/division/login")} className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-colors">Division Login</button>
            </div>
          </div>
        )}
      </header>

      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0 animate-hero-fade">
          <img src={dmceBuilding} alt="DMCE Building" className="w-full h-full object-cover opacity-20 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d] via-transparent to-[#0a0f1d]"></div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-blue-400 uppercase glass-card rounded-full border border-blue-500/20 animate-hero-slide">
              Welcome to the Future
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] animate-text-gradient bg-gradient-to-r from-white via-blue-400 to-white text-transparent bg-clip-text animate-hero-slide animation-delay-100">
              INNOVATE.<br />CREATE.<br />EXCEL.
            </h1>
            <p className="text-base md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-hero-slide animation-delay-200">
              The Department of Computer Engineering at <span className="text-white font-bold">DMCE</span> is where ambition meets opportunity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-hero-slide animation-delay-300">
              <a
                href="https://dmce.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white text-black font-black rounded-full hover:scale-105 transition-transform shine-effect text-center"
              >
                DISCOVER MORE
              </a>
              <a href="#college" className="px-10 py-4 glass-card font-black rounded-full hover:bg-white/10 transition-all border border-white/20 text-center">
                OUR CAMPUS
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        COLLEGE COLLAGE SECTION
        ========================================
      */}
      <section id="college" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 reveal reveal-y">
            <h2 className="text-4xl md:text-5xl font-black mb-4">THE CAMPUS LIFE</h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 min-h-[400px] md:h-[600px]">
            <div className="col-span-2 md:row-span-2 overflow-hidden rounded-2xl md:rounded-3xl relative group reveal reveal-x-left">
              <img src={dmceBuilding} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Campus 1" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm md:text-xl font-bold">The Iconic DMCE Building</p>
              </div>
            </div>
            <div className="h-40 md:h-auto overflow-hidden rounded-2xl md:rounded-3xl relative group reveal reveal-y delay-100">
              <img src={facultyGroup} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Campus 2" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="h-40 md:h-auto overflow-hidden rounded-2xl md:rounded-3xl relative group reveal reveal-y delay-200">
              <img src={dmceBuilding} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Campus 3" />
            </div>
            <div className="col-span-2 h-40 md:h-auto overflow-hidden rounded-2xl md:rounded-3xl relative group reveal reveal-x-right delay-300">
              <img src={facultyGroup} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Campus 4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sm md:text-xl font-bold">Collaborative Learning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        HOD & COLLEGE SECTION
        ========================================
      */}
      <section id="about" className="py-20 md:py-32 bg-[#0c1221] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 reveal reveal-x-left">
              <div className="relative group">
                <div className="relative z-10 rounded-3xl overflow-hidden glass-card p-2 border border-white/10 transition-transform duration-500 group-hover:rotate-y-12">
                  <img src={hodPhoto} alt="HOD" className="w-full rounded-2xl shadow-2xl" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/30 rounded-full blur-2xl -z-10"></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 reveal reveal-x-right">
              <span className="text-blue-400 font-black tracking-widest text-xs uppercase mb-4 block">Leadership</span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">DR. DHIRAJ BHANE<br /><span className="text-blue-500 text-3xl font-bold italic">Head of Department</span></h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-sm md:text-base">
                <p>Welcome to the Department of Computer Engineering. Our mission is to bridge the gap between academic theory and industry reality through innovation, dedication, and excellence.</p>
                <p>At DMCE, we foster a culture of lifelong learning and research, ensuring our students are not just engineers, but visionaries who can shape the digital world.</p>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 md:gap-8">
                <div>
                  <h4 className="text-3xl md:text-5xl font-black text-white">25+</h4>
                  <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Years of Excellence</p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-5xl font-black text-white">5000+</h4>
                  <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Global Alumini</p>
                </div>
              </div>
              <a
                href="https://dmce.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-12 text-sm font-black text-blue-400 border-b-2 border-blue-400 pb-2 hover:text-white hover:border-white transition-all"
              >
                LEARN MORE ABOUT US &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        EVENTS CAROUSEL
        ========================================
      */}
      <section id="events" className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal reveal-y">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4">MOMENTS & MILESTONES</h2>
              <p className="text-gray-500 font-medium">Experience the vibrant pulse of our department.</p>
            </div>
            <div className="flex space-x-4">
              <button onClick={prevEvent} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 group">
                <FaChevronLeft className="group-hover:scale-120" />
              </button>
              <button onClick={nextEvent} className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-blue-600 transition-all border border-white/10 group">
                <FaChevronRight className="group-hover:scale-120" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl h-[400px] md:h-[600px] shadow-2xl reveal reveal-y">
            {events.map((event, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeEvent ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-110 translate-x-full"}`}
              >
                <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
                  <span className="text-blue-400 font-bold mb-4">{event.date}</span>
                  <h3 className="text-3xl md:text-5xl font-black mb-6">{event.title}</h3>
                  <p className="max-w-xl text-gray-300 text-sm md:text-lg">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================
        DEVELOPERS SECTION (Crazy Mobile Design)
        ========================================
      */}
      <section id="developers" className="py-20 md:py-40 bg-[#060b18] relative overflow-hidden">
        {/* Environmental Code Stream */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden flex justify-around">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="text-[10px] text-blue-500 font-mono whitespace-nowrap animate-code writing-mode-vertical" style={{ animationDelay: `${i * 2}s` }}>
              {`const developer = architects[${i}]; system.deploy(dev_core_${i * 1024}); 0x${(i * 12345).toString(16)}`}
            </div>
          ))}
        </div>

        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20 cyber-grid"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#060b18] via-transparent to-[#060b18]"></div>

        {/* Data Scan Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.6)] z-0 animate-[scanline_6s_linear_infinite]"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="reveal reveal-y mb-24">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-[1px] w-12 bg-blue-500/50"></div>
              <span className="text-blue-500 font-black tracking-[0.8em] text-[10px] uppercase animate-pulse">Neural Core Interface</span>
              <div className="h-[1px] w-12 bg-blue-500/50"></div>
            </div>
            <h2 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">MEET THE ARCHITECTS</h2>
            <p className="text-gray-500 font-black tracking-widest uppercase text-xs">Accessing System.Architect.Profiles...</p>
          </div>

          <div className="relative min-h-[650px] md:min-h-[850px] flex items-center justify-center">
            {developers.map((dev, index) => {
              const isActive = index === activeDev;
              const offset = (index - activeDev + developers.length) % developers.length;

              return (
                <div
                  key={index}
                  onClick={() => setActiveDev(index)}
                  className={`absolute w-full max-w-[360px] md:max-w-[460px] transition-all duration-700 cursor-pointer preserve-3d
                    ${isActive ? "z-30 opacity-100 translate-y-0 scale-105" :
                      offset === 1 || offset === -4 ? "z-20 scale-85 opacity-20 translate-x-[75%] md:translate-x-[115%] rotate-y-[-35deg] blur-[4px]" :
                        offset === developers.length - 1 || offset === 4 ? "z-20 scale-85 opacity-20 translate-x-[-75%] md:translate-x-[-115%] rotate-y-[35deg] blur-[4px]" :
                          "z-10 scale-75 opacity-0 invisible"
                    }
                  `}
                >
                  <div className={`relative group glass-card p-[2px] rounded-[3.5rem] transition-all duration-700 overflow-visible ${isActive ? "shadow-[0_0_100px_rgba(59,130,246,0.5)] border-blue-500 glitch-trigger" : "border-white/5"}`}>

                    {/* HUD Status Elements */}
                    {isActive && (
                      <>
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-end space-x-1 h-32 opacity-50">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="data-bar animate-[data-pulse_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s` }}></div>
                          ))}
                        </div>
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-end space-x-1 h-32 opacity-50">
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="data-bar animate-[data-pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.15}s` }}></div>
                          ))}
                        </div>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-blue-400/60 tracking-[0.5em] animate-pulse">
                          SQNR: 0x82A..{index * 123} | STATUS: OPTIMAL
                        </div>
                      </>
                    )}

                    <div className={`bg-[#040813]/95 rounded-[3.4rem] p-10 md:p-14 h-full relative overflow-hidden ${isActive ? "hologram-flicker" : ""}`}>
                      {/* Technical Blueprint Overlay */}
                      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
                      <div className="absolute inset-0 border border-blue-500/10 rounded-[3.3rem] pointer-events-none"></div>

                      {/* Coordinate Labels */}
                      <div className="absolute bottom-6 left-8 text-[8px] font-mono text-blue-500/40">LOC: [34.2, -118.4]</div>
                      <div className="absolute bottom-6 right-8 text-[8px] font-mono text-blue-500/40">X-REF: DEV_0{index + 1}</div>

                      {/* Hello HUD */}
                      <div className={`absolute top-4 right-4 md:top-8 md:right-10 px-3 py-1 md:px-5 md:py-2 bg-blue-500/10 backdrop-blur-2xl rounded-sm border-l-4 border-blue-500 z-30 transition-all duration-700 pointer-events-none shadow-[0_0_40px_rgba(59,130,246,0.4)] ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                        <span className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-2 md:gap-3">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-ping"></span>
                          Hello..!! 👋
                        </span>
                      </div>

                      <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-12">
                        {/* Multi-Layer HUD Rings */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="hud-ring hud-ring-1"></div>
                            <div className="hud-ring hud-ring-2"></div>
                            <div className="hud-ring hud-ring-3"></div>

                            {/* Floating Tech Modules */}
                            <div className="absolute w-full h-full animate-[spin-slow_10s_linear_infinite]">
                              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-[#0a0f1d] border-2 border-blue-500/80 shadow-[0_0_15px_rgba(59,130,246,0.8)] flex items-center justify-center text-blue-400 text-xs font-black animate-pulse">JS</div>
                              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-lg bg-[#0a0f1d] border-2 border-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.8)] flex items-center justify-center text-purple-400 text-xs font-black animate-pulse delay-700">⚛️</div>
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-[#0a0f1d] border border-cyan-400/50 flex items-center justify-center text-cyan-400 text-[10px] font-black">TS</div>
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-8 rounded-lg bg-[#0a0f1d] border border-orange-400/50 flex items-center justify-center text-orange-400 text-[10px] font-black">HT</div>
                            </div>
                          </div>
                        )}

                        {/* Image Power Glow */}
                        {isActive && (
                          <>
                            <div className="absolute inset-0 bg-blue-500/30 blur-[80px] rounded-full animate-pulse"></div>
                            <div className="absolute inset-[-20px] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-2xl rounded-full opacity-50"></div>
                          </>
                        )}

                        <div className={`relative w-full h-full rounded-full overflow-hidden border-4 transition-all duration-700 ${isActive ? "border-blue-500 scale-110 shadow-[0_0_60px_rgba(59,130,246,0.8)]" : "border-white/5 opacity-30 grayscale"}`}>
                          <img
                            src={dev.image}
                            alt={dev.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Inner Scan Line overlay */}
                          {isActive && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent h-[50%] animate-[scanline_2s_linear_infinite] pointer-events-none"></div>}
                        </div>

                        {/* Outer Tech Shell */}
                        {isActive && <div className="absolute inset-[-15px] border-[1px] border-dashed border-blue-500/40 rounded-full animate-[spin_25s_linear_infinite]"></div>}
                      </div>

                      <div className="text-center relative z-10">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-gray-800"}`}></div>
                          <span className={`text-[9px] font-black tracking-[0.5em] uppercase transition-colors ${isActive ? "text-blue-400" : "text-gray-700"}`}>Lead Protocol Architect</span>
                        </div>
                        <h3 className={`text-3xl md:text-5xl font-black mb-6 tracking-tighter transition-all duration-700 ${isActive ? "text-white scale-105" : "text-gray-700"}`}>{dev.name}</h3>

                        <div className="flex justify-center mb-12">
                          <div className={`px-8 py-3 rounded-sm text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-500 border-x-2 relative group/btn overflow-hidden ${isActive ? "bg-blue-500/5 border-blue-500 text-blue-400 shadow-[0_0_40px_rgba(59,130,246,0.1)]" : "bg-white/5 border-white/5 text-gray-800"}`}>
                            {isActive && <div className="absolute inset-0 bg-blue-500/10 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"></div>}
                            <span className="relative z-10">{dev.role}</span>
                          </div>
                        </div>

                        <div className={`flex justify-center space-x-10 transition-all duration-700 delay-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
                          <a href={dev.linkedin} className="w-14 h-14 rounded-full bg-[#0a0f1d] flex items-center justify-center text-2xl text-gray-500 hover:text-blue-400 border border-white/5 hover:border-blue-500/50 shadow-xl transition-all hover:-translate-y-4 hover:shadow-blue-500/20"><FaLinkedin /></a>
                          <a href={dev.github} className="w-14 h-14 rounded-full bg-[#0a0f1d] flex items-center justify-center text-2xl text-gray-500 hover:text-white border border-white/5 hover:border-white/50 shadow-xl transition-all hover:-translate-y-4 hover:shadow-white/20"><FaGithub /></a>
                          <a href={dev.portfolio} className="w-14 h-14 rounded-full bg-[#0a0f1d] flex items-center justify-center text-2xl text-gray-500 hover:text-purple-400 border border-white/5 hover:border-purple-500/50 shadow-xl transition-all hover:-translate-y-4 hover:shadow-purple-500/20"><FaGlobe /></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Sidebar Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none z-40 -mx-6 sm:-mx-12 md:-mx-24">
              <button
                onClick={(e) => { e.stopPropagation(); prevDev(); }}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center hover:bg-blue-600/10 transition-all border border-blue-500/30 group pointer-events-auto shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-blue-500/40"
              >
                <FaChevronLeft className="text-blue-500 text-sm md:text-xl group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextDev(); }}
                className="w-10 h-10 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center hover:bg-blue-600/10 transition-all border border-blue-500/30 group pointer-events-auto shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-blue-500/40"
              >
                <FaChevronRight className="text-blue-500 text-sm md:text-xl group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 
        ========================================
        FOOTER
        ========================================
      */}
      <footer className="py-20 border-t border-white/5 relative bg-[#0a0f1d]">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <img src={dmceLogo} alt="DMCE Logo" className="w-10 h-10 object-contain" />
              <h2 className="text-2xl font-black tracking-tighter">DMCE COMPUTER ENGG.</h2>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed italic">
              Empowering engineers to lead, innovate, and excel in the global landscape of technology.
            </p>
            <div className="flex space-x-6">
              <FaLinkedin className="text-2xl text-gray-400 hover:text-blue-500 transition-colors cursor-pointer" />
              <FaGlobe className="text-2xl text-gray-400 hover:text-blue-500 transition-colors cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-blue-400 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-white transition-all">Home</a></li>
              <li><a href="#college" className="hover:text-white transition-all">College</a></li>
              <li><a href="#about" className="hover:text-white transition-all">About</a></li>
              <li><a href="#events" className="hover:text-white transition-all">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-blue-400 uppercase tracking-widest text-xs">Connect</h4>
            <p className="text-sm text-gray-500 mb-4">Airoli, Navi Mumbai, Maharashtra 400708</p>
            <a href="mailto:info@dmce.ac.in" className="text-sm text-white font-bold hover:text-blue-400">info@dmce.ac.in</a>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          <p>© 2024 DMCE Computer Engineering. All Rights Reserved.</p>
          <p>Created with ❤️ by the Architects</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
