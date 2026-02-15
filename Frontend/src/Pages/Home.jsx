import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Assets
import dmceBuilding from "../assets/dmce_building.png";
import facultyGroup from "../assets/faculty_group.jpg";
import hodPhoto from "../assets/hod_photo.png";
import dmceLogo from "../assets/dmce_logo_new.png";
import csiLogo from "../assets/csi_logo_new.png";

const Home = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-900 bg-gray-50 selection:bg-blue-200 selection:text-blue-900">
      {/* 
        ========================================
        HEADER SECTION (Preserved Logic) 
        ========================================
      */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <img src={dmceLogo} alt="DMCE Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-xl font-extrabold text-[#1D3EA1] leading-none">EDU</h1>
                <p className="text-[10px] font-semibold text-gray-500 tracking-wider">PORTAL</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-bold text-[#1D3EA1] transition-colors">HOME</a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">DEPARTMENT</a>
              <a href="#vision" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">VISION</a>
              <a href="#faculty" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">FACULTY</a>
              <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors">CONTACT</a>
            </nav>

            {/* Desktop Login Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 text-sm font-bold text-white bg-[#1D3EA1] rounded-full shadow-md hover:bg-blue-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Student Login
              </button>
              <button
                onClick={() => navigate("/admin/login")}
                className="px-5 py-2 text-sm font-bold text-[#1D3EA1] bg-white border-2 border-[#1D3EA1] rounded-full hover:bg-blue-50 transition-all duration-200"
              >
                Admin Login
              </button>
              <button
                onClick={() => navigate("/division/login")}
                className="hidden lg:block px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors"
              >
                Division Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-[#1D3EA1] focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100 animate-fadeIn">
              <nav className="flex flex-col space-y-4 mt-4">
                <a href="#" className="text-sm font-bold text-[#1D3EA1] transition-colors" onClick={() => setIsMenuOpen(false)}>HOME</a>
                <a href="#about" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors" onClick={() => setIsMenuOpen(false)}>DEPARTMENT</a>
                <a href="#vision" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors" onClick={() => setIsMenuOpen(false)}>VISION</a>
                <a href="#faculty" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors" onClick={() => setIsMenuOpen(false)}>FACULTY</a>
                <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-[#1D3EA1] transition-colors" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
              </nav>
              <div className="flex flex-col space-y-3 mt-6 border-t border-gray-100 pt-6">
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 text-sm font-bold text-white bg-[#1D3EA1] rounded-full shadow-md hover:bg-blue-800 text-center"
                >
                  Student Login
                </button>
                <button
                  onClick={() => navigate("/admin/login")}
                  className="px-5 py-2 text-sm font-bold text-[#1D3EA1] bg-white border-2 border-[#1D3EA1] rounded-full hover:bg-blue-50 text-center"
                >
                  Admin Login
                </button>
                <button
                  onClick={() => navigate("/division/login")}
                  className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-[#1D3EA1] text-center border border-gray-200 rounded-full"
                >
                  Division Login
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 
        ========================================
        HERO SECTION (Parallax)
        ========================================
      */}
      <section
        className="relative h-[85vh] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${dmceBuilding})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/90 to-black/40 mix-blend-multiply"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest text-blue-200 uppercase bg-blue-900/50 rounded-full backdrop-blur-sm border border-blue-400/30">
            Est. 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Department of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Computer Engineering
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Datta Meghe College of Engineering, Airoli. <br />
            Fostering Innovation, Excellence, and Future-Ready Leaders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 text-base font-bold text-[#1D3EA1] bg-white rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              Explore Department
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        HOD SECTION 
        ========================================
      */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f0f4ff] skew-x-12 translate-x-32 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Card */}
            <div className="w-full lg:w-1/3">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#1D3EA1] rounded-2xl rotate-6 group-hover:rotate-3 transition-transform duration-300 opacity-20"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img src={hodPhoto} alt="Dr. Amol Parashram Pande" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a1a44] to-transparent p-6 pt-20">
                    <p className="text-white font-bold text-lg">Dr. Amol Parashram Pande</p>
                    <p className="text-blue-200 text-sm">Head of Department</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-2/3">
              <h4 className="text-[#1D3EA1] font-bold tracking-wider uppercase mb-2">Leadership</h4>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Message from the HOD</h2>
              <blockquote className="text-xl text-gray-600 italic mb-8 border-l-4 border-[#1D3EA1] pl-6 py-2">
                "Our mission is to create a vibrant learning environment where students can explore the depths of Computer Science and Engineering. We are committed to academic excellence and holistic development."
              </blockquote>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1D3EA1] flex items-center justify-center mr-3 text-sm">🎓</span>
                    Qualification
                  </h3>
                  <p className="text-gray-600 text-sm pl-11">Ph.D. Computer (2019)<br />M.Tech Computer (2005)</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-[#1D3EA1] flex items-center justify-center mr-3 text-sm">⏳</span>
                    Experience
                  </h3>
                  <p className="text-gray-600 text-sm pl-11">31 Years of Academic Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        VISION & MISSION (Mock Data)
        ========================================
      */}
      <section id="vision" className="py-24 bg-[#182137] text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-6">
                <span className="text-blue-400 font-bold tracking-wider">OUR GOAL</span>
                <h2 className="text-3xl font-bold mt-2">Vision</h2>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                To be a center of excellence in Computer Engineering education and research, producing globally competent professionals with strong ethical values to serve the society and nation.
              </p>
            </div>
            <div>
              <div className="mb-6">
                <span className="text-blue-400 font-bold tracking-wider">OUR PATH</span>
                <h2 className="text-3xl font-bold mt-2">Mission</h2>
              </div>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li className="flex items-start">
                  <span className="text-[#1D3EA1] mr-3 mt-1">➤</span>
                  To provide high-quality technical education through innovative teaching-learning processes.
                </li>
                <li className="flex items-start">
                  <span className="text-[#1D3EA1] mr-3 mt-1">➤</span>
                  To foster a culture of research, entrepreneurship, and continuous learning.
                </li>
                <li className="flex items-start">
                  <span className="text-[#1D3EA1] mr-3 mt-1">➤</span>
                  To inculcate social responsibility and professional ethics in students.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FACULTY / GROUP PHOTO SECTION (Parallax)
        ========================================
      */}
      <section
        id="faculty"
        className="relative py-32 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${facultyGroup})` }}
      >
        <div className="absolute inset-0 bg-[#0a1a44]/80 backdrop-grayscale-0"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Faculty</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            A dedicated team of experienced professors and mentors guiding the next generation of engineers.
          </p>
          <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#1D3EA1] transition-all duration-300">
            View All Faculty Members
          </button>
        </div>
      </section>

      {/* 
        ========================================
        STATS / INFO SECTION
        ========================================
      */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-4xl font-bold text-[#1D3EA1] mb-2">120+</h3>
              <p className="text-gray-600 font-medium">Intake Capacity</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-4xl font-bold text-[#1D3EA1] mb-2">30+</h3>
              <p className="text-gray-600 font-medium">Laboratories</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-4xl font-bold text-[#1D3EA1] mb-2">50+</h3>
              <p className="text-gray-600 font-medium">Research Papers</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-4xl font-bold text-[#1D3EA1] mb-2">95%</h3>
              <p className="text-gray-600 font-medium">Placement Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FOOTER / AFFILIATIONS 
        ========================================
      */}
      <footer id="contact" className="bg-[#0b1221] text-white pt-20 pb-10 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="mb-10 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">Datta Meghe College of Engineering</h2>
              <p className="text-gray-400 max-w-sm">
                Sector-3, Airoli, Navi Mumbai, Maharashtra 400708
              </p>
            </div>

            {/* Logos */}
            <div className="flex items-center space-x-8">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <img src={dmceLogo} alt="DMCE" className="h-16 w-auto object-contain brightness-0 invert" />
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <img src={csiLogo} alt="CSI" className="h-16 w-auto object-contain brightness-0 invert" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} DMCE Computer Department. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
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
