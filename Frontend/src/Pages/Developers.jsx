import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dmceLogo from "../assets/dmce_logo_new.png";
import yash from "../assets/yash.png";
import astha from "../assets/astha.png";
import atharva from "../assets/atharv.png";

const developers = [
    {
        name: "Yash Sunder Bawari",
        role: "Full Stack Developer",
        bio: "Passionate about building scalable web applications and intuitive user interfaces.",
        image: yash,
        github: "https://github.com/YashBawari18",
        linkedin: "https://www.linkedin.com/in/yash-bawari-5a3379313/",
        portfolio: "https://my-portfolio-six-alpha-47.vercel.app/",
    },
    {
        name: "Astha Oswal",
        role: "Frontend Developer",
        bio: "Specializes in building responsive, accessible, and highly interactive user interfaces using modern web technologies.",
        image: astha,
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        portfolio: "https://example.com",
    },
    {
        name: "Atharv Santosh Kotwal",
        role: "UI/UX Designer",
        bio: "Passionate about creating intuitive user journeys, wireframing, and delivering pixel-perfect designs.",
        image: atharva,
        github: "https://github.com/GrandPredator",
        linkedin: "https://www.linkedin.com/in/atharv-kotwal-b95559330/",
        portfolio: "https://example.com",
    },
    {
        name: "Developer Four",
        role: "UI/UX Designer",
        bio: "Focused on user research, interaction design, and ensuring our platform is both beautiful and functional.",
        image: "https://ui-avatars.com/api/?name=UI+UX+Two&background=34d399&color=fff&size=200",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        portfolio: "https://example.com",
    },
    {
        name: "Developer Five",
        role: "Backend Developer",
        bio: "Architecting robust databases, scalable APIs, and ensuring maximum server performance and security.",
        image: "https://ui-avatars.com/api/?name=Backend+One&background=f87171&color=fff&size=200",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        portfolio: "https://example.com",
    },
    {
        name: "Developer Six",
        role: "Backend Developer",
        bio: "Expert in microservices architecture, server optimization, and handling complex data logic.",
        image: "https://ui-avatars.com/api/?name=Backend+Two&background=fbbf24&color=fff&size=200",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        portfolio: "https://example.com",
    },
];

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

const Developers = () => {
    const navigate = useNavigate();
    useScrollReveal();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
                        <img src={dmceLogo} alt="DMCE Logo" className="w-12 h-12 object-contain" />
                        <div>
                            <h1 className="text-xl font-extrabold text-[#1D3EA1] leading-none">EDU</h1>
                            <p className="text-[10px] font-semibold text-gray-500 tracking-wider">PORTAL</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm font-bold text-gray-600 hover:text-[#1D3EA1] transition-colors flex items-center gap-2"
                    >
                        <span>←</span> Back to Home
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-20 flex flex-col justify-center">
                <div className="text-center mb-16 animate-[fadeInUp_0.8s_ease_forwards]">
                    <span className="text-[#1D3EA1] font-bold tracking-widest text-xs uppercase bg-blue-50 px-3 py-1 rounded-full">Our Team</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-4">
                        Meet the <span className="text-[#1D3EA1]">Developers</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base">
                        The creative minds and technical experts behind the EDU Portal. We are dedicated to building seamless digital experiences for the modern educational ecosystem.
                    </p>
                </div>

                {/* 
                  Container: 
                  Mobile -> Horizontal snap scrolling track
                  Desktop -> Vertical stack 
                */}
                <div className="flex overflow-x-auto snap-x snap-mandatory md:flex-col gap-6 md:gap-32 w-[100vw] relative left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0 px-6 sm:px-12 md:px-0 pb-10 md:pb-20 no-scrollbar items-start">
                    {developers.map((dev, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={dev.name}
                                // Mobile: fixed width card that snaps. Desktop: alternating flex row
                                className={`flex-none snap-center w-[85vw] sm:w-[70vw] md:w-full flex flex-col md:flex-row items-center gap-0 md:gap-16 ${isEven ? "" : "md:flex-row-reverse"}`}
                            >
                                {/* Image Box */}
                                <div className={`sr ${isEven ? 'sr-left' : 'sr-right'} w-full md:w-5/12 relative group`}>
                                    {/* Made aspect ratio slightly taller for mobile cards */}
                                    <div className="aspect-[3/4] md:aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-90"></div>
                                        <img src={dev.image} alt={dev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                                        {/* Mobile Only: Name inside the image */}
                                        <div className="md:hidden absolute bottom-16 left-6 right-6 z-20">
                                            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">{dev.name}</h3>
                                            <p className="text-blue-300 font-bold text-xs sm:text-sm tracking-wide uppercase mt-1 drop-shadow-md">{dev.role}</p>
                                        </div>
                                    </div>

                                    {/* Decorative floating element */}
                                    <div className={`hidden md:block absolute -z-10 w-full h-full rounded-[3rem] border-2 border-[#1D3EA1]/20 ${isEven ? 'top-6 -right-6' : 'top-6 -left-6'} transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0`}></div>
                                </div>

                                {/* Text Content Box */}
                                <div className={`sr ${isEven ? 'sr-right' : 'sr-left'} w-full md:w-7/12 relative mt-4 md:mt-0`}>
                                    {/* On mobile, this glass card overlaps the bottom of the horizontal slider item */}
                                    <div className="md:hidden w-[90%] mx-auto relative -mt-12 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-white/50 z-30 flex flex-col items-center text-center">
                                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                                            "{dev.bio}"
                                        </p>
                                        {/* Social Links Row */}
                                        <div className="flex gap-4">
                                            <a href={dev.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-900 hover:text-white hover:scale-110 shadow-sm transition-all duration-300">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                            </a>
                                            <a href={dev.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#1D3EA1] hover:bg-[#1D3EA1] hover:text-white hover:scale-110 shadow-sm transition-all duration-300">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                            </a>
                                            <a href={dev.portfolio} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white hover:scale-110 shadow-sm transition-all duration-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Desktop View */}
                                    <div className="hidden md:flex flex-col justify-center h-full p-8 lg:p-12">
                                        <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">{dev.name}</h3>
                                        <p className="text-[#1D3EA1] font-bold tracking-widest text-sm uppercase mb-8">{dev.role}</p>
                                        <p className="text-gray-500 text-lg leading-relaxed mb-10 border-l-4 border-blue-100 pl-6">
                                            {dev.bio}
                                        </p>
                                        <div className="flex gap-5">
                                            <a href={dev.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:-translate-y-1 transition-all duration-300">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                                            </a>
                                            <a href={dev.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#1D3EA1] hover:bg-[#1D3EA1] hover:text-white hover:border-[#1D3EA1] hover:-translate-y-1 transition-all duration-300">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                                            </a>
                                            <a href={dev.portfolio} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 hover:-translate-y-1 transition-all duration-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main >

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Scroll reveal system */
        .sr {
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sr-left {
          transform: translateX(-60px);
        }
        .sr-right {
          transform: translateX(60px);
        }
        .sr.sr-visible {
          opacity: 1;
          transform: translateX(0);
        }
        /* Hide scrollbar for horizontal mobile scrolling */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div >
    );
};

export default Developers;
