import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  BellDot,
  Instagram,
  X,
  ChevronsRight,
} from "lucide-react";

import Link from "next/link";

const footerData = {
  newsletter: {
    heading: "Subscribe to Our Weekly Newsletter!",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eum quae sint culpa atque enim quod, in dolor reprehenderit quasi porro id aliquid ipsa et quis numquam at veritatis hic.`,
    placeholder: "Enter your email",
    buttonText: "Get Started",
    image: "/images/meeting2.jpg",
  },
  brand: {
    name: "Right Recruits",
    highlight: "Recruits",
    description: `Your trusted partner in recruitment - connecting top talent with leading companies, ensuring growth and success.`,
    icons: [Facebook, Linkedin, X, Instagram],
  },
  quickLinks: [
    { name: "Home", href: "/" },
    { name: "Service", href: "/service" },
    { name: "About Us", href: "/about" },
    { name: "Blog & News", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ],
  services: [
    { name: "HR Consulting", href: "/" },
    { name: "Career Guidance", href: "/careerguidance" },
    { name: "Interview Preparation", href: "/interviewpreparation" },
    { name: "Job Placement Service", href: "/jobplacemnetservice" },
    { name: "Executive Search", href: "/executivesearch" },
    { name: "Staff Outsourcing", href: "/staffoutsourcing" },
  ],
  contactInfo: [
    { type: "Phone Number", value: "+92 9765 1234567", icon: Phone },
    { type: "Email Address", value: "support@domain.com", icon: Mail },
    { type: "Our Location", value: "Kazipur 6710, Sirajganj,BD", icon: MapPin },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-black/80 text-white py-6 text-center rounded-t-xl mt-19">
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-20 grid-rows-20 gap-0.2">
          {Array.from({ length: 400 }).map((_, idx) => (
            <div
              key={idx}
              className="w-full h-full bg-white/5 border border-white/10"
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8 pt-40 pb-20">
        <div className="mt-20 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-48 md:h-72 overflow-hidden rounded-xl shadow-lg">
          <img
            src={footerData.newsletter.image}
            alt="Footer Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between px-8 pt-8 md:pt-12 gap-6">
            <div className="flex flex-col gap-4 md:w-1/2">
              <h2 className="text-5xl md:text-3xl font-bold">
                {footerData.newsletter.heading}
              </h2>
              <p className="text-sm md:text-lg">
                {footerData.newsletter.description}
              </p>
            </div>

            <div className="flex flex-col md:w-1/2 gap-4">
              <input
                type="email"
                placeholder={footerData.newsletter.placeholder}
                className="w-full px-4 py-3 rounded-full bg-white text-black placeholder-black focus:outline-none"
              />
              <button className="w-full bg-lime-500 text-black font-semibold px-6 py-3 rounded-full hover:bg-lime-400 transition">
                {footerData.newsletter.buttonText}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-20 mt-30">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <BellDot size={28} className="text-lime-400" />
              <h1 className="text-2xl font-bold text-lime-300">
                {footerData.brand.name.split(" ")[0]}{" "}
                <span className="text-lime-200">
                  {footerData.brand.highlight}
                </span>
              </h1>
            </div>
            <p className="text-sm opacity-80 ml-10 leading-5">
              {footerData.brand.description.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <div className="flex gap-4 ml-10 mt-2">
              {footerData.brand.icons.map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center cursor-pointer hover:scale-110 transition"
                >
                  <Icon className="text-white" size={18} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            {footerData.quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex gap-2 items-center text-sm hover:text-lime-400 transition"
              >
                <ChevronsRight size={16} className="text-white" />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Our Service</h3>
            {footerData.services.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="flex gap-2 items-center text-sm hover:text-lime-400 transition"
              >
                <ChevronsRight size={16} className="text-white" />
                {service.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            {footerData.contactInfo.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-900 flex items-center justify-center">
                    <Icon className="text-white" size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-amber-900 font-semibold">
                      {item.type}
                    </span>
                    <span className="text-sm text-white/80">{item.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 relative z-20 flex flex-col md:flex-row justify-between items-center text-sm text-white/70 px-4 md:px-0">
          <div className="mb-2 md:mb-0 flex items-center gap-2">
            Copyright © {new Date().getFullYear()} Fixonic By Roxcreation. All
            Rights Reserved.
          </div>

          <div className="flex gap-2 flex-wrap justify-center md:justify-end items-center">
            {["Terms & Conditions", "Privacy Policy"].map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <span className="text-lime-400">•</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
