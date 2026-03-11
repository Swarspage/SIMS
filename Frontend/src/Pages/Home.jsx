import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Import Assets
import dmceBuilding from "../assets/dmce_building.png";
import heroNew from "../assets/hero_new.jpg";
import facultyGroup from "../assets/faculty_group.jpg";
import hodPhoto from "../assets/hod_photo.png";
import dmceLogo from "../assets/dmce_logo_new.png";
import csiLogo from "../assets/csi_logo_new.png";
import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";
import event4 from "../assets/event4.jpg";

// ─── Scroll-animation hook ────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".sr").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Events Carousel ──────────────────────────────────────────────────────────
const EVENT_SLIDES = [
  { src: event1, caption: "Community Outreach & Campus Activities" },
  { src: event2, caption: "Trophy Ceremony – Student Achievers Meet" },
  { src: event3, caption: "Certificate Distribution Ceremony" },
  { src: event4, caption: "Sports Tournament – Team Spirit" },
];

function EventsCarousel() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(idx);
      setFading(false);
    }, 500);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % EVENT_SLIDES.length);
        setFading(false);
      }, 500);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 sr">
          <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Gallery</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Campus <span className="text-[#4d7cfe]">Events</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-lg mx-auto">
            Moments that define our vibrant academic community.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/7' }}>
          <img
            src={EVENT_SLIDES[current].src}
            alt={EVENT_SLIDES[current].caption}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: fading ? 0 : 1 }}
          />
          {/* Dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>
          {/* Caption */}
          <div
            className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-500"
            style={{ opacity: fading ? 0 : 1 }}
          >
            <p className="text-white font-semibold text-base md:text-xl drop-shadow-md">
              {EVENT_SLIDES[current].caption}
            </p>
          </div>
          {/* Dot indicators */}
          <div className="absolute bottom-4 right-6 flex gap-2">
            {EVENT_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CountUp Box with Confetti ───────────────────────────────────────────────
function CountUpBox({ target = 31, label = "Years of Quality Education" }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let n = 0;
          const step = Math.ceil(target / 40);
          const id = setInterval(() => {
            n = Math.min(n + step, target);
            setCount(n);
            if (n >= target) {
              clearInterval(id);
              setDone(true);
              setBurst(true);
              setTimeout(() => setBurst(false), 1800);
            }
          }, 45);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  // Generate 42 confetti petals for full screen
  const petals = Array.from({ length: 42 }, (_, i) => ({
    id: i,
    angle: (i / 42) * 360,
    color: ["#1D3EA1", "#4d7cfe", "#fbbf24", "#34d399", "#f87171", "#a78bfa"][i % 6],
    size: 10 + (i % 4) * 4,
    // Massive distance for full-screen explosion
    dist: 300 + (i % 6) * 150,
  }));

  return (
    <div ref={ref} className="rounded-2xl bg-[#1D3EA1] flex items-center justify-center p-4 shadow-md h-36 sm:h-48">
      {/* Confetti burst */}
      {burst && petals.map((p) => (
        <span
          key={p.id}
          style={{
            position: "fixed",
            zIndex: 9999,
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: "50%",
            transform: `translate(-50%, -50%) rotate(${p.angle}deg) translateY(-${p.dist}px)`,
            animation: "confettiBurst 1.6s ease-out forwards",
            animationDelay: `${(p.id % 4) * 0.05}s`,
          }}
        />
      ))}
      <div className="text-center text-white relative z-10">
        <p
          className="font-black leading-none"
          style={{ fontSize: done ? "clamp(2.5rem,6vw,3.5rem)" : "clamp(2.5rem,6vw,3.5rem)", transform: done ? "scale(1.15)" : "scale(1)", transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1)" }}
        >
          {count}+
        </p>
        <p className="text-xs sm:text-sm font-semibold mt-2 leading-snug opacity-90">{label}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useScrollReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50 selection:bg-blue-200 selection:text-blue-900">

      {/* ── Keyframes ── */}
      <style>{`
        /* Hero entrance */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes confettiBurst {
          0%   { opacity: 1; transform: translate(-50%,-50%) rotate(var(--a,0deg)) translateY(0) scale(0.5); }
          60%  { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%,-50%) rotate(var(--a,0deg)) translateY(calc(-1 * var(--d,60px))) scale(1.2); }
        }
        .hero-anim {
          opacity: 0;
          animation: fadeInUp 0.85s ease forwards;
        }

        /* Premium Smooth Hero Slide & Fade */
        @keyframes fadeSlideInLeft {
          from { opacity: 0; transform: scale(1.05) translateX(-30px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
        .hero-bg-anim {
          opacity: 0;
          animation: fadeSlideInLeft 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* Scroll reveal base */
        .sr {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sr.sr-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger helpers */
        .sr-delay-1 { transition-delay: 0.1s; }
        .sr-delay-2 { transition-delay: 0.2s; }
        .sr-delay-3 { transition-delay: 0.3s; }
        .sr-delay-4 { transition-delay: 0.4s; }
        .sr-delay-5 { transition-delay: 0.5s; }

        /* Slide-in from left/right */
        .sr-left  { opacity: 0; transform: translateX(-50px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .sr-right { opacity: 0; transform: translateX(50px);  transition: opacity 0.7s ease, transform 0.7s ease; }
        .sr-left.sr-visible,
        .sr-right.sr-visible { opacity: 1; transform: translateX(0); }

        /* Scale-in for cards */
        .sr-scale { opacity: 0; transform: scale(0.92); transition: opacity 0.6s ease, transform 0.6s ease; }
        .sr-scale.sr-visible { opacity: 1; transform: scale(1); }
      `}</style>

      {/* ══════════════════════════════════════════════════
          HEADER
      ══════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={dmceLogo} alt="DMCE Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-[#1D3EA1] leading-none">EDU</h1>
                <p className="text-[9px] sm:text-[10px] font-semibold text-gray-500 tracking-wider">PORTAL</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#" className="text-sm font-bold text-[#1D3EA1]">HOME</a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">DEPARTMENT</a>
              <a href="#vision" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">VISION</a>
              <a href="#faculty" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">FACULTY</a>
              <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">CONTACT</a>
              <span onClick={() => navigate("/developers")} className="text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer transition-colors">DEVELOPERS</span>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
              <button onClick={() => navigate("/login")} className="px-4 py-2 text-sm font-bold text-white bg-[#1D3EA1] rounded-full shadow-md hover:bg-blue-800 transition-all duration-200">
                Student Login
              </button>
              <button onClick={() => navigate("/admin/login")} className="px-4 py-2 text-sm font-bold text-[#1D3EA1] bg-white border-2 border-[#1D3EA1] rounded-full hover:bg-blue-50 transition-all duration-200">
                Admin Login
              </button>
              <button onClick={() => navigate("/division/login")} className="hidden lg:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">
                Division Login
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button className="md:hidden text-gray-600 hover:text-[#1D3EA1]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-3 mt-4">
                {["#", "#about", "#vision", "#faculty", "#contact"].map((href, i) => (
                  <a key={href} href={href} className="text-sm font-medium text-gray-700 hover:text-[#1D3EA1]" onClick={() => setIsMenuOpen(false)}>
                    {["HOME", "DEPARTMENT", "VISION", "FACULTY", "CONTACT"][i]}
                  </a>
                ))}
                <span className="text-sm font-medium text-blue-500 hover:text-blue-700 cursor-pointer" onClick={() => navigate("/developers")}>
                  DEVELOPERS
                </span>
              </nav>
              <div className="flex flex-col gap-3 mt-5 pt-4 border-t border-gray-100">
                <button onClick={() => navigate("/login")} className="py-2.5 text-sm font-bold text-white bg-[#1D3EA1] rounded-full shadow-md">Student Login</button>
                <button onClick={() => navigate("/admin/login")} className="py-2.5 text-sm font-bold text-[#1D3EA1] border-2 border-[#1D3EA1] rounded-full">Admin Login</button>
                <button onClick={() => navigate("/division/login")} className="py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-full">Division Login</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={heroNew} alt="DMCE Campus" className="hero-bg-anim absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/90 to-black/50"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="hero-anim inline-block px-4 py-1 mb-5 text-xs font-bold tracking-widest text-blue-200 uppercase bg-blue-900/50 rounded-full backdrop-blur-sm border border-blue-400/30" style={{ animationDelay: '0.2s' }}>
            Est. 2024
          </span>
          <h1 className="hero-anim text-4xl sm:text-5xl md:text-7xl font-black text-white mb-5 leading-tight tracking-tight drop-shadow-2xl" style={{ animationDelay: '0.45s' }}>
            Department of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Computer Engineering
            </span>
          </h1>
          <p className="hero-anim text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed" style={{ animationDelay: '0.7s' }}>
            Datta Meghe College of Engineering, Airoli. <br className="hidden sm:block" />
            Fostering Innovation, Excellence, and Future-Ready Leaders.
          </p>
          <div className="hero-anim flex flex-col sm:flex-row justify-center gap-3" style={{ animationDelay: '0.95s' }}>
            <button
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 text-sm font-bold text-[#1D3EA1] bg-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Explore Department
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3.5 text-sm font-bold text-white border-2 border-white/60 rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Student Login →
            </button>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURE HIGHLIGHTS
      ══════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: "01", icon: "🎓", title: "Scholarship Support", desc: "Merit & need-based scholarships for deserving students." },
              { num: "02", icon: "👨‍🏫", title: "Expert Faculty", desc: "30+ years of academic & industry expertise." },
              { num: "03", icon: "📚", title: "Research & Library", desc: "Vast journals, books & digital research resources." },
              { num: "04", icon: "🏭", title: "Industry Connect", desc: "Top company tie-ups for internships & placements." },
            ].map((item, i) => (
              <div key={item.num} className={`sr sr-scale sr-delay-${i + 1} flex flex-col p-4 sm:p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-[#1D3EA1]/20 flex items-center justify-center text-xl group-hover:bg-[#1D3EA1] group-hover:scale-110 transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-4xl sm:text-5xl font-black text-gray-100 select-none">{item.num}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT / HOD
      ══════════════════════════════════════════════════ */}
      <section id="about" className="py-20 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Image Collage — slides in from left */}
            <div className="sr sr-left grid grid-cols-2 gap-3 sm:gap-4">
              <div className="col-span-2 rounded-2xl overflow-hidden shadow-xl h-48 sm:h-64 md:h-72">
                <img src={facultyGroup} alt="DMCE Faculty" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md h-36 sm:h-48 bg-gray-100">
                <img src={hodPhoto} alt="HOD" className="w-full h-full object-contain object-center hover:scale-105 transition-transform duration-500" />
              </div>
              <CountUpBox target={31} label="Years of Quality Education" />
            </div>

            {/* Content — slides in from right */}
            <div className="sr sr-right">
              <span className="text-[#1D3EA1] font-bold tracking-widest text-xs uppercase">About Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 leading-snug">
                Our Education System <span className="text-[#1D3EA1]">Inspires</span> You More.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                The Department of Computer Engineering at DMCE is dedicated to nurturing technically sound and ethically grounded professionals. With state-of-the-art infrastructure and industry partnerships, we prepare students for the challenges of tomorrow.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "🔬", title: "Research & Innovation", desc: "Cutting-edge research across AI, cloud, and security." },
                  { icon: "🌐", title: "Industry & Global Hubs", desc: "Partnerships with top tech companies and global institutes." },
                ].map((s) => (
                  <div key={s.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-[#1D3EA1]/20 flex items-center justify-center text-lg shrink-0">{s.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{s.title}</h4>
                      <p className="text-gray-500 text-xs sm:text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={() => document.getElementById('vision').scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-[#1D3EA1] rounded-full shadow-md hover:bg-blue-800 hover:-translate-y-0.5 transition-all duration-200"
                >
                  DISCOVER MORE →
                </button>
                <a href="tel:+912227621700" className="flex items-center gap-2 text-gray-600 text-sm font-medium hover:text-[#1D3EA1] transition-colors">
                  <span className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">📞</span>
                  +91 22 2762 1700
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#182137] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #1D3EA1 0%, transparent 60%), radial-gradient(circle at 80% 50%, #1D3EA1 0%, transparent 60%)' }}></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { value: "120+", label: "Intake Capacity" },
              { value: "1900+", label: "Students Enrolled" },
              { value: "30+", label: "Laboratories" },
              { value: "95%", label: "Placement Rate" },
            ].map((stat, i) => (
              <div key={stat.label} className={`sr sr-scale sr-delay-${i + 1} group`}>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{stat.value}</h3>
                <div className="w-8 h-0.5 bg-[#1D3EA1] mx-auto mb-2 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-blue-300 font-medium text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROGRAMS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sr">
            <span className="text-[#1D3EA1] font-bold tracking-widest text-xs uppercase">Our Programs</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Let's Check Our <span className="text-[#1D3EA1]">Programs</span>
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
              Full-time undergraduate, postgraduate and research programs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { tag: "Undergraduate", title: "B.E. Computer Engineering", desc: "4-year program with strong fundamentals in algorithms, AI & software.", icon: "💻", dur: "8 Semesters", rating: "4.9" },
              { tag: "Postgraduate", title: "M.E. Computer Engineering", desc: "Advanced 2-year research-focused specialization in computing.", icon: "🔬", dur: "4 Semesters", rating: "4.8" },
              { tag: "Research", title: "Ph.D. Program", desc: "Doctoral research in AI, cybersecurity, cloud computing & IoT.", icon: "📖", dur: "3–5 Years", rating: "5.0" },
            ].map((prog, i) => (
              <div key={prog.title} className={`sr sr-scale sr-delay-${i + 1} rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col`}>
                <div className="bg-gradient-to-br from-[#1D3EA1] to-[#182137] p-6 sm:p-8 flex items-center justify-between">
                  <span className="text-4xl sm:text-5xl">{prog.icon}</span>
                  <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full">{prog.tag}</span>
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{prog.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1">{prog.desc}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-500">
                    <span>📅 {prog.dur}</span>
                    <span>⭐ {prog.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EVENTS CAROUSEL
      ══════════════════════════════════════════════════ */}
      <EventsCarousel />

      {/* ══════════════════════════════════════════════════
          FACULTY PARALLAX
      ══════════════════════════════════════════════════ */}
      <section
        id="faculty"
        className="relative py-28 sm:py-32 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${facultyGroup})` }}
      >
        <div className="absolute inset-0 bg-[#0a1a44]/80"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h2 className="sr text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Our Faculty</h2>
          <p className="sr sr-delay-2 text-base sm:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            A dedicated team of experienced professors and mentors guiding the next generation of engineers.
          </p>
          <button className="sr sr-delay-3 px-7 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#1D3EA1] transition-all duration-300">
            View All Faculty Members
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VISION & MISSION
      ══════════════════════════════════════════════════ */}
      <section id="vision" className="py-20 sm:py-24 bg-[#0b1221] text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sr">
            <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Our Purpose</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">Vision & Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {[
              {
                icon: "🎯",
                label: "Our Goal",
                title: "Vision",
                body: "To be a center of excellence in Computer Engineering education and research, producing globally competent professionals with strong ethical values to serve the society and nation.",
                list: null,
              },
              {
                icon: "🧭",
                label: "Our Path",
                title: "Mission",
                body: null,
                list: [
                  "Provide high-quality technical education through innovative teaching-learning processes.",
                  "Foster a culture of research, entrepreneurship, and continuous learning.",
                  "Inculcate social responsibility and professional ethics in students.",
                ],
              },
            ].map((card, i) => (
              <div key={card.title} className={`sr sr-delay-${i + 1} bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-[#1D3EA1]/60 transition-colors duration-300`}>
                <div className="w-12 h-12 rounded-full bg-[#1D3EA1]/20 flex items-center justify-center text-2xl mb-4">{card.icon}</div>
                <span className="text-blue-400 font-bold tracking-wider text-xs uppercase">{card.label}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 mb-3">{card.title}</h3>
                {card.body && <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>}
                {card.list && (
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {card.list.map((m) => (
                      <li key={m} className="flex items-start gap-3">
                        <span className="text-[#1D3EA1] mt-1 shrink-0">➤</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer id="contact" className="bg-[#0b1221] text-white pt-16 sm:pt-20 pb-10 border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-bold mb-3">Datta Meghe College of Engineering</h2>
              <p className="text-gray-400 text-sm max-w-sm">Sector-3, Airoli, Navi Mumbai, Maharashtra 400708</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="bg-white/10 p-3 sm:p-4 rounded-xl">
                <img src={dmceLogo} alt="DMCE" className="h-12 sm:h-16 w-auto object-contain brightness-0 invert" />
              </div>
              <div className="bg-white/10 p-3 sm:p-4 rounded-xl">
                <img src={csiLogo} alt="CSI" className="h-12 sm:h-16 w-auto object-contain brightness-0 invert" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} DMCE Computer Department. All rights reserved.</p>
            <div className="flex space-x-5 items-center">
              <div className="relative flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/developers")}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-blue-400 group-hover:text-blue-300 font-bold transition-colors">Meet the Developers</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-700 hidden sm:block"></span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
