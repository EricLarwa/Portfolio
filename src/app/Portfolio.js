"use client";
import Image from 'next/image';
import Eric from './assets/Eric.JPEG'
import Gym from './assets/SmartGym.png'
import eCommerce from './assets/eCommerce.png'
import SkillSprint from './assets/SkillSprint.png'
import Resume from '/Users/ericlarwa/Desktop/Test/port-page/public/Resume1.pdf'

import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Mail, User, Code, Briefcase, FileText, Home } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactChange = (e) => {
    const { id, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });
      
      if (response.ok) {
        alert('Thank you for your message! I will get back to you soon.');
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const sections = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );

  const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-indigo-700 transition-all duration-300 ease-out" 
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-90 shadow-sm z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-indigo-700">Eric Larwa</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'text-indigo-700 font-medium'
                    : 'text-gray-600 hover:text-indigo-700'
                }`}
              >
                {section.icon}
                <span className="hidden lg:inline">{section.label}</span>
              </button>
            ))}
            <a 
              href={Resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              <FileText size={18} />
              <span>Resume</span>
            </a>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-indigo-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-2">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`flex items-center space-x-2 px-2 py-2 rounded-md transition-colors ${
                    activeSection === section.id
                      ? 'text-indigo-700 font-medium bg-indigo-200'
                      : 'text-gray-600 hover:text-indigo-700 hover:bg-gray-50'
                  }`}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
              <a 
                href={Resume} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-900 transition-colors"
              >
                <FileText size={18} />
                <span>Resume</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Hello, I&apos;m <span className="text-indigo-700">Eric Larwa</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-6">
                  Full Stack Developer with a passion for building exceptional web applications.
                </p>
                <p className="text-gray-600 mb-8 max-w-lg">
                  I specialize in creating responsive, modern web applications using JavaScript technologies like React.js, Node.js, and more.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => handleNavClick('projects')}
                    className="flex items-center space-x-2 bg-indigo-700 text-white px-6 py-3 rounded-md hover:bg-indigo-900 transition-colors"
                  >
                    <span>See My Work</span>
                    <ChevronRight size={18} />
                  </button>
                  <button 
                    onClick={() => handleNavClick('contact')}
                    className="flex items-center space-x-2 border border-indigo-700 text-indigo-700 px-6 py-3 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    <span>Contact Me</span>
                  </button>
                </div>
                <div className="flex space-x-4 mt-8">
                  <a href="https://github.com/EricLarwa" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-700 transition-colors">
                    <GithubIcon />
                  </a>
                  <a href="https://linkedin.com/in/ericlarwa" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-700 transition-colors">
                    <LinkedinIcon />
                  </a>
                  <a href="mailto:contact@ericlarwa.com" className="text-gray-600 hover:text-indigo-700 transition-colors">
                    <Mail size={24} />
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image 
                    src={Eric}
                    alt="Eric Larwa" 
                    className="w-full h-full object-cover" 
                    width={400} 
                    height={400} 
                />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 text-center">About Me</h2>
            <div className="w-24 h-1 bg-indigo-700 mx-auto mb-12"></div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-lg">
                I&apos;m a passionate Full Stack Developer with expertise in building modern web applications. With a strong foundation in computer science, I bring creative solutions to complex problems.
                </p>
                <p className="text-lg">
                  My journey in tech starts at East Carolina University, where I am earning my Bachelors degree in Software Engineering. Since then, I&apos;ve worked with various technologies and frameworks to deliver high-quality software solutions.
                </p>
                <p className="text-lg">
                  Beyond coding, I enjoy contributing to open-source projects, and staying up-to-date with the latest industry trends.
                </p>
              </div>
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">East Carolina University</div>
                      <div className="text-gray-600">B.S. Software Engineering</div>
                      <div className="text-sm text-gray-500">2022 - 2026</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Experience</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">Data Analyst</div>
                      <div className="text-gray-600">Personal Work</div>
                      <div className="text-sm text-gray-500">2025 - Present</div>
                    </div>
                    <div>
                      <div className="font-medium">Web Developer</div>
                      <div className="text-gray-600">Personal Work</div>
                      <div className="text-sm text-gray-500">2022 - Present</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 text-center">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-indigo-700 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: 'JavaScript', level: 90 },
                { name: 'React.js', level: 95 },
                { name: 'Node.js', level: 90 },
                { name: 'TypeScript', level: 65 },
                { name: 'HTML5/CSS3', level: 90 },
                { name: 'MongoDB', level: 70 },
                { name: 'SQL', level: 85 },
                { name: 'Git', level: 95 },
                { name: '.NET', level: 60 },
                { name: 'Docker', level: 50 },
                { name: 'C#', level: 70 },
                { name: 'Next.js', level: 85 },
              ].map((skill, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-3">{skill.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-700 h-2.5 rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 text-center">Featured Projects</h2>
            <div className="w-24 h-1 bg-indigo-700 mx-auto mb-12"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'E-Commerce Analysis',
                  description: 'Analysis of user behavior and sales data to improve the shopping experience.',
                  tech: ['Python', 'PostgreSQL', 'MongoDB'],
                  image: eCommerce,
                  liveLink: '#',
                  codeLink: '#'
                },
                {
                  title: 'Smart Gym Companion',
                  description: 'A web application that helps users track their workouts, nutrition, and progress over time.',
                  tech: ['React', 'Express.JS', 'SQLite3'],
                  image: Gym,
                  liveLink: '#',
                  codeLink: '#'
                },
                {
                  title: 'Skill Sprint',
                  description: 'Web application that allows users to track their skills and progress over time in Coding, Finance, or Languages',
                  tech: ['React', 'Flask', 'Python', 'SQLite3'],
                  image: SkillSprint,
                  liveLink: '#',
                  codeLink: '#'
                }
              ].map((project, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all group">
                  <div className="relative overflow-hidden h-48">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    width={600} 
                    height={400} 
                  />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <a 
                        href={project.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-sm text-indigo-700 hover:text-indigo-800"
                      >
                        <GithubIcon />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2 text-center">Get In Touch</h2>
            <div className="w-24 h-1 bg-indigo-700 mx-auto mb-12"></div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-lg">
                  Interested in working together or have a question? Feel free to reach out to me through the contact form or directly via email.
                </p>
                <div className="flex items-center space-x-3">
                  <Mail size={20} className="text-indigo-700" />
                  <a href="mailto:eric.larwa@gmail.com" className="text-indigo-700 hover:underline">
                    eric.larwa@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <LinkedinIcon />
                  <a href="linkedin.com/in/eric-larwa-b3b2382a1/" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <GithubIcon />
                  <a href="https://github.com/EricLarwa" target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:underline">
                    GitHub
                  </a>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={contactForm.name}
                        onChange={handleContactChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows="5" 
                      value={contactForm.message}
                      onChange={handleContactChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:border-transparent"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button 
                    onClick={handleContactSubmit}
                    className="w-full bg-indigo-700 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold">Eric Larwa</div>
              <div className="text-gray-400">Full Stack Developer</div>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/EricLarwa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <GithubIcon />
              </a>
              <a href="https://linkedin.com/in/ericlarwa" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <LinkedinIcon />
              </a>
              <a href="mailto:ericlarwa@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Eric Larwa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}