"use client";
import React, { useState, useEffect } from 'react';

function MainComponent() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [works, setWorks] = useState([]);
  const [formStatus, setFormStatus] = useState("");

useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);


  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_MICROCMS_API_URL, {
          headers: {
            "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
          },
        });
        const data = await response.json();
        setWorks(data.contents || []);
      } catch (error) {
        console.error("Failed to fetch works:", error);
        setWorks([]);
      }
    };
    fetchWorks();
  }, []);  

    const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      date: new Date().toISOString(),
    };

    try {
      await db.contacts.add(data);
      setFormStatus("送信が完了しました！");
      e.target.reset();
      setTimeout(() => setFormStatus(""), 3000);
    } catch (error) {
      setFormStatus("エラーが発生しました。もう一度お試しください。");
      console.error("Failed to submit form:", error);
    }
  };

  const sections = {
    home: {
      title: "HOME",
      content: (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#FF0000] text-6xl md:text-8xl font-crimson-text mb-8 glow float">
              Okina Shuji
            </h1>
            <p className="text-[#FF3333] text-xl md:text-2xl font-crimson-text fade-in">
              Web Creater
            </p>
          </div>
        </div>
      ),
    },
    about: {
      title: "Profile",
      content: (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#1a0000] p-8 rounded-lg max-w-2xl fade-in">
            <h2 className="text-[#FF0000] text-4xl font-crimson-text mb-6 glow">
              My Profile
            </h2>
            <p className="text-[#FF3333] mb-4 font-crimson-text slide-in">
              はじめまして、翁朱司と申します。学校でプログラミングを学んでいます。
              得意なプログラミング言語はhtmlとcssとjavascriptです。
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="fade-in" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-[#FF0000] text-xl mb-2 font-crimson-text">
                  スキル
                </h3>
                <ul className="text-[#FF3333] list-disc list-inside">
                <li className="hover:translate-x-2 transition-transform">
                    HTML
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    CSS
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    JavaScript
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    React
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    Node.js
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    TypeScript
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    Python
                  </li>
                </ul>
              </div>
              <div className="fade-in" style={{ animationDelay: "0.6s" }}>
                <h3 className="text-[#FF0000] text-xl mb-2 font-crimson-text">
                  経験
                </h3>
                <ul className="text-[#FF3333] list-disc list-inside">
                  <li className="hover:translate-x-2 transition-transform">
                    Web開発
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    API設計
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    データベース設計
                  </li>
                  <li className="hover:translate-x-2 transition-transform">
                    UI/UXデザイン
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    works: {
      title: "TheWorks",
      content: (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="grid grid-cols-1 gap-6 max-w-6xl w-full">
            {works && works.length > 0 ? (
              works.map((work, index) => (
                <div
                  key={work.id}
                  className="bg-[#1a0000] p-6 rounded-lg transform hover:scale-105 transition-all hover:shadow-lg hover:shadow-[#FF0000]/20 fade-in flex flex-col md:flex-row gap-6"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-full md:w-[400px] h-[250px] bg-[#330000] rounded-lg float">
                    {work.mainImage && work.mainImage.url && (
                      <img
                        src={work.mainImage.url}
                        alt={`${work.title}のメイン画像`}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    )}
                  </div>
    
                  <div className="flex-1 slide-right">
                  <a href={work.url} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-[#FF0000] text-2xl mb-4 font-crimson-text glow hover:underline">
                    {work.title}
                  </h3>
                  </a>
                  <p className="text-[#FF3333] mb-6 font-crimson-text text-lg">
                    {work.description}
                  </p>
                    {work.subImages && work.subImages.length > 0 && (
                      <div className="flex gap-4 mt-4">
                        {work.subImages.map((image, i) => (
                          <img
                            key={i}
                            src={work.subImages.url}
                            alt={`${work.title}のサブ画像 ${i + 1}`}
                            className="w-[100px] h-[100px] object-cover rounded-lg shadow-md"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/placeholder.png";
                            }}
                          />
                        ))}
                      </div>
                    )}
    
                    <div className="flex gap-2 flex-wrap mt-4">
                      {work.technologies &&
                        work.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-[#330000] text-[#FF3333] rounded-full text-sm hover:bg-[#FF0000] hover:text-white transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-[#FF3333] text-center">作品がありません</div>
            )}
          </div>
        </div>
      ),
    },

        contact: {
      title: "Contact",
      content: (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="bg-[#1a0000] p-8 rounded-lg max-w-xl w-full fade-in">
            <h2 className="text-[#FF0000] text-4xl font-crimson-text mb-6 glow">
              Contact
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="fade-in" style={{ animationDelay: "0.2s" }}>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  required
                  className="w-full bg-[#330000] text-[#FF3333] p-2 rounded border border-[#FF0000] focus:outline-none focus:border-[#FF3333] transition-all hover:shadow-md hover:shadow-[#FF0000]/20"
                />
              </div>
              <div className="fade-in" style={{ animationDelay: "0.4s" }}>
                <input
                  type="email"
                  name="email"
                  placeholder="mail address"
                  required
                  className="w-full bg-[#330000] text-[#FF3333] p-2 rounded border border-[#FF0000] focus:outline-none focus:border-[#FF3333] transition-all hover:shadow-md hover:shadow-[#FF0000]/20"
                />
              </div>
              <div className="fade-in" style={{ animationDelay: "0.6s" }}>
                <textarea
                  name="message"
                  placeholder="message"
                  rows="4"
                  required
                  className="w-full bg-[#330000] text-[#FF3333] p-2 rounded border border-[#FF0000] focus:outline-none focus:border-[#FF3333] transition-all hover:shadow-md hover:shadow-[#FF0000]/20"
                ></textarea>
              </div>
              {formStatus && (
                <div
                  className={`text-center p-2 rounded ${
                    formStatus.includes("エラー")
                      ? "bg-[#330000] text-[#FF0000]"
                      : "bg-[#003300] text-[#00FF00]"
                  } fade-in`}
                >
                  {formStatus}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-[#FF0000] text-white py-2 rounded hover:bg-[#CC0000] transition-all hover:shadow-lg hover:shadow-[#FF0000]/40 fade-in"
                style={{ animationDelay: "0.8s" }}
              >
                submit
              </button>
            </form>
          </div>
        </div>
      ),
    },
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="relative">
          <div className="higanbana"></div>
          <div className="petal-container">
            {[...Array.from({ length: 12 })].map((_, i) => (
              <div
                key={i}
                className="petal"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "#1a0000",
          zIndex: 50,
        }}
        className="slide-in"
      >
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <div className="hidden md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                color: "#FF3333",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.target.style.color = "#FF0000")}
              onMouseOut={(e) => (e.target.style.color = "#FF3333")}
              className="block md:hidden"
            >
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
          <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-4">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveSection(key);
                    setMenuOpen(false);
                  }}
                  style={{
                    fontSize: "1.125rem",
                    fontFamily: "Crimson Text",
                    color: activeSection === key ? "#FF0000" : "#FF3333",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#FF0000";
                    e.target.style.transform = "scale(1.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color =
                      activeSection === key ? "#FF0000" : "#FF3333";
                    e.target.style.transform = "scale(1)";
                  }}
                  className={activeSection === key ? "glow" : ""}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: "4rem" }}>
        {sections[activeSection].content}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <div className="smoke-particle"></div>
        <div className="smoke-particle"></div>
        <div className="smoke-particle"></div>
        <div className="smoke-particle"></div>
        <div className="smoke-particle"></div>
      </div>
      <footer
        style={{
          backgroundColor: "#1a0000",
          color: "#FF3333",
          padding: "2rem 0",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
            }}
            className="footer-grid"
          >
            <div className="fade-in">
              <h3
                style={{
                  color: "#FF0000",
                  fontSize: "1.25rem",
                  fontFamily: "Crimson Text",
                  marginBottom: "1rem",
                }}
                className="glow"
              >
                Contact
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <p style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="fas fa-envelope"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  KTC24A31E0004@edu.kyoto-tech.ac.jp
                </p>
                <p style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="fab fa-github"
                    style={{ marginRight: "0.5rem" }}
                  ></i>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#FF3333",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.color = "#FF0000")}
                    onMouseOut={(e) => (e.target.style.color = "#FF3333")}
                  >
                    GitHub
                  </a>
                </p>
              </div>
            </div>
            <div className="fade-in">
              <h3
                style={{
                  color: "#FF0000",
                  fontSize: "1.25rem",
                  fontFamily: "Crimson Text",
                  marginBottom: "1rem",
                }}
                className="glow"
              >
                SiteMap
              </h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {Object.entries(sections).map(([key, section]) => (
                  <li key={key}>
                    <button
                      onClick={() => setActiveSection(key)}
                      style={{
                        color: "#FF3333",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        transition: "color 0.3s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.color = "#FF0000")}
                      onMouseOut={(e) => (e.target.style.color = "#FF3333")}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 51, 51, 0.2)",
            }}
          >
            <p
              style={{
                color: "rgba(255, 51, 51, 0.6)",
                fontFamily: "Crimson Text",
              }}
            >
              © 2025 Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes glow {
          0% {
            text-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000;
          }
          50% {
            text-shadow: 0 0 20px #FF0000, 0 0 30px #FF0000;
          }
          100% {
            text-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000;
          }
        }

        @keyframes smoke {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100vh) scale(3);
            opacity: 0;
          }
        }

        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .slide-in {
          opacity: 0;
          animation: slideIn 0.8s ease-out forwards;
        }

        .slide-right {
          opacity: 0;
          animation: slideRight 0.8s ease-out forwards;
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        .glow {
          animation: glow 2s ease-in-out infinite;
        }

        .smoke-particle {
          position: absolute;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(255,0,0,0) 70%);
          border-radius: 50%;
          animation: smoke 10s infinite;
          opacity: 0;
        }

        .smoke-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .smoke-particle:nth-child(2) { left: 30%; animation-delay: 2s; }
        .smoke-particle:nth-child(3) { left: 50%; animation-delay: 4s; }
        .smoke-particle:nth-child(4) { left: 70%; animation-delay: 6s; }
        .smoke-particle:nth-child(5) { left: 90%; animation-delay: 8s; }
      `}</style>
    </div>
  );
}

export default MainComponent;