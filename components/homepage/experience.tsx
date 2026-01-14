import {
  Handshake,
  Users,
  StarOff,
  LucideIcon,
  ArrowUpRight,
  SearchCheck,
  Settings,
} from "lucide-react";
import CustomButton from "@/components/global/Button";
import Card from "../global/Card";

interface CardData {
  title?: React.ReactNode;
  description?: string;
  textColor: string;
  icon?: LucideIcon;
  iconPosition?: "top" | "left" | "right" | "bottom";
  iconSize?: string;
  iconColor?: string;
  iconWrapperClass?: string;
  background?: string;
  border?: string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const cards: CardData[] = [
  {
    title: "Job Placement Services",
    description:
      "We connenct skilled candidates with trusted companies for full-time and part-time roles.",
    textColor: "text-white",
    icon: Handshake,
    iconPosition: "top",
    iconSize: "w-8 h-8",
    iconColor: "text-white",
    iconWrapperClass:
      "w-14 h-14 flex items-center justify-center rounded-full bg-amber-800 mb-3",
    background:
      "  rounded-lg overflow-hidden bg-gradient-to-b from-lime-400 to-lime-800",
  },
  {
    title: (
      <div className="text-center">
        Experience Mastery <br />
        Explore <span className="text-lime-700">Our All Service</span>
      </div>
    ),

    children: (
      <>
        <p className="leading-7 mb-4 text-center text-black">
          We make hiring simple, fast, and effective - helping companies find
          the right people and candidates land their dream jobs.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <CustomButton
            text="Get Started"
            bgColor="bg-lime-400"
            textColor="text-white"
            hoverColor="hover:bg-red-800"
            icon={ArrowUpRight}
            iconPosition="right"
          />
          <CustomButton
            text="Get Started"
            bgColor="bg-yellow-600"
            textColor="text-white"
            hoverColor="hover:bg-red-800"
            icon={ArrowUpRight}
            iconPosition="right"
          />
        </div>
      </>
    ),
    textColor: "text-black",
    icon: StarOff,
    iconPosition: "left",
    iconSize: "w-6 h-6",
    iconColor: "text-black",
    iconWrapperClass: "flex items-center justify-center mr-3",
    background: "bg-gray-100",
    className: "md:col-span-2",
  },
  {
    title: "Staff Outsourcing",
    description:
      "Hire trained professionals for short or long-term projects without the HR hassle",
    textColor: "text-white",
    icon: Users,
    iconPosition: "top",
    iconSize: "w-8 h-8",
    iconColor: "text-white",
    iconWrapperClass:
      "w-14 h-14 flex items-center justify-center rounded-full bg-amber-800 mb-3",
    background:
      "  rounded-lg overflow-hidden bg-gradient-to-b from-lime-400 to-lime-800",
  },

  {
    title: (
      <>
        Executive <br />
        Search
      </>
    ),
    description:
      "Find top-level managers and leader who fit your company vision and culture.",
    textColor: "text-white",
    icon: SearchCheck,
    iconPosition: "top",
    iconSize: "w-8 h-8",
    iconColor: "text-white",
    iconWrapperClass:
      "w-14 h-14 flex items-center justify-center rounded-full bg-amber-800 mb-3",
    background:
      "  rounded-lg overflow-hidden bg-gradient-to-b from-lime-400 to-lime-800",
  },
  {
    title: undefined,
    description: undefined,
    children: undefined,
    textColor: "text-black",
    icon: undefined,
    iconPosition: undefined,
    iconSize: undefined,
    iconColor: undefined,
    iconWrapperClass: undefined,
    background: "bg-cover bg-center rounded-lg",
    className: "md:col-span-2 h-64",
    style: { backgroundImage: "url('/images/success-bg.jpg')" },
  },

  {
    title: (
      <>
        HR Support & <br />
        Consultation
      </>
    ),
    description:
      "From interview setup to payroll- weassist companies with complete HR solutions",
    textColor: "text-white",
    icon: Settings,
    iconPosition: "top",
    iconSize: "w-8 h-8",
    iconColor: "text-white",
    iconWrapperClass:
      "w-14 h-14 flex items-center justify-center rounded-full bg-amber-800 mb-3",
    background:
      "  rounded-lg overflow-hidden bg-gradient-to-b from-lime-400 to-lime-800",
  },
];

const Experience = () => {
  return (
    <section className="py-24 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
