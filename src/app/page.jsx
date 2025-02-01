"use client";
import React, { useState, useEffect } from "react";

function MainComponent() {
  const [activeSection, setActiveSection] = useState("home");
  const [works, setWorks] = useState([]);
  const [formStatus, setFormStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(
          "https://thework.microcms.io/api/v1/thework", 
          {
            headers: {
              "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY, 
            },
          }
        );
        const data = await response.json();
        console.log("Fetched works:", data); 
        if (data.contents && Array.isArray(data.contents)) {
          setWorks(data.contents); 
        } else {
          throw new Error("Invalid data structure or no data found.");
        }
      } catch (error) {
        console.error("Error fetching works:", error);
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
      console.log("Form data submitted:", data);
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
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="text-center">
            <h1 className="text-[#FF0000] text-6xl md:text-8xl font-crimson-text mb-8 glow">
              Welcome to My Portfolio
            </h1>
            <p className="text-[#FF3333] text-xl md:text-2xl font-crimson-text fade-in">
              Okina Shuji
            </p>
          </div>
        </div>
      ),
    },
    about: {
      title: "Profile",
      content: (
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg-[#1a0000] p-8 rounded-lg max-w-2xl fade-in">
            <h1 className="text-[#FF0000] text-4xl font-crimson-text mb-6 glow">
              My Profile
            </h1>
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
                  <li className="hover:translate-x-2 transition-transform">HTML</li>
                  <li className="hover:translate-x-2 transition-transform">CSS</li>
                  <li className="hover:translate-x-2 transition-transform">JavaScript</li>
                  <li className="hover:translate-x-2 transition-transform">React</li>
                  <li className="hover:translate-x-2 transition-transform">Node.js</li>
                  <li className="hover:translate-x-2 transition-transform">TypeScript</li>
                  <li className="hover:translate-x-2 transition-transform">Python</li>
                </ul>
              </div>
              <div className="fade-in" style={{ animationDelay: "0.6s" }}>
                <h3 className="text-[#FF0000] text-xl mb-2 font-crimson-text">
                  経験
                </h3>
                <ul className="text-[#FF3333] list-disc list-inside">
                  <li className="hover:translate-x-2 transition-transform">Web開発</li>
                  <li className="hover:translate-x-2 transition-transform">API設計</li>
                  <li className="hover:translate-x-2 transition-transform">データベース設計</li>
                  <li className="hover:translate-x-2 transition-transform">UI/UXデザイン</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    works: {
      title: "The Works",
      content: (
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
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
                      {work.subtitle}
                    </p>
                    {work.subImages && work.subImages.url && (
                      <img
                        src={work.subImages.url}
                        alt={`${work.title}のサブ画像`}
                        className="w-[100px] h-[100px] object-cover rounded-lg shadow-md"
                        loading="lazy"
                      />
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
        <div
          className="min-h-screen flex items-center justify-center px-4"
          style={{
            backgroundImage: "url('/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="bg-[#1a0000] p-8 rounded-lg max-w-xl w-full fade-in">
            <h1 className="text-[#FF0000] text-4xl font-crimson-text mb-6 glow">
              Contact
            </h1>
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
      <footer>
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
              <h1
                style={{
                  color: "#FF0000",
                  fontSize: "1.25rem",
                  fontFamily: "Crimson Text",
                  marginBottom: "1rem",
                }}
                className="glow"
              >
                Contact
              </h1>
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
              <h1
                style={{
                  color: "#FF0000",
                  fontSize: "1.25rem",
                  fontFamily: "Crimson Text",
                  marginBottom: "1rem",
                }}
                className="glow"
              >
                SiteMap
              </h1>
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
    </div>
  );
}

export default MainComponent;
