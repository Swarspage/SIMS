import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaGlobe, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SEO from "../components/SEO";

// Import Assets
import dmceBuilding from "../assets/dmce_building.png";
import facultyGroup from "../assets/faculty_group.jpg";
import hodPhoto from "../assets/hod_photo.png";
import dmceLogo from "../assets/dmce_logo_new.png";
import csiLogo from "../assets/csi_logo_new.png";

import imgi9 from "../assets/imgi_9_csiteam.webp";
import imgi10 from "../assets/imgi_10_ss2.webp";
import imgi11 from "../assets/imgi_11_ss1.webp";
import imgi28 from "../assets/imgi_28_SIH.webp";
import imgi30 from "../assets/imgi_30_Github.webp";
import imgi66 from "../assets/imgi_66_3.webp";
import imgi67 from "../assets/imgi_67_4.webp";
import imgi69 from "../assets/imgi_69_6.webp";
import imgi70 from "../assets/imgi_70_7.webp";
import imgi71 from "../assets/imgi_71_8.webp";
import imgi72 from "../assets/imgi_72_9.webp";
import imgi75 from "../assets/imgi_75_12.webp";
import imgi76 from "../assets/imgi_76_13.webp";
import imgi78 from "../assets/imgi_78_15.webp";
import imgi79 from "../assets/imgi_79_16.webp";

const campusImages = [
  imgi9, imgi10, imgi11, imgi28, imgi30,
  imgi66, imgi67, imgi69, imgi70, imgi71,
  imgi72, imgi75, imgi76, imgi78, imgi79
];

// Developer Images - Removed (Now in MeetDevelopers.jsx)


const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const loginRef = useRef(null);

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
      { threshold: 0 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // Handle click outside login dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLoginDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <SEO title="Home - DMCE Computer Engineering" description="Welcome to Datta Meghe College of Engineering, Computer Engineering Department. Innovate, Create, Excel." url="/" />
      <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-500/30 overflow-x-hidden">
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
                <h1 className="text-xl font-black text-[#1D3EA1] leading-none tracking-tighter">DMCE</h1>
                <p className="text-[10px] font-bold text-gray-600 tracking-[0.2em] uppercase">Computer Engg</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-bold text-[#1D3EA1]">HOME</a>
              <a href="#college" className="text-sm font-medium hover:text-[#1D3EA1] transition-colors uppercase">College</a>
              <a href="#about" className="text-sm font-medium hover:text-[#1D3EA1] transition-colors uppercase">About</a>
              <button
                onClick={() => navigate("/developers")}
                className="text-sm font-bold flex items-center gap-2 text-gray-800 hover:text-[#1D3EA1] transition-colors group"
              >
                <span className="status-dot"></span>
                DEVELOPERS
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:block relative" ref={loginRef}>
                <button
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  className="px-5 py-2 text-sm font-bold text-[#1D3EA1] border-2 border-[#1D3EA1] rounded-full hover:bg-blue-50 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 text-sm font-bold text-white bg-[#1D3EA1] rounded-full hover:bg-blue-800 transition-all shine-effect"
                >
                  Sign Up
                </button>
                {showLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-xl border border-gray-200 overflow-hidden animate-fadeIn z-[60]">
                    <button onClick={() => { navigate("/login"); setShowLoginDropdown(false); }} className="w-full px-4 py-3 text-left text-sm font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Student Login
                    </button>
                    <button onClick={() => { navigate("/admin/login"); setShowLoginDropdown(false); }} className="w-full px-4 py-3 text-left text-sm font-semibold hover:bg-blue-50 transition-colors border-t border-gray-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      Admin Login
                    </button>
                    <button onClick={() => { navigate("/division/login"); setShowLoginDropdown(false); }} className="w-full px-4 py-3 text-left text-sm font-semibold hover:bg-blue-50 transition-colors border-t border-gray-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Division Incharge Login
                    </button>
                  </div>
                )}
              </div>
              <button className="p-2 text-gray-900 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /> : <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden glass-nav absolute top-full left-0 w-full p-6 space-y-4 animate-fadeIn max-h-[80vh] overflow-y-auto border-t border-gray-100">
              <a href="#" className="block text-[#1D3EA1] font-bold" onClick={() => setIsMenuOpen(false)}>HOME</a>
              <a href="#college" className="block font-medium" onClick={() => setIsMenuOpen(false)}>COLLEGE</a>
              <a href="#about" className="block font-medium" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
              <button
                className="flex items-center gap-3 font-bold text-gray-900 uppercase pr-4"
                onClick={() => { setIsMenuOpen(false); navigate("/developers"); }}
              >
                <span className="status-dot"></span>
                Developers
              </button>
              <div className="pt-4 space-y-2 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2">Portals</p>
                <button onClick={() => { setIsMenuOpen(false); navigate("/login"); }} className="w-full py-3 bg-[#1D3EA1] text-white rounded-xl font-bold transition-colors shadow-md">Student Login</button>
                <button onClick={() => { setIsMenuOpen(false); navigate("/signup"); }} className="w-full py-3 bg-white border-2 border-[#1D3EA1] text-[#1D3EA1] rounded-xl font-bold transition-colors">Create Account / Sign Up</button>
                <div className="pt-2"></div>
                <button onClick={() => { setIsMenuOpen(false); navigate("/admin/login"); }} className="w-full py-2.5 bg-gray-100 text-gray-900 rounded-xl font-bold transition-colors">Admin Login</button>
                <button onClick={() => { setIsMenuOpen(false); navigate("/division/login"); }} className="w-full py-2.5 bg-gray-100 text-gray-900 rounded-xl font-bold transition-colors">Division Incharge Login</button>
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
            <img src={dmceBuilding} alt="DMCE Building" className="w-full h-full object-cover opacity-70 scale-105" />
          </div>

          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] text-[#1D3EA1] uppercase glass-card rounded-full border border-blue-100 animate-hero-slide">
                Welcome to the Future
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 leading-[0.9] text-[#182137] animate-hero-slide animation-delay-100">
                INNOVATE.<br />CREATE.<br />EXCEL.
              </h1>
              <p className="text-base md:text-xl text-slate-800 font-semibold mb-12 max-w-2xl mx-auto leading-relaxed animate-hero-slide animation-delay-200 bg-white/60 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm ring-1 ring-white/50 inline-block">
                The Department of Computer Engineering at <span className="text-[#1D3EA1] font-black">DMCE</span> is where ambition meets opportunity.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-hero-slide animation-delay-300">
                <a
                  href="https://dmce.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 sm:px-10 py-3.5 sm:py-4 bg-[#1D3EA1] text-white font-black rounded-full hover:scale-105 transition-transform shine-effect text-center text-sm sm:text-base"
                >
                  DISCOVER MORE
                </a>
                <a href="#college" className="px-8 sm:px-10 py-3.5 sm:py-4 glass-card font-black rounded-full hover:bg-gray-50 transition-all border border-gray-200 text-[#182137] text-center text-sm sm:text-base">
                  OUR CAMPUS
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-gray-300 rounded-full"></div>
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
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#182137]">THE CAMPUS LIFE</h2>
              <div className="h-1.5 w-24 bg-[#1D3EA1] mx-auto rounded-full"></div>
            </div>

            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
              {campusImages.map((img, index) => (
                <div key={index} className="break-inside-avoid rounded-2xl overflow-hidden group reveal reveal-y">
                  <img
                    src={img}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={`Campus ${index + 1}`}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-[10px] font-bold tracking-widest uppercase">DMCE Highlights</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
        ========================================
        HOD & COLLEGE SECTION
        ========================================
      */}
        <section id="about" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full lg:w-1/2 reveal reveal-x-left">
                <div className="relative group">
                  <div className="relative z-10 rounded-3xl overflow-hidden glass-card p-2 border border-gray-200 transition-transform duration-500 group-hover:rotate-y-12">
                    <img src={hodPhoto} alt="HOD" className="w-full rounded-2xl shadow-xl" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl -z-10"></div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 reveal reveal-x-right">
                <span className="text-[#1D3EA1] font-black tracking-widest text-xs uppercase mb-4 block">Leadership</span>
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-[#182137]">
                  PROF. DR. AMOL PANDE<br />
                  <span className="text-[#1D3EA1] text-2xl md:text-3xl font-bold italic">Head of Department & Vice Principal</span>
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base text-justify">
                  <p>
                    Our esteemed HOD, Prof. Dr. Amol Pande, is the guiding force behind CSI-CATT DMCE. With an unwavering commitment to fostering innovation and excellence, Dr. Pande has been a constant pillar of support for the chapter.
                  </p>
                  <p>
                    Their visionary leadership, encouragement, and valuable insights have greatly empowered the team to achieve new milestones and nurture a culture of technical excellence. Dr. Pande's dedication to bridging the gap between academics and industry has inspired students and faculty alike, making CSI-CATT DMCE a hub for innovation and collaboration.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <h4 className="text-3xl md:text-5xl font-black text-[#182137]">25+</h4>
                    <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Years of Excellence</p>
                  </div>
                  <div>
                    <h4 className="text-3xl md:text-5xl font-black text-[#182137]">5000+</h4>
                    <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Global Alumini</p>
                  </div>
                </div>
                <a
                  href="https://dmce.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-12 text-sm font-black text-[#1D3EA1] border-b-2 border-blue-400 pb-2 hover:text-[#182137] hover:border-[#182137] transition-all"
                >
                  LEARN MORE ABOUT US &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* 
        ========================================
        FOOTER
        ========================================
      */}
        <footer className="py-20 border-t border-gray-100 relative bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-8">
                <img src={dmceLogo} alt="DMCE Logo" className="w-10 h-10 object-contain" />
                <h2 className="text-2xl font-black tracking-tighter text-[#182137]">DMCE COMPUTER ENGG.</h2>
              </div>
              <p className="text-gray-600 max-w-sm mb-8 leading-relaxed italic">
                Empowering engineers to lead, innovate, and excel in the global landscape of technology.
              </p>
              <div className="flex space-x-6">
                <FaLinkedin className="text-2xl text-gray-400 hover:text-[#1D3EA1] transition-colors cursor-pointer" />
                <FaGlobe className="text-2xl text-gray-400 hover:text-[#1D3EA1] transition-colors cursor-pointer" />
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-[#1D3EA1] uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#1D3EA1] transition-all">Home</a></li>
                <li><a href="#college" className="hover:text-[#1D3EA1] transition-all">College</a></li>
                <li><a href="#about" className="hover:text-[#1D3EA1] transition-all">About</a></li>
                <li><button onClick={() => navigate("/developers")} className="hover:text-[#1D3EA1] transition-all text-left">Developers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-[#1D3EA1] uppercase tracking-widest text-xs">Connect</h4>
              <p className="text-sm text-gray-500 mb-4">Airoli, Navi Mumbai, Maharashtra 400708</p>
              <a href="mailto:info@dmce.ac.in" className="text-sm text-[#182137] font-bold hover:text-[#1D3EA1]">info@dmce.ac.in</a>
            </div>
          </div>
          <div className="container mx-auto px-6 mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <p>© 2026 DMCE Computer Engineering. All Rights Reserved.</p>
            <p>Created with ❤️ by the Developers</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
